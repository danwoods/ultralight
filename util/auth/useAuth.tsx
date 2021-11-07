import { useContext } from 'react'
import { AuthContext } from './Context'

//Use Auth Context
export const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
