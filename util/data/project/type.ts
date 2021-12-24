/** @file TypeScript interface for a Project */

import type List from '../list/type'

/** Interface for a Project */
export interface Project {
  id: string
  name: string
  Lists: List[]
}

export default Project
