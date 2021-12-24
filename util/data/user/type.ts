/** @file TypeScript interface for a User */

import type Project from '../project/type'

/** Interface for a User */
export interface User {
  id: string
  name: string
  Projects: Project[]
}

export default User
