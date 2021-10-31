import '../../components/Auth/init'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc, getDocs } from 'firebase/firestore'

/** @file Hooks for working with Projects */

import { useEffect, useState } from 'react'

type ProjectData = {
  name: string
}

const dbId: 'Projects' = 'Projects'

/** Project database */

type ReturnValue = {
  data: ProjectData[]
}

/**
 * Hook to work with Projects
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useProjects = (): ReturnValue => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const db = getFirestore()

    try {
      getDocs(collection(db, dbId))
        .then((snapshot) => {
          console.log('Snapshot', snapshot)
          const pjts = []
          snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
            pjts.push({ id: doc.id, ...doc.data() })
          })
          setProjects(pjts)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }, [])

  return {
    data: projects
  }
}

// type UseProjectConfig = {
//   initialData?: Project
// }
/*
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
   *
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
   *
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
*/
