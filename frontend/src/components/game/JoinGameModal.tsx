/**
 * @file Modal pour rejoindre une partie avec code
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface pour rejoindre une partie existante en utilisant un code à 4 chiffres
 * Affiche un aperçu de la partie avant de confirmer la participation
 */

"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { socketService } from '@/lib/socket'
import AvatarService from '@/lib/avatarService'

interface GameData {
  id: number
  code: string
  status: string
  gameMode: string
  winCondition: string
  winValue: number
  maxGoals?: number
  host: {
    id: number
    name: string
    firstName?: string
    lastName?: string
    avatar?: string
    elo?: number
  }
  table: {
    id: number
    name: string
    location: string
  }
  players: Array<{
    id: number
    team: string
    position: string
    isGuest: boolean
    guestName?: string
    user?: {
      id: number
      name: string
      firstName?: string
      lastName?: string
      avatar?: string
      elo?: number
      skillLevel?: string
      position?: string
    }
  }>
}

interface JoinGameModalProps {
  isOpen: boolean
  onClose: () => void
  onGameJoined: (gameData: GameData) => void
  initialCode?: string
}

/**
 * Modal pour rejoindre une partie avec code de 4 chiffres
 * @param {JoinGameModalProps} props - propriétés du modal
 * @returns {JSX.Element} Modal de rejoint de partie
 */
export default function JoinGameModal({ isOpen, onClose, onGameJoined, initialCode = '' }: JoinGameModalProps) {
  const { user } = useAuth()
  const [gameCode, setGameCode] = useState(initialCode)
  const [isLoading, setIsLoading] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setGameCode(initialCode)
      setGameData(null)
      setError(null)
    }
  }, [isOpen, initialCode])

  // Auto-search when code is 4 digits
  useEffect(() => {
    if (gameCode.length === 4) {
      searchGame()
    } else {
      setGameData(null)
      setError(null)
    }
  }, [gameCode])

  const searchGame = async () => {
    if (!gameCode || gameCode.length !== 4) return

    setIsLoading(true)
    setError(null)
    
    try {
      // Chercher la partie via Flask avec auto-détection hostname
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
      const serverUrl = `http://${hostname}:5000/api/games/${gameCode}`
      console.log(`🔍 Searching game on: ${serverUrl}`)
      const response = await fetch(serverUrl)
      const data = await response.json()

      if (response.ok) {
        setGameData(data.game)
        
        // Vérifier si l'utilisateur peut rejoindre
        if (data.game.status !== 'waiting') {
          setError('Cette partie a déjà commencé ou est terminée')
        } else if (data.game.players.some((p: any) => p.user?.id === user?.id)) {
          setError('Vous êtes déjà dans cette partie')
        } else {
          const maxPlayers = data.game.gameMode === '1v1' ? 2 : 4
          if (data.game.players.length >= maxPlayers) {
            setError('Cette partie est complète')
          }
        }
      } else {
        setError(data.error || 'Partie introuvable')
        setGameData(null)
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
      setError('Erreur de connexion au serveur Flask')
      setGameData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinGame = async () => {
    if (!user || !gameData || error) return

    setIsJoining(true)
    
    try {
      // SYSTÈME SIMPLIFIÉ: Utiliser directement l'avatar de la base (comme PlayerXPIndicator)
      console.log('🎭 Utilisation avatar direct depuis base de données pour join...')
      const currentUser = {
        ...user,
        avatar: user.avatar || '' // Utiliser directement l'avatar de la base
      }
      
      console.log(`✅ Avatar utilisé pour join (DB direct): ${currentUser.avatar}`)
      console.log('🎮 Attempting to join game via Socket.IO:', gameData.code)
      console.log('👤 User data being sent:', {
        user_id: currentUser.id,
        user_name: currentUser.name,
        user_avatar: currentUser.avatar,
        user_first_name: currentUser.firstName,
        user_last_name: currentUser.lastName,
        user_elo: currentUser.elo,
      })
      
      // Connect to Socket.IO and join the game
      const socket = await socketService.connect()
      
      // Setup one-time event listeners for join response
      const cleanup = socketService.onGameEvents({
        onGameJoined: (response) => {
          console.log('🎮 Join game response:', response)
          if (response.status === 'success' && response.game_data) {
            console.log('✅ Successfully joined game via Socket.IO')
            // Convert socket game data to frontend format
            // Find host player data to get avatar correctly  
            const hostPlayer = response.game_data?.players?.find(p => p.user_id === response.game_data?.host_id)
            const convertedGame = {
              id: 0,
              code: response.game_data.code,
              status: response.game_data.status,
              gameMode: response.game_data.game_mode,
              winCondition: response.game_data.win_condition,
              winValue: response.game_data.win_value,
              maxGoals: response.game_data.max_goals,
              host: {
                id: response.game_data.host_id,
                name: response.game_data.host_name,
                firstName: hostPlayer?.user_first_name || response.game_data.host_name.split(' ')[0],
                lastName: hostPlayer?.user_last_name || response.game_data.host_name.split(' ').slice(1).join(' '),
                avatar: hostPlayer?.user_avatar || '', // Always use server avatar data
                elo: hostPlayer?.user_elo || 0,
              },
              table: {
                id: response.game_data.table_id,
                name: response.game_data.table_name,
                location: 'EPSI Montpellier',
              },
              players: response.game_data.players.map(p => ({
                id: p.user_id || 0,
                team: p.team,
                position: p.position,
                isGuest: p.is_guest,
                guestName: p.is_guest ? p.user_name : undefined,
                user: p.user_id ? {
                  id: p.user_id,
                  name: p.user_name,
                  firstName: p.user_first_name || p.user_name.split(' ')[0],
                  lastName: p.user_last_name || p.user_name.split(' ').slice(1).join(' '),
                  avatar: p.user_avatar || '',
                  elo: p.user_elo || 0,
                  skillLevel: '',
                  position: '',
                } : undefined,
              }))
            }
            onGameJoined(convertedGame)
            onClose()
            resetForm()
            setIsJoining(false)
          } else {
            setError(response.message || 'Erreur lors de la jointure')
            setIsJoining(false)
          }
          cleanup()
        },
        onError: (error) => {
          console.error('❌ Socket.IO join game error:', error)
          setError(`Erreur Socket.IO: ${error}`)
          setIsJoining(false)
          cleanup()
        }
      })
      
      // Send join game request avec email pour système d'avatar serveur
      socketService.joinGame(gameData.code, {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email || '',  // NOUVEAU: Email pour génération avatar
        avatar: currentUser.avatar,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        elo: currentUser.elo,
      })
      
    } catch (error) {
      console.error('Erreur lors de la jointure:', error)
      setError('Erreur de connexion Socket.IO')
      setIsJoining(false)
    }
  }

  const resetForm = () => {
    setGameCode('')
    setGameData(null)
    setError(null)
  }

  const handleClose = () => {
    if (!isLoading && !isJoining) {
      onClose()
      resetForm()
    }
  }

  const canJoin = gameData && !error && !isLoading && !isJoining

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-[#101118] border-[#333] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-nubernext-extended-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0C0E14]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.991 2.991 0 0 0 17.09 7H16c-.8 0-1.5.31-2.03.81L12.93 9H11.5l-.93-1.19C10.04 7.31 9.34 7 8.54 7H7.45c-1.3 0-2.42.83-2.87 2.06L2 16.5V22h2v-5.5H6l2-6.32V22h2v-6h2v6h2v-6h2v6h2z"/>
              </svg>
            </div>
            Rejoindre une partie
          </DialogTitle>
          <DialogDescription className="text-[#AAAAAA]">
            Entre le code à 4 chiffres partagé par l&apos;hôte de la partie.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Code Input */}
          <div className="space-y-3">
            <Label className="text-white font-nubernext-extended-bold">Code de la partie</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="1234"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="bg-[#0C0E14] border-[#333] text-white text-center text-3xl font-mono h-16 focus:border-[#FFD700] tracking-widest"
                maxLength={4}
                autoFocus
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {/* Quick codes for demo */}
            <div className="flex gap-2 justify-center">
              {['1234', '5678', '9999'].map((code) => (
                <Button
                  key={code}
                  variant="outline"
                  size="sm"
                  onClick={() => setGameCode(code)}
                  className="border-[#333] text-[#AAAAAA] hover:text-white hover:border-[#FFD700] bg-transparent text-xs"
                >
                  {code}
                </Button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Card className="border-red-500 bg-red-500/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-nubernext-extended-bold text-sm">Impossible de rejoindre</h3>
                    <p className="text-red-300 text-xs">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Game Preview */}
          {gameData && !error && (
            <Card className="border-[#FFD700]/30 bg-[#FFD700]/5">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-nubernext-extended-bold">Partie trouvée !</h3>
                      <p className="text-[#AAAAAA] text-sm">Code: {gameData.code}</p>
                    </div>
                    <div className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                      {gameData.status === 'waiting' ? 'En attente' : gameData.status}
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#AAAAAA]">Mode:</span>
                      <span className="text-white ml-2 font-medium">{gameData.gameMode}</span>
                    </div>
                    <div>
                      <span className="text-[#AAAAAA]">Table:</span>
                      <span className="text-white ml-2 font-medium">{gameData.table.name}</span>
                    </div>
                    <div>
                      <span className="text-[#AAAAAA]">Victoire:</span>
                      <span className="text-white ml-2 font-medium">
                        {gameData.winCondition === 'first_to_goals' 
                          ? `${gameData.winValue} buts` 
                          : `${gameData.winValue} min`
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-[#AAAAAA]">Joueurs:</span>
                      <span className="text-white ml-2 font-medium">
                        {gameData.players.length}/{gameData.gameMode === '1v1' ? 2 : 4}
                      </span>
                    </div>
                  </div>

                  {/* Host */}
                  <div className="space-y-2">
                    <span className="text-[#AAAAAA] text-sm">Hôte:</span>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#EA1846] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {gameData.host.firstName?.[0] || gameData.host.name[0]}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {gameData.host.firstName && gameData.host.lastName 
                            ? `${gameData.host.firstName} ${gameData.host.lastName}`
                            : gameData.host.name
                          }
                        </h4>
                        {gameData.host.elo && (
                          <p className="text-[#AAAAAA] text-xs">ELO: {gameData.host.elo}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Other Players */}
                  {gameData.players.length > 1 && (
                    <div className="space-y-2">
                      <span className="text-[#AAAAAA] text-sm">Autres joueurs:</span>
                      <div className="space-y-2">
                        {gameData.players
                          .filter(p => p.user?.id !== gameData.host.id)
                          .map((player, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-[#666] rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">
                                  {player.isGuest 
                                    ? player.guestName?.[0] || 'G'
                                    : player.user?.firstName?.[0] || player.user?.name[0]
                                  }
                                </span>
                              </div>
                              <div>
                                <span className="text-white text-sm">
                                  {player.isGuest 
                                    ? player.guestName 
                                    : player.user?.name
                                  }
                                </span>
                                {player.isGuest && (
                                  <span className="text-[#AAAAAA] text-xs ml-2">(Invité)</span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isLoading || isJoining}
            className="border-[#333] text-[#AAAAAA] hover:text-white hover:border-[#555] bg-transparent"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleJoinGame}
            disabled={!canJoin}
            className="bg-[#FFD700] hover:bg-[#e6c200] text-[#0C0E14] font-nubernext-extended-bold disabled:opacity-50"
          >
            {isJoining ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#0C0E14] border-t-transparent rounded-full animate-spin"></div>
                Connexion...
              </div>
            ) : (
              'Rejoindre la partie'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 