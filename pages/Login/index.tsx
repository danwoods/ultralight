/** @file Login Page */
import '../../components/Auth/init'
import 'firebaseui/dist/firebaseui.css'
import Button from '../../components/Button'
import React, { useState } from 'react'
import TextInput from '../../components/Inputs/Text'
import log from '../../util/logger'
import { useAuth } from '../../util/auth/useAuth'

/** Login Page */
export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isProcessingLogin, setisProcessingLogin] = useState(false)
  const { login } = useAuth()

  const handleLogin = () => {
    setisProcessingLogin(true)
    login(email, password)
      .catch((error) => {
        log.error(error)
      })
      .catch(() => setisProcessingLogin(false))
  }

  return (
    <div className="w-full p-20">
      <h1>Login</h1>
      <div className="flex flex-col w-10/12 mx-auto mt-52">
        <TextInput
          value={email}
          onChange={(newEmail) => setEmail(newEmail)}
          label={'Email Address'}
          type={'email'}
        />
        <TextInput
          value={password}
          onChange={(newPassword) => setPassword(newPassword)}
          label={'Password'}
          type={'password'}
        />

        <Button
          disabled={isProcessingLogin}
          title="Click to log in"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login
