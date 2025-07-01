 
import { MessageSquare, Send } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useParams } from 'react-router'

import { useAuth } from '@/auth/context/useAuth'
import type { Message, User } from '@/auth/types/auth'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { fetchWithAuth } from '@/lib/fetch'
import { formatDate } from '@/lib/utils'
import { CHAT_ACTION_TYPES } from '../context/chat/chatReducer'
import { useChat } from '../context/chat/useChat'
import { useSocket } from '../context/socket/useSocket'

export default function ChatPage() {
  const { clientId } = useParams()
  const { chatState, dispatch } = useChat()
  const { user: auth } = useAuth()
  const { socket } = useSocket()
  const [input, setInput] = useState('')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const setupChat = async () => {
      dispatch({
        type: CHAT_ACTION_TYPES.ACTIVE_CHAT,
        payload: clientId || null
      })

      const resp = await fetchWithAuth<{
        ok: boolean
        messages: Message[]
      }>(
        `messages/${clientId}`
      )

      dispatch({
        type: CHAT_ACTION_TYPES.LOAD_MESSAGES,
        payload: resp.messages
      })
    }

    setupChat()
  }, [clientId, dispatch])

  useEffect(() => {
    const userExists = chatState.users.find((u) => u.uid === clientId)
    setUser(userExists || null)
  }, [chatState.users, clientId])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    socket?.emit('message', {
      from: auth?.uid,
      to: clientId,
      message: input.trim(),
    })

    setInput('')
  }

  return (
    <div className='flex-1 flex flex-col'>
      <ScrollArea className='flex-1 p-4 pb-24 max-h-screen overflow-y-auto'>
        {chatState.messages.length === 0 && (
          <div className='mt-10 flex-1 flex flex-col items-center justify-center gap-4'>
            <MessageSquare className='h-8 w-8 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>No hay mensajes</p>
          </div>
        )}

        <div className='space-y-4'>
          {chatState.messages.map((message, index) => (
            <div key={index} className='w-full'>
              {message.from === clientId ? (
                <div className='flex gap-2 max-w-[80%]'>
                  <div className='h-8 w-8 rounded-full bg-primary flex-shrink-0' />
                  
                  <div className=''>
                    <p className='text-sm font-medium'>
                      {user?.name || ''}
                    </p>

                    <div className='p-3 bg-muted/50 rounded-lg'>
                      <p className='text-sm whitespace-pre-wrap'>{message.message}</p>
                    </div>

                    <p className='text-xs mt-2 text-muted-foreground'>
                      {formatDate(message.created_at!)}
                    </p>

                    {/* <div className='flex items-center gap-2 mt-2'>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Copy className='h-4 w-4' />
                      </Button>

                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Download className='h-4 w-4' />
                      </Button>

                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <ThumbsUp className='h-4 w-4' />
                      </Button>
                      
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <ThumbsDown className='h-4 w-4' />
                      </Button>
                    </div> */}
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-end'>
                  <p className='text-sm font-medium'>
                    {auth?.name || ''}
                  </p>

                  <div className='bg-black text-white p-3 rounded-lg max-w-[80%]'>
                    <p className='text-sm whitespace-pre-wrap'>{message.message}</p>
                  </div>
                  
                  <p className='text-xs mt-2 text-muted-foreground'>
                    {formatDate(message.created_at!)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className='p-4 border-t sticky bottom-0 right-0 bg-background'>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <Textarea
              placeholder='Escribe un mensaje...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='min-h-[44px] h-[44px] resize-none py-3'
            />
  
            <Button className='h-[44px] px-4 flex items-center gap-2'>
              <Send className='h-4 w-4' />
              <span>Enviar</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
