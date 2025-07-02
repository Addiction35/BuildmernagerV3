'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // LOGOUT mutation
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      return axiosInstance.post('/auth/logout')
    },
    onSuccess: () => {
      localStorage.removeItem('user')
      setUser(null)
      toast.success('Logged out successfully')
    },
    onError: (err) => {
      localStorage.removeItem('user')
      const msg = err?.response?.data?.message || 'Logout failed'
      toast.error(msg)
    },
  })

  // Validate session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    let shouldLogout = false

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)

        if (!parsedUser?.userId) {
          shouldLogout = true
        }

        if (parsedUser?.expiresAt && Date.now() > parsedUser.expiresAt) {
          toast.warning('Session expired')
          shouldLogout = true
        }

        if (!shouldLogout) {
          setUser(parsedUser)
        }
      } catch (e) {
        console.error('Invalid localStorage user:', e)
        shouldLogout = true
      }
    } else {
      shouldLogout = true
    }

    if (shouldLogout) {
      localStorage.removeItem('user')
      setUser(null)
    }

    setIsLoading(false)
  }, [])

  // Sync across tabs
  useEffect(() => {
    const syncUserAcrossTabs = (e) => {
      if (e.key === 'user') {
        if (e.newValue) {
          try {
            const newUser = JSON.parse(e.newValue)
            if (newUser?.userId) {
              setUser(newUser)
            } else {
              logout()
            }
          } catch {
            logout()
          }
        } else {
          logout()
        }
      }
    }

    window.addEventListener('storage', syncUserAcrossTabs)
    return () => window.removeEventListener('storage', syncUserAcrossTabs)
  }, [logout])

  // Manual login state refresh
  const login = () => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.userId) {
          setUser(parsed)
        } else {
          logout()
        }
      } catch {
        logout()
      }
    } else {
      logout()
    }
  }

  const isAuthenticated = !!user?.userId

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
