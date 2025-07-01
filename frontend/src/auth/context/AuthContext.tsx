import { createContext } from 'react'
import type { User } from '../types/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isCheckingAuth: boolean

  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export type { AuthContextType }

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  login: async () => {
    throw new Error('login function not implemented')
  },
  register: async () => {
    throw new Error('register function not implemented')
  },
  logout: async () => {
    throw new Error('logout function not implemented')
  },
})
