import useSWR from 'swr'
import { useEffect } from 'react'
import { mapDocs } from './mapDocs'
import { getDB, DBDocument, DBResponse } from './db'
import { useListItems, ListItem } from './useListItems'

type ListData = {
  name: string
  description: string
  items: string[]
}

export interface List extends DBDocument, ListData {}

/** Standard list data */
const defaultList = {
  name: '',
  description: '',
  items: []
}

const dbId: '/lists' = '/lists'

/** List database */
export const db = getDB<List>(dbId)

type UseListsConfig = {
  initialData?: List[]
}

/**
 * Hook to work with Lists
 * @param {Object} config Config object for useSWR
 * @returns {Object[]} {data: Lists[], add: name => Promise}
 */
export const useLists = (
  ids?: string[] | undefined,
  config: UseListsConfig = {}
) => {
  const { data, mutate } = useSWR<List[]>(
    () => (ids ? ['/lists/', ...ids] : null),
    () => db.allDocs({ keys: ids, include_docs: true }).then(mapDocs),
    config
  )

  // console.log({ ids, data, arr: ['/lists/', ...ids] })

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

  /**
   * Add a list
   * @param {string} name List name
   * @param {[string]} description List description
   * @returns {Promise<DBResponse>} Database response
   */
  const add = (name: string, description?: string): Promise<DBResponse> => {
    return db
      .post({ ...defaultList, name, description: description || '' })
      .then((newList: DBResponse) => {
        mutate()
        return newList
      })
  }

  const remove = (list: List): Promise<DBResponse> => {
    return db.post({ ...list, _deleted: true }).then((resp: DBResponse) => {
      mutate()
      return resp
    })
  }

  return { data, add, remove }
}

type UseListConfig = {
  initialData?: List
}

export const useList = (id: string, config: UseListConfig = {}) => {
  const { data, mutate } = useSWR(
    id ? `/lists/${id}` : null,
    () => db.get(id),
    config
  )
  const { add, remove } = useListItems()

  useEffect(() => {
    const changeListener = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
        doc_ids: [id]
      })
      .on('change', function (change) {
        mutate()
      })
      .on('error', function (err) {
        // handle errors
      })

    return () => changeListener.cancel()
  }, [])

  const addItem = (name: string): Promise<PouchDB.Core.Response> => {
    return add(name).then((doc) => {
      const itemsClone = [...data?.items]
      itemsClone.push(doc.id)
      return db.post({ ...data, items: itemsClone }).then(() => doc)
    })
  }

  const removeItem = (item: ListItem): Promise<PouchDB.Core.Response> => {
    return remove(item).then((doc) => {
      const itemsClone: string[] = [...(data?.items || [])]
      const itemIdx = itemsClone.findIndex((i) => i === item._id)
      itemsClone.splice(itemIdx, 1)
      return db.post({ ...data, items: itemsClone }).then(() => doc)
    })
  }

  const updateItemOrder = (items: string[]) => {
    return db.post({ ...data, items }).then((doc) => {
      mutate()
      return doc
    })
  }

  return { data, addItem, removeItem, updateItemOrder }
}
