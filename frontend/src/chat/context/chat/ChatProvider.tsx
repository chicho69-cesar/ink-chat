import { useReducer, type ReactNode } from 'react'
import { ChatContext, type ChatState } from './ChatContext'
import { chatReducer } from './chatReducer'

const INITIAL_CHAT_STATE: ChatState = {
  uid: '',
  activeChat: null,
  users: [],
  messages: []
}

interface ChatProviderProps {
  children?: ReactNode | ReactNode[]
}

export default function ChatProvider({ children }: ChatProviderProps) {
  const [chatState, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE)

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
