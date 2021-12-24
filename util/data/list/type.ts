/** @file TypeScript interface for a List */

import type { ListItem } from './item'

/** Interface for a List */
export interface List {
  id: string
  name: string
  Items: ListItem[]
}

export default List
