/** @file Hooks for working with list items */

import useSWR from 'swr'
import { getDB, DBDocument } from './db'
import { useEffect } from 'react'
import { mapDocs } from './mapDocs'

type ListItemData = {
  name: string
  description: string
  completed: boolean
  dueDate: Date | null
  assignedTo: string | null
  archived: boolean
  deleted: boolean
}

export interface ListItem extends DBDocument, ListItemData {}

/** Standard project data */
const defaultListItem = {
  name: '',
  description: '',
  completed: false,
  dueDate: null,
  assignedTo: null,
  archived: false,
  deleted: false
}

const dbId: '/list-items' = '/list-items'

/** List Item database */
export const db = getDB<ListItem>(dbId)

type Config = {
  initialData?: ListItem[]
}

export const useListItems = (ids: string[], config: Config | undefined) => {
  const { data, mutate } = useSWR<ListItem[]>(
    () => [dbId, ...ids],
    () => db.allDocs({ keys: ids, include_docs: true }).then(mapDocs),
    config
  )

  useEffect(() => {
    const changeListener = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
        doc_ids: ids
      })
      .on('change', function (change) {
        mutate()
      })
      .on('error', function (err) {
        // handle errors
      })

    return () => changeListener.cancel()
  }, [])

  const add = (name: string): Promise<ListItem> => {
    return db.post({ ...defaultListItem, name }).then((doc: ListItem) => {
      mutate()
      return doc
    })
  }

  const remove = (doc: ListItem) => {
    return db.post({ ...doc, _deleted: true })
  }

  const update = (partial: ListItem): Promise<ListItem> => {
    return db.post(partial).then((doc) => {
      mutate()
      return doc
    })
  }

  return { data, mutate, add, update, remove }
}

// export const useListItems1 = (ids: string[], config: Config = {}) => {
//   let db: PouchDB.Database<ListItem> | undefined
//   const [items, setItems] = useState<ListItem[] | undefined>(config.initialData)

//   useEffect(() => {
//     if (!db) {
//       db = getDB()
//     }

//     db.allDocs({ keys: ids, include_docs: true })
//       .then((data) => {
//         if (typeof data !== 'undefined') {
//           const listItems: ListItem[] = data.rows.map((row) => row.doc)
//           setItems(listItems)
//         }
//       })
//       .then(() => {
//         db.changes({
//           since: 'now',
//           live: true,
//           include_docs: true,
//           doc_ids: ids
//         })
//           .on('change', function (change) {
//             if (change.deleted) {
//               setItems((projects = []) => {
//                 const existingProjects = [...projects]
//                 const existingDocIdx = existingProjects.findIndex(
//                   (doc) => doc._id === change.id
//                 )
//                 existingProjects.splice(existingDocIdx, 1)
//                 return existingProjects
//               })
//             } else {
//               const existingDocIdx = (items || []).findIndex(
//                 (doc) => doc._id === change.id
//               )
//               if (existingDocIdx < 0) {
//                 setItems((projects = []) => projects.concat([change.doc]))
//               } else {
//                 setItems((projects = []) =>
//                   projects.map((proj) =>
//                     proj._id !== change.id ? proj : change.doc
//                   )
//                 )
//               }
//             }
//           })
//           .on('error', function (err) {
//             // handle errors
//           })
//       })
//   }, [])

//   const add = (name: string) => {
//     if (!db) {
//       db = getDB()
//     }

//     db.post({ ...defaultListItem, name })
//   }

//   return { data: items, add }
// }
