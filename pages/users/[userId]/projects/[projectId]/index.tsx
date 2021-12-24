/** @file Project page */

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../../../../util/auth/useAuth'
import { withRequireAuth } from '../../../../../util/auth/RequireAuthHOC'
import { useRouter } from 'next/router'

/**
 * Page for a project
 * @returns {JSX.Element} Page for a project
 */
export const Project = () => {
  const { userId } = useAuth()
  const router = useRouter()
  const { projectId } = router.query

  return (
    <div>
      {'Project'}
      <Link href={`/users/${userId}/projects/${projectId}/lists`}>
        <a>{'Lists'}</a>
      </Link>
    </div>
  )
}

export default withRequireAuth(Project)
