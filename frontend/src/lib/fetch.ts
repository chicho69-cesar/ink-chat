import { AUTH_TOKEN_KEY } from '@/auth/constants/constants'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export async function fetchWithAuth<TReturn, TData = null>(endpoint: string, data?: TData, method: Method = 'GET'): Promise<TReturn> {
  try {
    const url = `${import.meta.env.VITE_API_URL}/${endpoint}`
    const token = localStorage.getItem(AUTH_TOKEN_KEY)!

    if (method === 'GET') {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const dataResponse = await response.json()
      return dataResponse as TReturn
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    const dataResponse = await response.json()
    return dataResponse as TReturn
  } catch (error) {
    console.error('Error fetching with auth:', error)
    throw error
  }
}

export async function fetchWithoutAuth<TReturn, TData = null>(endpoint: string, data?: TData, method: Method = 'GET'): Promise<TReturn> {
  try {
    const url = `${import.meta.env.VITE_API_URL}/${endpoint}`

    if (method === 'GET') {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const dataResponse = await response.json()
      return dataResponse as TReturn
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    const dataResponse = await response.json()
    return dataResponse as TReturn
  } catch (error) {
    console.error('Error fetching without auth:', error)
    throw error
  }
}
