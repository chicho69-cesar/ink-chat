/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react'
import type { Message, User } from '@/auth/types/auth'

export interface ChatState {
  uid: string
  activeChat: string | null
  users: User[]
  messages: Message[]
}

export interface ChatContextType {
  chatState: ChatState,
  dispatch: React.Dispatch<{
    type: string
    payload?: any
  }>
}

const INITIAL_CONTEXT: ChatContextType = {
  chatState: {
    uid: '',
    activeChat: null,
    users: [],
    messages: []
  },
  dispatch: () => {}
}

export const ChatContext = createContext<ChatContextType>(INITIAL_CONTEXT)
