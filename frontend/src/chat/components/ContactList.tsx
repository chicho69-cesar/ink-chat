import { NavLink, useParams } from 'react-router'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useChat } from '../context/chat/useChat'
import { useMemo } from 'react'
import { useAuth } from '@/auth/context/useAuth'

export default function ContactList() {
  const { clientId } = useParams()
  const { chatState } = useChat()
  const { user: auth } = useAuth()

  const users = useMemo(() => {
    return chatState.users
      .filter((user) => user.uid !== auth?.uid)
  }, [auth?.uid, chatState.users])

  return (
    <ScrollArea className='h-[calc(100vh-120px)]'>
      <div className='space-y-4 p-4'>
        <div className='space-y-1'>
          <h3 className='px-2 text-sm font-semibold'>
            Usuarios conectados
          </h3>
          
          <div className='space-y-1'>
            {/* {isLoading && (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                <div className="animate-pulse">
                  Cargando usuarios...
                </div>
              </div>
            )} */}
            
            {users.length === 0 && (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                <div className="animate-pulse">
                  No hay usuarios conectados
                </div>
              </div>
            )}

            {users.map((user) => (
              <NavLink
                key={user.uid}
                to={`/chat/${user.uid}`}
                className={({ isActive }) => `
                  w-full flex items-center mt-3 transition-all duration-300 
                  ${isActive ? 'bg-primary/10 text-primary font-medium rounded-md' : 'hover:bg-muted/50 rounded-md'}
                `}
              >
                <div
                  className={`
                    h-6 w-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-xs 
                    ${clientId === user.uid ? 'bg-blue-300 text-blue-600 font-medium' : 'bg-gray-300'}
                  `}
                >
                  {user.name.charAt(0)}
                  {user.name.charAt(1)}
                </div>

                <span
                  className={`
                    transition-all duration-300
                    ${clientId === user.uid ? 'text-blue-600 font-medium' : 'text-gray-600'}
                  `}
                >
                  {user.name}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
