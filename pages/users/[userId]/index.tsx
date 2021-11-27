import React from 'react'
import Link from 'next/link'
import { useProjects } from '../../../util/data/useProjects'
import { useAuth } from '../../../util/auth/useAuth'
import { withRequireAuth } from '../../../util/auth/RequireAuthHOC'

export const Pjct = () => {
  const { userId } = useAuth()
  const { data: projects } = useProjects(userId)

  return (
    <div>
      {'Projects'}
      <ol>
        {projects.map((p) => (
          // @ts-ignore
          <li key={p.id}>
            {/* @ts-ignore */}
            <Link href={`/users/${userId}/projects/${p.id}`}>
              <a>{p.name}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default withRequireAuth(Pjct)
