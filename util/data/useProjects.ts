/** @file Hooks for working with Projects */

import '../../components/Auth/init'
import { useCollection } from './useCollection'

type ProjectData = {
  id: string
  name: string
}

/** Project database */

type ReturnValue = {
  data: ProjectData[]
}

/**
 * Hook to work with Projects
 * @param {Object} config Config object for useSWR
 * @returns {Object} {data: Projects[], add: name => Promise, remove: id => Promise}
 */
export const useProjects = (userId: string | null | undefined) => {
  return useCollection<ProjectData>(`Users/${userId}/Projects`)
}
