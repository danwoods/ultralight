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
		// @ts-ignore
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

  const add = (name: string): Promise<DBResponse> => {
		// @ts-ignore
    return db.post({ ...defaultList, name }).then((newList: DBResponse) => {
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
	// @ts-ignore
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
			// @ts-ignore
      const itemsClone = [...data?.items]
			// @ts-ignore
      itemsClone.push(doc.id)
			// @ts-ignore
      return db.post({ ...data, items: itemsClone }).then(() => doc)
    })
  }

  const removeItem = (item: ListItem): Promise<PouchDB.Core.Response> => {
    return remove(item).then((doc) => {
      const itemsClone: string[] = [...(data?.items || [])]
      const itemIdx = itemsClone.findIndex((i) => i === item._id)
      itemsClone.splice(itemIdx, 1)
			// @ts-ignore
      return db.post({ ...data, items: itemsClone }).then(() => doc)
    })
  }

  const updateItemOrder = (items: string[]) => {
			// @ts-ignore
    return db.post({ ...data, items }).then((doc) => {
      mutate()
      return doc
    })
  }

  return { data, addItem, removeItem, updateItemOrder }
}
