'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(null) // 🔥 Store JWT token (if used)

  // ✅ Validate session or JWT from server
  const validateSession = async () => {
    try {
      const res = await axiosInstance.get('/auth/profile') // 🔥 Unified endpoint
      const validUser = res.data.user

      // Cache safe fields (never password or token)
      const cachedUser = {
        userId: validUser.userId,
        name: validUser.name,
        email: validUser.email,
        role: validUser.role,
        status: validUser.status,
        profileImage: validUser.profileImage,
        preferences: validUser.profilePreferences || {},
        notifications: validUser.notificationPreferences || {},
        createdAt: validUser.createdAt,
        updatedAt: validUser.updatedAt,
      }

      localStorage.setItem('user', JSON.stringify(cachedUser))
      setUser(cachedUser)

      // Optionally save JWT if provided
      if (res.data.token) {
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
      }
    } catch (err) {
      console.error('❌ Session validation failed:', err)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Try restoring cached user
    const cachedUser = localStorage.getItem('user')
    const cachedToken = localStorage.getItem('token')

    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser))
      } catch {
        localStorage.removeItem('user')
      }
    }

    if (cachedToken) {
      setToken(cachedToken)
    }

    validateSession()
  }, [])

  // ✅ Logout mutation
  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post('/auth/logout'),
    onSuccess: () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
      toast.success('Logged out successfully')
    },
    onError: (err) => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
      const msg = err?.response?.data?.message || 'Logout failed'
      toast.error(msg)
    },
  })

  // ✅ Login helper (re-validate session after login)
  const login = async () => {
    await validateSession()
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
