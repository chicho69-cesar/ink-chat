import type { ComponentProps, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useAuth } from '../context/useAuth'

import placeholderImage from '@/assets/placeholder.svg'

export default function LoginPage({ className, ...props }: ComponentProps<'div'>) {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    await login(email, password)
    navigate('/chat', { replace: true })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-bold'>
                  Bienvenido a Ink Chat
                </h1>

                <p className='text-balance text-muted-foreground'>
                  Inicia sesión para continuar con tu cuenta
                </p>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>
                  Correo electrónico
                </Label>
                
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='johndoe@gmail.com'
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='password'>
                  Contraseña
                </Label>

                <Input
                  id='password'
                  type='password'
                  name='password'
                  placeholder='••••••••'
                  required
                />
              </div>

              <Button type='submit' className='w-full'>
                Iniciar sesión
              </Button>

              <div className='text-center text-sm'>
                ¿No tienes una cuenta?{' '}
                <Link
                  to='/auth/register'
                  className='underline underline-offset-4'
                >
                  Regístrate
                </Link>
              </div>
            </div>
          </form>

          <div className='relative hidden bg-[#111827] md:block'>
            <img
              src={placeholderImage}
              alt='Image'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
