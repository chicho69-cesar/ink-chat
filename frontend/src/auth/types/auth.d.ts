export interface User {
  uid: string
  name: string
  email: string
  online: boolean
  created_at?: string
  updated_at?: string
}

export interface Message {
  uid: string
  from: string
  to: string
  message: string
  created_at?: string
  updated_at?: string
}
