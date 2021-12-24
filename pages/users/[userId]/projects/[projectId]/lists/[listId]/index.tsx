/** @file Page for a single List */

import React, { useState } from 'react'
import { useListItems } from '../../../../../../../util/data/useLists'
import { useAuth } from '../../../../../../../util/auth/useAuth'
import { withRequireAuth } from '../../../../../../../util/auth/RequireAuthHOC'
import { useRouter } from 'next/router'
import { createItem } from '../../../../../../../util/data/list/item'
import { sortBy } from '../../../../../../../util/array'
import { ListItem } from '../../../../../../../util/data/list/item'

/**
 * Sort list items by `sortOrder`
 * @param {ListItem} a ListItem a
 * @param {ListItem} b ListItem b
 * @returns {number} Sort order
 */
const sortBySortOrder = (a: ListItem, b: ListItem) =>
  sortBy<ListItem>(a, b, 'sortOrder')

/**
 * Page for a single list
 * @returns {JSX.Element} Page for a single list
 */
export const List = () => {
  const { userId } = useAuth()
  const router = useRouter()
  const { projectId, listId } = router.query
  const { data: items, add, remove } = useListItems(userId, projectId, listId)
  const [newName, setNewName] = useState('')

  return (
    <div>
      {'List'}
      <ol>
        {items.sort(sortBySortOrder).map((l) => (
          <li key={l.id + l.sortOrder}>
            {l.name}{' '}
            <button title={'Delete'} onClick={() => remove(l.id)}>
              {'x'}
            </button>
          </li>
        ))}
      </ol>
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      <button
        onClick={() =>
          add(
            createItem({ name: newName, sortOrder: items.length || 0 })
          ).then(() => setNewName(''))
        }
      >
        {'Add'}
      </button>
    </div>
  )
}

export default withRequireAuth(List)
