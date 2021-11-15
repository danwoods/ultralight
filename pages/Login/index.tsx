/** @file Login Page */
import React, { useState } from 'react'
import '../../components/Auth/init'
import { useAuth } from '../../util/auth/useAuth'
import 'firebaseui/dist/firebaseui.css'

/** Login Page */
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
    <div className="w-full p-20">
      <h1>Login</h1>
      <div className="flex flex-col w-10/12 mx-auto mt-60">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="m-8 p-5"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="m-8 mt-1 p-5"
        />

        <button
          title="Click to log in"
          onClick={handleLogin}
          className="m-8 mt-1 ml-auto p-5 bg-green-500"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
