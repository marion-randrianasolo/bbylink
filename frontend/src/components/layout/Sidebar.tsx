"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigation } from './AuthenticatedLayout'
import Image from 'next/image'
import PlayerXPIndicator from '@/components/ui/PlayerXPIndicator'
import { 
  Users, 
  User,
  Trophy,
  Calendar,
  DollarSign,
  MapPin,
  Menu,
  X,
  LogOut
} from 'lucide-react'

/**
 * Modern sidebar component with intelligent scroll handling
 * Only shows scroll when content actually overflows the available height
 * @returns {JSX.Element} Semantic sidebar with optimized scroll behavior
 */
export default function Sidebar() {
  const { user, logout } = useAuth()
  const { activePage, setActivePage } = useNavigation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs for mobile menu handling
  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  if (!user) return null

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handlePageChange = (pageId: string) => {
    setActivePage(pageId)
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  /**
   * Format user name with proper capitalization
   */
  const formatUserName = (firstName?: string, lastName?: string, fallbackName?: string): string => {
    if (firstName && lastName) {
      const formattedFirst = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
      const formattedLast = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
      return `${formattedFirst} ${formattedLast}`
    }
    return fallbackName || 'Player'
  }

  /**
   * Get skill level display text in French
   */
  const getSkillLevelDisplay = (skillLevel?: string): string => {
    const skillLevels: { [key: string]: string } = {
      'beginner': 'DEBUTANT',
      'intermediate': 'INTERMEDIAIRE', 
      'expert': 'EXPERT',
      'advanced': 'AVANCE',
      'novice': 'NOVICE',
      'master': 'MAITRE'
    }
    
    if (!skillLevel) return 'DEBUTANT'
    const normalized = skillLevel.toLowerCase()
    return skillLevels[normalized] || skillLevel.toUpperCase()
  }

  // Custom Soccer Field Icon SVG component
  const SoccerFieldIcon = ({ className }: { className?: string }) => (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M4 4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2h7v2.13c-1.76.46-3 2.05-3 3.87a4.01 4.01 0 0 0 3 3.87V18H4v-2h3V8H4zm9 0h7v2h-3v8h3v2h-7v-2.13c1.76-.46 3-2.05 3-3.87a4.01 4.01 0 0 0-3-3.87zm-9 4h1v4H4zm15 0h1v4h-1zm-6 .27c.62.36 1 1.02 1 1.73s-.38 1.37-1 1.73zm-2 0v3.46c-.62-.36-1-1.02-1-1.73s.38-1.37 1-1.73"
      />
    </svg>
  )

  const navigationItems = [
    { id: 'jouer', label: 'Jouer', icon: SoccerFieldIcon },
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'joueurs', label: 'Joueurs', icon: Users },
    { id: 'classement', label: 'Classement', icon: Trophy },
    { id: 'reserver', label: 'Réserver', icon: Calendar },
    { id: 'parier', label: 'Parier', icon: DollarSign },
  ]

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-50 bg-[#1a1a1a] text-white p-3 rounded-lg shadow-lg"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container - Proper flex structure for scrolling */}
      <div 
        ref={sidebarRef}
        className={`
          bg-[#0C0E14] h-full flex flex-col
          lg:relative lg:translate-x-0
          max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-80 max-lg:z-50
          max-lg:transform max-lg:transition-transform max-lg:duration-300
          ${isMobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
        `}
      >
        
        {/* Header Section - Fixed at top */}
        <header className="flex-shrink-0 px-6 pt-6 pb-4">
          <div className="flex items-center justify-center">
            {/* Logo - Centered everywhere */}
            <div className="flex items-center gap-3">
              <Image 
                src="/assets/logo.png" 
                alt="BabyLink Logo" 
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h1 className="text-lg font-nubernext-extended-heavy uppercase">
                <span className="text-white">Baby</span>
                <span className="text-[#EA1846]">Link</span>
              </h1>
            </div>
            
            {/* Close button - Hidden on mobile as requested */}
            {/* Supprimé : il y a déjà une croix qui remplace le menu hamburger */}
          </div>
        </header>

        {/* Scrollable Content Area - Takes remaining space */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-6 min-h-0"
        >
          
          {/* User Profile Section */}
          <section className="pb-4">
            <div className="flex flex-col items-center">
              <PlayerXPIndicator
                xpLevel={2}
                avatarSrc={user.avatar}
                userName={formatUserName(user.firstName, user.lastName, user.name)}
              />

              <p className="text-[#666666] text-xs uppercase tracking-wide mt-2">
                {getSkillLevelDisplay(user.skillLevel)}
              </p>

              <h2 className="text-white font-nubernext-extended-heavy text-lg text-center mt-1">
                {formatUserName(user.firstName, user.lastName, user.name)}
              </h2>

              <p className="text-[#EA1846] font-nubernext-extended-heavy text-sm mt-1">
                XP: {user.xp || 1250}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#888888]" />
                <span className="text-[#AAAAAA] text-sm">EPSI Montpellier</span>
              </div>
            </div>
          </section>

          {/* Stats Section - Uniquement COINS et ELO */}
          <section className="pb-6 pt-4">
            <div className="flex justify-center gap-10">
              <div className="flex flex-col items-center space-y-2">
                <Image 
                  src="/assets/coin.png" 
                  alt="Coins" 
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="text-center">
                  <div className="text-white font-nubernext-extended-heavy text-lg">
                    {user.coins || 0}
                  </div>
                  <div className="text-[#666666] text-xs uppercase tracking-wide">COINS</div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Image 
                  src="/assets/trophy.png" 
                  alt="ELO" 
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="text-center">
                  <div className="text-white font-nubernext-extended-heavy text-lg">
                    {user.elo || 1000}
                  </div>
                  <div className="text-[#666666] text-xs uppercase tracking-wide">ELO</div>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Section */}
          <nav className="pb-4">
            <div className="grid grid-cols-2 gap-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`
                      h-28 w-full flex flex-col items-center justify-center gap-3 
                      transition-all duration-200 hover:bg-[#EA1846] group cursor-pointer
                      ${activePage === item.id 
                        ? 'bg-[#EA1846]' 
                        : 'bg-[#101118] hover:bg-[#EA1846]'
                      }
                    `}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <IconComponent 
                      className={`w-6 h-6 transition-colors ${
                        activePage === item.id 
                          ? 'text-white' 
                          : 'text-[#888888] group-hover:text-white'
                      }`} 
                    />
                    <span 
                      className={`font-nubernext-extended-heavy text-sm transition-colors ${
                        activePage === item.id 
                          ? 'text-white' 
                          : 'text-[#888888] group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Logout Button - More space for desktop visibility */}
          <div className="pt-4 pb-2">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 text-[#888888] hover:text-[#EA1846] transition-colors duration-200 py-2 group text-sm"
              aria-label="Logout from account"
            >
              <LogOut className="w-4 h-4 group-hover:text-[#EA1846] transition-colors" />
              <span className="font-medium group-hover:text-[#EA1846] transition-colors">
                Déconnexion
              </span>
            </button>
          </div>

        </div>

      </div>
    </>
  )
} 