/**
 * @file Page de classement avec leaderboard et statistiques
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface de classement des joueurs avec statistiques de performance
 * Design cohérent avec les autres pages de l'application
 */

"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award } from 'lucide-react'
import Image from 'next/image'

/**
 * Interface pour un joueur du classement (basée sur le schema User)
 */
interface LeaderboardPlayer {
  id: number
  name: string
  firstName?: string
  lastName?: string
  email: string
  avatar?: string
  elo: number
  score: number
  xp: number
  coins: number
  jerseyNumber?: number
  skillLevel?: string
  position?: string
  championship?: string
  createdAt: string
}

/**
 * Page de classement avec leaderboard
 * @returns {JSX.Element} Interface de classement avec statistiques
 */
export default function ClassementPage() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<'elo' | 'coins' | 'xp'>('elo')
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Récupérer les vrais utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        if (response.ok) {
          const data = await response.json()
          setPlayers(data)
        } else {
          console.error('Erreur lors du chargement des utilisateurs')
        }
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Trier les joueurs selon la catégorie sélectionnée
  const sortedPlayers = [...players].sort((a, b) => {
    switch (selectedCategory) {
      case 'elo':
        return (b.elo || 0) - (a.elo || 0)
      case 'coins':
        return (b.coins || 0) - (a.coins || 0)
      case 'xp':
        return (b.xp || 0) - (a.xp || 0)
      default:
        return (b.elo || 0) - (a.elo || 0)
    }
  })

  // Trouver le rang de l'utilisateur connecté
  const userRank = sortedPlayers.findIndex(player => player.id === user?.id) + 1

  /**
   * Obtenir l'icône appropriée pour le rang
   */
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-[#AAAAAA] font-bold">#{rank}</span>
    }
  }

  /**
   * Obtenir la couleur du badge pour le niveau de compétence
   */
  const getSkillLevelColor = (skillLevel: string) => {
    switch (skillLevel) {
      case 'expert':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'advanced':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'intermediate':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }



  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-2">
            Classement
          </h1>
          <p className="text-[#AAAAAA] text-lg">
            Découvrez les meilleurs joueurs du championnat EPSI Montpellier
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedCategory('elo')}
            className={`px-4 py-2 rounded-lg font-nubernext-extended-bold transition-colors ${
              selectedCategory === 'elo'
                ? 'bg-[#EA1846] text-white'
                : 'bg-[#101118] text-[#AAAAAA] hover:bg-[#EA1846]/10 hover:text-white'
            }`}
          >
            Classement ELO
          </button>
          <button
            onClick={() => setSelectedCategory('coins')}
            className={`px-4 py-2 rounded-lg font-nubernext-extended-bold transition-colors ${
              selectedCategory === 'coins'
                ? 'bg-[#EA1846] text-white'
                : 'bg-[#101118] text-[#AAAAAA] hover:bg-[#EA1846]/10 hover:text-white'
            }`}
          >
            Coins
          </button>
          <button
            onClick={() => setSelectedCategory('xp')}
            className={`px-4 py-2 rounded-lg font-nubernext-extended-bold transition-colors ${
              selectedCategory === 'xp'
                ? 'bg-[#EA1846] text-white'
                : 'bg-[#101118] text-[#AAAAAA] hover:bg-[#EA1846]/10 hover:text-white'
            }`}
          >
            XP
          </button>
        </div>

        {/* User Position (if logged in) */}
        {user && userRank > 0 && (
          <Card className="bg-[#EA1846]/10 border-[#EA1846]/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {getRankIcon(userRank)}
                  <div>
                    <div className="text-white font-nubernext-extended-bold">
                      Votre Position
                    </div>
                    <div className="text-[#AAAAAA] text-sm">
                      #{userRank} sur {players.length} joueurs
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard */}
        <Card className="bg-[#101118] border-[#333]">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="text-[#AAAAAA]">Chargement des joueurs...</div>
              </div>
            ) : players.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-[#AAAAAA]">Aucun joueur trouvé</div>
              </div>
            ) : (
            <div className="space-y-1">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-4 flex items-center gap-4 hover:bg-[#0C0E14] transition-colors ${
                    player.id === user?.id ? 'bg-[#EA1846]/5 border-l-4 border-[#EA1846]' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="w-12 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#333] flex items-center justify-center">
                    {player.avatar ? (
                      <img 
                        src={player.avatar} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {player.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-nubernext-extended-bold">
                        {player.firstName && player.lastName 
                          ? `${player.firstName} ${player.lastName}` 
                          : player.name
                        }
                      </h3>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-center">
                    <div>
                      <div className="text-white font-nubernext-extended-bold text-lg">
                        {selectedCategory === 'elo' && player.elo}
                        {selectedCategory === 'coins' && player.coins}
                        {selectedCategory === 'xp' && player.xp}
                      </div>
                      <div className="text-[#AAAAAA] text-xs">
                        {selectedCategory === 'elo' && 'ELO'}
                        {selectedCategory === 'coins' && 'Coins'}
                        {selectedCategory === 'xp' && 'XP'}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-nubernext-extended-bold text-lg">
                        {player.coins}
                      </div>
                      <div className="text-[#AAAAAA] text-xs">Coins</div>
                    </div>
                    <div>
                      <div className="text-white font-nubernext-extended-bold text-lg">
                        {player.xp}
                      </div>
                      <div className="text-[#AAAAAA] text-xs">XP</div>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="md:hidden text-right">
                    <div className="text-white font-nubernext-extended-bold">
                      {selectedCategory === 'elo' && player.elo}
                      {selectedCategory === 'coins' && player.coins}
                      {selectedCategory === 'xp' && player.xp}
                    </div>
                    <div className="text-[#AAAAAA] text-xs">
                      Coins: {player.coins}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 