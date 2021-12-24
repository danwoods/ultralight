/** @file Page for a list of lists */

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../../../../../util/auth/useAuth'
import { withRequireAuth } from '../../../../../../util/auth/RequireAuthHOC'
import { useLists } from '../../../../../../util/data/useLists'
import { useRouter } from 'next/router'

/**
 * Page of lists
 * @returns {JSX.Element} Page of lists
 */
export const Lists = () => {
  const { userId } = useAuth()
  const router = useRouter()
  const { projectId } = router.query
  const { data: lists } = useLists(userId, String(projectId))

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
    </div>
  )
}

export default withRequireAuth(Lists)
