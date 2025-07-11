/**
 * Custom hook for responsive sidebar management
 * Handles mobile/desktop layout transitions
 */
'use client'

import { useState, useEffect } from 'react'

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return {
    isMobile,
    sidebarOpen,
    toggleSidebar,
    closeSidebar
  }
} 