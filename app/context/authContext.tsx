'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Validate session from server
  const validateSession = async () => {
    try {
      const res = await axiosInstance.get('/auth/me')
      const validUser = res.data.user

      // Store in localStorage (non-sensitive info only)
      localStorage.setItem('user', JSON.stringify(validUser))
      setUser(validUser)
    } catch (err) {
      localStorage.removeItem('user')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const cached = localStorage.getItem('user')
    if (cached) {
      try {
        setUser(JSON.parse(cached))
      } catch {
        localStorage.removeItem('user')
      }
    }

    validateSession()
  }, [])

  // LOGOUT mutation
  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post('/auth/logout'),
    onSuccess: () => {
      localStorage.removeItem('user')
      setUser(null)
      toast.success('Logged out successfully')
    },
    onError: (err) => {
      localStorage.removeItem('user')
      setUser(null)
      const msg = err?.response?.data?.message || 'Logout failed'
      toast.error(msg)
    },
  })

  const login = async () => {
    await validateSession()
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
