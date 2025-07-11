"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

/**
 * User data structure - represents a logged-in player
 */
interface User {
  id: number
  email: string
  name: string
  firstName?: string
  lastName?: string
  score: number
  avatar?: string
  jerseyNumber?: number
  skillLevel?: string
  position?: string
  championship?: string
  xp?: number
  coins?: number
  elo?: number
}

/**
 * All the data we collect during registration - everything needed for a complete profile
 */
export interface RegisterData {
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
  championship: string
  avatar: string
  jerseyNumber: number
  skillLevel: string
  position: string
}

/**
 * Auth context interface - all the auth-related stuff components need
 */
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  refreshProfile: () => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Auth provider component - wraps the app and provides auth state to everyone
 * @param {Object} props - component props
 * @param {ReactNode} props.children - child components
 * @returns {JSX.Element} - context provider wrapper
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const isAuthenticated = !!user

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/login') {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, pathname, router])

  /**
   * Logs in a user with email and password
   * @param {string} email - user's email
   * @param {string} password - user's password
   * @returns {Promise} - success status and optional error message
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Erreur de connexion' }
      }

      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      router.push('/')
      
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: 'Erreur de connexion' }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Registers a new user with complete profile data
   * @param {RegisterData} data - all the registration form data
   * @returns {Promise} - success status and optional error message
   */
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        return { success: false, error: responseData.error || 'Erreur d\'inscription' }
      }

      setUser(responseData.user)
      localStorage.setItem('user', JSON.stringify(responseData.user))
      
      router.push('/')
      
      return { success: true }
    } catch (error) {
      console.error('Register failed:', error)
      return { success: false, error: 'Erreur d\'inscription' }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Reloads user profile from API - useful for updating avatar after login fix
   */
  const refreshProfile = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user?.email) {
        return { success: false, error: 'Aucun utilisateur connecté' }
      }

      const response = await fetch('/api/auth/refresh-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Erreur de rechargement' }
      }

      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('✅ Profile refreshed with avatar:', data.user.avatar)
      
      return { success: true }
    } catch (error) {
      console.error('Refresh profile failed:', error)
      return { success: false, error: 'Erreur de connexion' }
    }
  }

  /**
   * Logs out the current user and redirects to login
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        refreshProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context - throws if used outside AuthProvider
 * @returns {AuthContextType} - auth context with user data and functions
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 