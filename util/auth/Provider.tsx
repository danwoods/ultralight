import React, { ReactNode, useState } from 'react'
import { AuthContext } from './Context'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'

const authLogin = (email: string, password: string) => {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

// Export the provider as we need to wrap the entire app with it
export const AuthProvider = ({
  children
}: {
  children: ReactNode
}): JSX.Element => {
  const [userId, setUserId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const router = useRouter()

  const login = (email: string, password: string) => {
    return authLogin(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setUserId(user.uid)
        setToken(user.accessToken)
        router.push('/users/' + user.uid)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error({ errorMessage, errorCode })
        throw error
      })
  }

  // Call the logout endpoint and then remove the user
  // from the state.
  function logout() {
    setUserId(null)
    setToken(null)
  }

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={{ login, userId, token, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
