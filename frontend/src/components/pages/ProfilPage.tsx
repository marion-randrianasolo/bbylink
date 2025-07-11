/**
 * @file Page de profil utilisateur avec statistiques et personnalisation
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface de gestion du profil joueur incluant les stats, avatar et préférences
 */

"use client"

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import PlayerXPIndicator from '@/components/ui/PlayerXPIndicator'
import BabyFootPosition, { POSITIONS } from '@/components/babyfoot_component/BabyFootPosition'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Jersey component that lets users view their number
 * @param {string} number - current jersey number
 * @returns {JSX.Element} - jersey display
 */
const JerseyDisplay = ({ number }: { number: string }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex justify-center items-center">
        <div
          className="relative flex justify-center items-center"
          style={{
            backgroundImage: 'url("/assets/shirt-back.png")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundSize: "contain",
            width: "200px",
            height: "150px",
            minHeight: "150px",
          }}
        >
          <div
            className="absolute text-center bg-transparent text-gray-200 font-medium jersey-number"
            style={{
              fontSize: "40px",
              lineHeight: "40px",
              fontWeight: "500",
              paddingBottom: "20px",
              textShadow: "none",
              width: "80px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {number || "00"}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Page de profil utilisateur
 * @returns {JSX.Element} Interface de profil avec stats et options
 */
export default function ProfilPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-2">
            Mon Profil
          </h1>
          <p className="text-[#AAAAAA] text-lg">
            Gérer mes informations et statistiques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#101118] rounded-xl p-6">
              <div className="text-center flex flex-col items-center">
                <PlayerXPIndicator
                  xpLevel={2}
                  avatarSrc={user.avatar}
                  userName={user.name || 'Player'}
                />
                <h2 className="text-xl font-nubernext-extended-bold text-white mt-4 mb-2">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.name
                  }
                </h2>
                <p className="text-[#EA1846] font-nubernext-extended-bold mb-4">
                  XP: {user.xp || 1250}
                </p>
                <button className="w-full bg-[#EA1846] text-white py-3 rounded-lg font-nubernext-extended-bold hover:bg-[#d41539] transition-colors">
                  Modifier Avatar
                </button>
              </div>
            </div>
          </div>

          {/* Statistics & Preferences */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="bg-[#101118] rounded-xl p-6">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-4">
                Statistiques
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    {user.score || 0}
                  </div>
                  <div className="text-sm text-[#AAAAAA]">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    {user.xp || 1250}
                  </div>
                  <div className="text-sm text-[#AAAAAA]">Expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    {user.coins || 0}
                  </div>
                  <div className="text-sm text-[#AAAAAA]">Coins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-nubernext-extended-bold text-[#EA1846] mb-1">
                    {user.elo || 1000}
                  </div>
                  <div className="text-sm text-[#AAAAAA]">ELO</div>
                </div>
              </div>
            </div>

            {/* Player Preferences */}
            <div className="bg-[#101118] rounded-xl p-6">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-6">
                Préférences de Jeu
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Jersey Number */}
                <div className="text-center">
                  <h4 className="text-lg font-nubernext-extended-bold text-white mb-4">
                    Numéro de Maillot
                  </h4>
                  <JerseyDisplay number={user.jerseyNumber?.toString() || "00"} />
                  <p className="text-[#AAAAAA] text-sm mt-2">
                    Numéro #{user.jerseyNumber || "00"}
                  </p>
                </div>

                {/* Preferred Position */}
                <div className="text-center">
                  <h4 className="text-lg font-nubernext-extended-bold text-white mb-4">
                    Position Préférée
                  </h4>
                  <div className="flex justify-center">
                    <BabyFootPosition 
                      selectedPosition={user.position as keyof typeof POSITIONS || 'GOAL'}
                      onPositionChange={undefined}
                      className="scale-75"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 