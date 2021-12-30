/** @file Page for a list of lists */

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../../../../util/auth/useAuth'
import { withRequireAuth } from '../../../../../../util/auth/RequireAuthHOC'
import { useLists } from '../../../../../../util/data/useLists'
import { useRouter } from 'next/router'
import { Button } from '../../../../../../components/Button'

type AddItemInputProps = {
  onAdd: (name: string) => Promise<any>
}

const AddItemInput = (props: AddItemInputProps) => {
  const [newItemName, setNewItemName] = useState('')

  const onAddClick = () =>
    props.onAdd(newItemName).then(() => setNewItemName(''))

  return (
    <div className="flex items-center rounded-md">
      <div className="pl-2 flex w-full">
        <input
          className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
          id="search"
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add"
          type="text"
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
 * Page of lists
 * @returns {JSX.Element} Page of lists
 */
export const Lists = () => {
  const { userId } = useAuth()
  const router = useRouter()
  const { projectId } = router.query
  const { data: lists, add } = useLists(userId, String(projectId))

  return (
    <div>
      {'Lists'}
      <ol>
        {lists.map((l) => (
          <li key={l.id}>
            <Link href={`/users/${userId}/projects/${projectId}/lists/${l.id}`}>
              <a>{l.name}</a>
            </Link>
          </li>
        ))}
      </ol>
      {/* @ts-ignore */}
      <AddItemInput onAdd={(name: string) => add({ name: name })} />
    </div>
  )
}

export default withRequireAuth(Lists)
