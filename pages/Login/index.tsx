import React, { useState } from 'react'
import '../../components/Auth/init'

import { useAuth } from '../../util/auth/useAuth'

import 'firebaseui/dist/firebaseui.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleLogin = () => {
    login(email, password).catch((error) => {
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
