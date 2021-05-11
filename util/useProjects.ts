// TODO: Pass data to mutate on change

/** @file Hooks for working with Projects */

import useSWR from 'swr'
import { getDB, DBDocument } from './db'
import { mapDocs } from './mapDocs'
import { useEffect } from 'react'
import { useLists } from './useLists'

type ProjectData = {
  name: string
  description: string
  lists: string[]
}

export interface Project extends DBDocument, ProjectData {}

/** Standard project data */
const defaultProject: ProjectData = {
  name: '',
  description: '',
  lists: []
}

const dbId: '/projects' = '/projects'

/** Project database */
export const db = getDB<Project>(dbId)

type UseProjectsConfig = {
  initialData?: Project[]
}

/**
 * Hook to work with Projects
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useProjects = (config: UseProjectsConfig = {}) => {
  const { data, mutate } = useSWR<Project[]>(
    dbId,
    () => db.allDocs({ include_docs: true }).then(mapDocs),
    config
  )

  useEffect(() => {
    const changeListener = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true
      })
      .on('change', () => mutate(mapDocs))

    return () => changeListener.cancel()
  }, [])

  /**
   * Add Project
   * @param {string} name Project name
   * @return {Promise<Project>} Created Project
   */
  const add = (name: string): Promise<Project> =>
    db.post({ ...defaultProject, name })

  /**
   * Remove Project
   * @param {string} id Project ID
   * @return {Promise<Project[]>} Projects
   */
  const remove = (id: string) => {
    const doc = data.find((p: Project) => p._id === id)

    db.remove(doc).then(() => mutate())
  }

  return { data, add, remove }
}

type UseProjectConfig = {
  initialData?: Project
}

export const useProject = (id: string, config: UseProjectConfig = {}) => {
  const { data, mutate } = useSWR<Project>(
    () => (id ? `${dbId}/${id}` : null),
    () => db.get(id),
    config
  )
  const { add: createList } = useLists()

  useEffect(() => {
    const changeListener = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
        doc_ids: [id]
      })
      .on('change', () => mutate())

    return () => changeListener.cancel()
  }, [])

  const remove = () => {
    db.post({ ...data, _deleted: true }).then(mutate)
  }

  const update = (partial) => {
    db.post({ ...data, ...partial }).then((newProject) => {
      mutate()
      return newProject
    })
  }

  /**
   * Add a list to the project
   * @param {string} name List name
   * @return {Promise<Project>} Updated project
   */
  const addList = (name: string) => {
    createList(name).then((DBResp) => {
      ;(data?.lists || []).push(DBResp.id)
      return update(data)
    })
  }

  return { data, remove, update, addList }
}
