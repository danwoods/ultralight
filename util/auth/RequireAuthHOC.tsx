import React, { useEffect } from 'react'
import { useAuth } from './useAuth'
import { useRouter } from 'next/router'

export const withRequireAuth = <P extends Object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const { userId } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!Boolean(userId)) {
        router.push('/login')
      }
    }, [userId])

    return <Component {...props} />
  }
}
