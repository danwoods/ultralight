/** @file Hooks for working with Projects */

import '../../components/Auth/init'
import { useCollection } from './useCollection'
import type List from '../data/list/type'
import type { ListItem } from '../data/list/item'

/** Project database */

type UseListsReturnValue = {
  data: List[]
  add: (arg0: List) => Promise<List>
}

/**
 * Hook to work with Lists
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useLists = (
  userId: string | null | undefined,
  projectId: string | null | undefined
): UseListsReturnValue => {
  return useCollection<List>(`Users/${userId}/Projects/${projectId}/Lists`)
}

type UseListItemsReturnValue = {
  data: ListItem[]
  add: (arg0: Omit<ListItem, 'id'>) => Promise<ListItem>
}

/**
 * Hook to work with Lists
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useListItems = (
  userId: string | null | undefined,
  projectId: string | null | undefined,
  listId: string | null | undefined
) => {
  return useCollection<ListItem>(
    `Users/${userId}/Projects/${projectId}/Lists/${listId}/Items`
  )
}
