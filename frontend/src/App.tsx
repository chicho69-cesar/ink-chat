import AuthProvider from './auth/context/AuthProvider'
import ChatProvider from './chat/context/chat/ChatProvider'
import SocketProvider from './chat/context/socket/SocketProvider'
import { Toaster } from './components/ui/sonner'
import Router from './router/Router'

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <SocketProvider>
          <Router />
          <Toaster richColors  position='bottom-right' />
        </SocketProvider>
      </ChatProvider>
    </AuthProvider>
  )
}

export default App
