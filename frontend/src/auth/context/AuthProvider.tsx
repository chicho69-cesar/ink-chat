import { useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

import { fetchWithAuth, fetchWithoutAuth } from '@/lib/fetch'
import { AUTH_TOKEN_KEY } from '../constants/constants'
import type { User } from '../types/auth'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children?: ReactNode | ReactNode[]
}

interface AuthResponse {
  user: User
  ok: boolean
  token: string
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)

        if (!token) {
          setUser(null)
          setIsAuthenticated(false)

          return
        }

        const resp = await fetchWithAuth<AuthResponse>('auth/renew')

        if (resp.ok) {
          setUser(resp.user)
          setIsAuthenticated(true)

          localStorage.setItem(AUTH_TOKEN_KEY, resp.token)

          return
        }

        setUser(null)
        setIsAuthenticated(false)

        localStorage.removeItem(AUTH_TOKEN_KEY)
      } catch (error) {
        console.error('Error verifying authentication:', error)

        setUser(null)
        setIsAuthenticated(false)

        toast.error('Ocurrió un error al verificar la autenticación. Por favor, inténtalo de nuevo.')
      } finally {
        setIsCheckingAuth(false)
      }
    }

    verifyAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsCheckingAuth(true)

      const resp = await fetchWithoutAuth<AuthResponse, { email: string, password: string }>(
        'auth/login',
        { email, password },
        'POST'
      )

      if (resp.ok) {
        setUser(resp.user)
        setIsAuthenticated(true)

        localStorage.setItem(AUTH_TOKEN_KEY, resp.token)
        
        return
      }

      setUser(null)
      setIsAuthenticated(false)

      toast.error('Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña.')
    } catch (error) {
      console.error('Error during login:', error)

      setUser(null)
      setIsAuthenticated(false)

      toast.error('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.')
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsCheckingAuth(true)

      const resp = await fetchWithoutAuth<AuthResponse, { email: string, password: string, name: string }>(
        'auth/register',
        { email, password, name },
        'POST'
      )

      if (resp.ok) {
        setUser(resp.user)
        setIsAuthenticated(true)

        localStorage.setItem(AUTH_TOKEN_KEY, resp.token)
        
        return
      }

      setUser(null)
      setIsAuthenticated(false)

      toast.error('Error al registrar la cuenta. Por favor, verifica tus datos e inténtalo de nuevo.')
    } catch (error) {
      console.error('Error during login:', error)

      setUser(null)
      setIsAuthenticated(false)

      toast.error('Ocurrió un error al registrar la cuenta. Por favor, inténtalo de nuevo.')
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const logout = async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    
    setUser(null)
    setIsAuthenticated(false)
    setIsCheckingAuth(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isCheckingAuth,

        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
