/** @file Page for a list of projects */

import React, { useState } from 'react'
import Link from 'next/link'
import { useProjects } from '../../../../util/data/useProjects'
import { useAuth } from '../../../../util/auth/useAuth'
import { withRequireAuth } from '../../../../util/auth/RequireAuthHOC'
import { Button } from '../../../../components/Button'

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
 * Projects page
 * @returns {JSX.Element} Page for all a user's projects
 */
export const Projects = () => {
  const { userId } = useAuth()
  const { data: projects, add } = useProjects(userId)

  return (
    <div>
      <ol>
        {projects.map((p) => (
          <li key={p.id}>
            <Link href={`/users/${userId}/projects/${p.id}`}>
              <a>{p.name}</a>
            </Link>
          </li>
        ))}
      </ol>
      <AddItemInput
        onAdd={(name: string) =>
          add({
            name: name,
            sortOrder: projects.length || 0,
            parentId: userId
          })
        }
      />
    </div>
  )
}

export default withRequireAuth(Projects)
