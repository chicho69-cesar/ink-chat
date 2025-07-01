import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { useAuth } from '@/auth/context/useAuth'
import AuthLayout from '@/auth/layout/AuthLayout'
import LoginPage from '@/auth/pages/LoginPage'
import RegisterPage from '@/auth/pages/RegisterPage'
import ChatLayout from '@/chat/layout/ChatLayout'
import ChatPage from '@/chat/pages/ChatPage'
import NoChatSelectedPage from '@/chat/pages/NoChatSelectedPage'
import PrivateRoute from './PrivateRoute'

export default function Router() {
  const { user, isCheckingAuth } = useAuth()

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        <Route
          path='/chat'
          element={
            <Suspense
              fallback={
                <div className='flex h-screen w-full items-center justify-center bg-background'>
                  <div className='h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
                </div>
              }
            >
              <PrivateRoute isAuthenticated={!!user}>
                <ChatLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<NoChatSelectedPage />} />
          <Route path=':clientId' element={<ChatPage />} />
        </Route>

        <Route path='/' element={<Navigate to='/auth/login' replace />} />
        <Route path='*' element={<Navigate to='/auth/login' replace />} />
      </Routes>
    </BrowserRouter>
  )
}
