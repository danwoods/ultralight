/** @file Page for a single List */

import React, { useState } from 'react'
import { useLists, useListItems } from '../../../../../../../util/data/useLists'
import { useAuth } from '../../../../../../../util/auth/useAuth'
import { withRequireAuth } from '../../../../../../../util/auth/RequireAuthHOC'
import { useRouter } from 'next/router'
import { createItem } from '../../../../../../../util/data/list/item'
import { sortBy } from '../../../../../../../util/array'
import { ListItem, Item } from '../../../../../../../util/data/list/item'
import { Button } from '../../../../../../../components/Button'

/**
 * Sort list items by `sortOrder`
 * @param {ListItem} a ListItem a
 * @param {ListItem} b ListItem b
 * @returns {number} Sort order
 */
const sortBySortOrder = (a: ListItem, b: ListItem) =>
  sortBy<ListItem>(a, b, 'sortOrder')

type AddItemInputProps = {
  onAdd: (name: string) => Promise<any>
}

const AddItemInput = (props: AddItemInputProps) => {
  const [newItemName, setNewItemName] = useState('')

  const onAddClick = () =>
    props.onAdd(newItemName).then(() => setNewItemName(''))

  return (
    <div className='flex items-center rounded-md'>
      <div className='pl-2 flex w-full'>
        <input
          className='w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2'
          id='search'
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder='Add'
          type='text'
          value={newItemName}
        />
        <Button className={'p-2 m-0'} onClick={onAddClick}>
          {'Add'}
        </Button>
      </div>
    </div>
  )
}

/**
 * Page for a single list
 * @returns {JSX.Element} Page for a single list
 */
export const List = () => {
  const { userId } = useAuth()
  const router = useRouter()
  const { projectId, listId } = router.query
  const { data: lists } = useLists(userId, String(projectId))
  const { data: items, add, remove } = useListItems(
    userId,
    String(projectId),
    String(listId)
  )

  const list = lists.find((l) => l.id === listId)

  return (
    <div className={'bg-white shadow-md rounded-lg px-3 py-2 mb-4'}>
      <h1
        className={'block text-gray-700 text-lg font-semibold py-2 px-2'}
      >{`List: ${list?.name || ''}`}</h1>
      <ol className='py-3 text-sm'>
        {items.sort(sortBySortOrder).map((l) => (
          <Item
            Item={l}
            key={l.id + l.sortOrder}
            onDelete={() => remove(l.id)}
          />
        ))}
      </ol>
      <AddItemInput
        onAdd={(name: string) =>
          add(
            createItem({
              name: name,
              sortOrder: items.length || 0,
              parentId: [userId, String(projectId)].join('/')
            })
          )
        }
      />
    </div>
  )
}

export default withRequireAuth(List)
