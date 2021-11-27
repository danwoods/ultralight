/** @file Hooks for working with Projects */

import '../../components/Auth/init'
import { useCollection } from './useCollection'

type ListData = {
  id: string
  name: string
}

/** Project database */

type ReturnValue = {
  data: ListData[]
}

/**
 * Hook to work with Lists
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useLists = (
  userId: string | null | undefined,
  projectId: string | null | undefined
): ReturnValue => {
  return useCollection<ListData>(`Users/${userId}/Projects/${projectId}/Lists`)
}
