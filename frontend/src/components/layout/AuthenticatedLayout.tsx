"use client"

import { useAuth } from '@/contexts/AuthContext'
import Sidebar from './Sidebar'
import { ReactNode, createContext, useContext, useState } from 'react'

/**
 * Navigation context for managing active page state across components
 */
interface NavigationContextType {
  activePage: string
  setActivePage: (page: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}

/**
 * Modern authenticated layout using CSS Grid with fixed height to prevent scroll issues
 * Includes navigation state management and smooth page transitions
 * @param {Object} props - component props
 * @param {ReactNode} props.children - page content to render in main area
 * @returns {JSX.Element} Grid-based layout with sidebar and main content
 */
interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const [activePage, setActivePage] = useState('jouer')

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0C0E14] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage }}>
      {/* Fixed height viewport container */}
      <div className="h-screen bg-[#0C0E14] grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 p-4">
        {/* Sidebar - Fixed width on desktop, overlay on mobile with proper scroll */}
        <aside className="lg:block lg:h-full lg:overflow-hidden">
          <Sidebar />
        </aside>
        
        {/* Main Content Area - Takes remaining space with proper overflow handling */}
        <main className="h-full overflow-auto">
          <div className="h-full transition-all duration-500 ease-in-out transform min-w-0">
            {children}
          </div>
        </main>
      </div>
    </NavigationContext.Provider>
  )
} 