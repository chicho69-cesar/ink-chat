import { LogOut } from 'lucide-react'
import { Link, Outlet } from 'react-router'

import { useAuth } from '@/auth/context/useAuth'
import { Button } from '@/components/ui/button'
import ContactList from '../components/ContactList'

export default function ChatLayout() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }
  
  return (
    <div className='flex h-screen bg-background overflow-hidden'>
      <div className='w-64 border-r bg-muted/10'>
        <div className='p-4 border-b h-14'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 rounded-full bg-primary' />

            <Link to='/chat'>
              <span className='font-semibold'>
                {user?.name ?? '...'}
              </span>
            </Link>
          </div>
        </div>

        <ContactList />

        <div className='p-4 border-t'>
          <Button
            onClick={handleLogout}
            variant='ghost'
            size='sm'
            className='w-full cursor-pointer'
          >
            <LogOut className='h-4 w-4' />
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className='flex-1 flex'>
        <div className='flex-1 flex flex-col'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
