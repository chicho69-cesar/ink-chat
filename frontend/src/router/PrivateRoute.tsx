import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

interface PrivateRouteProps {
  children: ReactNode | ReactNode[]
  isAuthenticated?: boolean
}

export default function PrivateRoute({ children, isAuthenticated = false }: PrivateRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />
  }

  return children
}
