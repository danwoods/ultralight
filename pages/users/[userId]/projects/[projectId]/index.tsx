import React from 'react'
import Link from 'next/link'
import { useLists } from '../../../../../util/data/useLists'
import { useAuth } from '../../../../../util/auth/useAuth'
import { withRequireAuth } from '../../../../../util/auth/RequireAuthHOC'
import { useRouter } from 'next/router'

export const List = () => {
  const { userId } = useAuth()
  const router = useRouter()
  const { projectId } = router.query
  const { data: lists } = useLists(userId, projectId)

  return (
    <div>
      {'Lists'}
      <ol>
        {lists.map((l) => (
          // @ts-ignore
          <li key={l.id}>
            {/* @ts-ignore */}
            <Link href={`users/${userId}/projects/${projectId}/lists/${l.id}`}>
              <a>{l.name}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default withRequireAuth(List)
