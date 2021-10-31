import React, { useState } from 'react'
import '../../components/Auth/init'
import { useRouter } from 'next/router'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()

import 'firebaseui/dist/firebaseui.css'

export const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log({ user })
        router.push('/Pjct')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log({ errorMessage, errorCode })
      })
  }

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
