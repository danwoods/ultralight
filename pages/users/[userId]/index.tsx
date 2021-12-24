import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../../util/auth/useAuth'
import { withRequireAuth } from '../../../util/auth/RequireAuthHOC'

export const User = () => {
  const { userId } = useAuth()

  return (
    <div>
      {'User'}
      <ol>
        <li>
          <Link href={`/users/${userId}/projects`}>
            <a>{'Projects'}</a>
          </Link>
        </li>
      </ol>
    </div>
  )
}

export default withRequireAuth(User)
