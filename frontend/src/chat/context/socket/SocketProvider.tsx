import { useEffect, type ReactNode } from 'react'

import { useAuth } from '@/auth/context/useAuth'
import useSockets from '@/chat/hooks/useSockets'
import { CHAT_ACTION_TYPES } from '../chat/chatReducer'
import { useChat } from '../chat/useChat'
import { SocketContext } from './SocketContext'

interface SocketProviderProps {
  children?: ReactNode | ReactNode[]
}

export default function SocketProvider({ children }: SocketProviderProps) {
  const { socket, online, connectSocket, disconnectSocket } = useSockets(import.meta.env.VITE_WS_URL)
  const { isAuthenticated } = useAuth()
  const { dispatch } = useChat()

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket()
    }
  }, [isAuthenticated, connectSocket])
  
  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket()
    }
  }, [isAuthenticated, disconnectSocket])

  useEffect(() => {
    socket?.on('users-list', (users) => {
      dispatch({
        type: CHAT_ACTION_TYPES.USERS_LOAD,
        payload: users
      })
    })
  }, [socket, dispatch])
  
  useEffect(() => {
    socket?.on('message', (message) => {
      dispatch({
        type: CHAT_ACTION_TYPES.NEW_MESSAGE,
        payload: message
      })
    })
  }, [socket, dispatch])

  return (
    <SocketContext.Provider
      value={{
        socket,
        online
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
