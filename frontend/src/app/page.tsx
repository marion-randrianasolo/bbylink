/**
 * @file Page d'accueil principale de l'application BabyLink
 * @author BabyLink Team  
 * @created 2025-01-09
 * 
 * Point d'entrée principal de l'application avec gestion de l'authentification
 * et navigation entre les différentes sections avec animations fluides
 */

"use client"

import { useAuth } from '@/contexts/AuthContext'
import AuthenticatedLayout, { useNavigation } from '@/components/layout/AuthenticatedLayout'
import JouerPage from '@/components/pages/JouerPage'
import ProfilPage from '@/components/pages/ProfilPage'
import ClassementPage from '@/components/pages/ClassementPage'
import { useState, useEffect } from 'react'

/**
 * Composant principal de contenu avec navigation dynamique et animations
 * @returns {JSX.Element} Page correspondant à la navigation active avec transitions
 */
function MainContent() {
  const { activePage } = useNavigation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayedPage, setDisplayedPage] = useState(activePage)

  useEffect(() => {
    if (activePage !== displayedPage) {
      setIsTransitioning(true)
      setTimeout(() => {
        setDisplayedPage(activePage)
        setTimeout(() => setIsTransitioning(false), 50)
      }, 250)
    }
  }, [activePage, displayedPage])

  const renderPage = () => {
    switch (displayedPage) {
      case 'jouer':
        return <JouerPage />
      case 'profil':
        return <ProfilPage />
      case 'joueurs':
        return (
          <div className="h-full p-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-4">
                Liste des Joueurs
              </h1>
              <p className="text-[#AAAAAA] text-lg">
                Page en cours de développement...
              </p>
            </div>
          </div>
        )
      case 'classement':
        return <ClassementPage />
      case 'reserver':
        return (
          <div className="h-full p-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-4">
                Réservation
              </h1>
              <p className="text-[#AAAAAA] text-lg">
                Page en cours de développement...
              </p>
            </div>
          </div>
        )
      case 'parier':
        return (
          <div className="h-full p-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-4">
                Paris
              </h1>
              <p className="text-[#AAAAAA] text-lg">
                Page en cours de développement...
              </p>
            </div>
          </div>
        )
      default:
        return <JouerPage />
    }
  }

  return (
    <div className={`
      h-full transition-all duration-500 ease-in-out transform
      ${isTransitioning 
        ? 'opacity-0 translate-x-4 scale-[0.98]' 
        : 'opacity-100 translate-x-0 scale-100'
      }
    `}>
      {renderPage()}
    </div>
  )
}

/**
 * Page d'accueil principale avec gestion d'authentification
 * @returns {JSX.Element} Interface complète de l'application
 */
export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0C0E14] flex items-center justify-center">
        <div className="text-white font-nubernext-extended-heavy text-xl animate-pulse">
          Chargement de BabyLink...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-[#0C0E14] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-nubernext-extended-heavy text-white mb-4">
            <span className="text-white">Baby</span>
            <span className="text-[#EA1846]">Link</span>
          </h1>
          <p className="text-[#AAAAAA] text-lg mb-8">
            Connectez-vous pour accéder à la plateforme
          </p>
          <button 
            className="bg-[#EA1846] text-white px-8 py-3 rounded-lg font-nubernext-extended-bold hover:bg-[#d41539] transition-all duration-300 hover:scale-105"
            onClick={() => window.location.href = '/login'}
          >
            Se Connecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <AuthenticatedLayout>
      <MainContent />
    </AuthenticatedLayout>
  )
}
