'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axiosInstance from '@/lib/api/axiosInstance'


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser?.userId) {
          setUser(parsedUser)
        }
      } catch (e) {
        console.error('Invalid localStorage user:', e)
      }
    }
    setIsLoading(false)
  }, [])

  // Sync across tabs
  useEffect(() => {
    const syncUserAcrossTabs = (event) => {
      if (event.key === 'user') {
        if (event.newValue) {
          try {
            setUser(JSON.parse(event.newValue))
          } catch {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      }
    }

    window.addEventListener('storage', syncUserAcrossTabs)
    return () => window.removeEventListener('storage', syncUserAcrossTabs)
  }, [])

  // Manual login load (e.g., after login mutation)
  const login = () => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.userId) {
          setUser(parsed)
        }
      } catch (e) {
        console.error('Login parsing failed:', e)
      }
    }
  }

  // Mutation for logging out
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      return axiosInstance.get('/auth/logout')
    },
    onSuccess: () => {
      localStorage.removeItem('user')
      setUser(null)
      toast.success('Logged out successfully')
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || 'Logout failed'
      toast.error(msg)
      console.error('Logout error:', err)
    },
  })

  const isAuthenticated = !!user?.userId

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)