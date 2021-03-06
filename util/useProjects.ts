// TODO: Pass data to mutate on change

/** @file Hooks for working with Projects */

import useSWR from 'swr'
import { getDB, DBDocument, DBResponse } from './db'
import { mapDocs } from './mapDocs'
import { useEffect } from 'react'
import { useLists, List } from './useLists'

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
    // @ts-ignore
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
      // @ts-ignore
      .on('change', () => mutate(mapDocs))

    return () => changeListener.cancel()
  }, [])

  /**
   * Add Project
   * @param {string} name Project name
   * @return {Promise<Project>} Created Project
   */
  const add = (name: string): Promise<Project> =>
    // @ts-ignore
    db.post({ ...defaultProject, name })

  /**
   * Remove Project
   * @param {string} id Project ID
   * @return {Promise<Project[]>} Projects
   */
  const remove = (id: string) => {
    // @ts-ignore
    const doc = data.find((p: Project) => p._id === id)

    // @ts-ignore
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
  const { add: createList, remove: deleteList } = useLists()

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
    // @ts-ignore
    db.post({ ...data, _deleted: true }).then(mutate)
  }

  // @ts-ignore
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

  /**
   * Remove a list from the project
   * @param {Object} doc List
   * @return {Promise<DBResponse>} Database response
   */
  const removeList = (doc: List): Promise<DBResponse> => {
    if (!data) {
      return Promise.reject('CANT_REMOVE_LIST_BEFORE_PROJECT_DATA_LOADED')
    }
    return deleteList(doc).then((DBResp: DBResponse) => {
      const listsClone: string[] = [...(data?.lists || [])]
      const listIdx = listsClone.findIndex((i) => i === doc._id)
      listsClone.splice(listIdx, 1)
      return db.post({ ...data, lists: listsClone }).then(() => DBResp)
    })
  }

  return { data, remove, update, addList, removeList }
}
