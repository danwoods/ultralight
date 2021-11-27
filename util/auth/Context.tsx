import React from 'react'

interface AuthContextType {
  login: (email: string, password: string) => Promise<any>
  logout: () => void
  token: null | string
  userId: null | string
}

//Auth Context
export const AuthContext = React.createContext<AuthContextType>({
  login: (email: string, password: string) =>
    Promise.reject('AUTH_NOT_INITIALIZED'),
  logout: () => {},
  token: null,
  userId: null
})

export default AuthContext
