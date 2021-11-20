import React from 'react'
import useAuth from '../../util/auth/useAuth'
import Button from '../../components/Button'
import Link from 'next/link'

const Header = () => {
  const { userId, logout } = useAuth()
  return (
    <div className="w-full flex justify-end">
      <div>
        {Boolean(userId) ? (
          <Button onClick={logout}>{'Logout'}</Button>
        ) : (
          <Link href="/login">
            <Button>{'Login'}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
