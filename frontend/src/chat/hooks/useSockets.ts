import { useCallback, useEffect, useState } from 'react'
import { connect, Socket } from 'socket.io-client'

import { AUTH_TOKEN_KEY } from '@/auth/constants/constants'

export default function useSockets(serverPath: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [online, setOnline] = useState(false)

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    const socketTemp = connect(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        token
      }
    })

    setSocket(socketTemp)
  }, [serverPath])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    setOnline(socket?.connected || false)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true))
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false))
  }, [socket])

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket
  }
}
