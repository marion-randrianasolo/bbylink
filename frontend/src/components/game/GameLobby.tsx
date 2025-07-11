/**
 * @file Composant de salon d'attente pour les parties de baby-foot
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface de salon où les joueurs attendent avant de commencer la partie.
 * Affiche les informations de la partie, les joueurs par équipe, permet la gestion
 * des invités et le démarrage de la partie pour l'hôte.
 */

"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import socketService, { type SocketGameData } from '@/lib/socket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

/**
 * Interface pour les données d'un joueur dans la partie
 */
interface GamePlayer {
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
}

/**
 * Interface pour les données complètes d'une partie
 */
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
  players: GamePlayer[]
}

/**
 * Props du composant GameLobby
 */
interface GameLobbyProps {
  gameData: GameData
  onLeaveGame: () => void
  onStartGame: (gameData: GameData) => void
}

/**
 * Composant de salon d'attente de partie
 * @param props - Props contenant les données de la partie et callbacks
 * @returns {JSX.Element} Interface de salon de jeu
 */
export default function GameLobby({ gameData, onLeaveGame, onStartGame }: GameLobbyProps) {
  const { user } = useAuth()
  const [gameState, setGameState] = useState<GameData>(gameData)
  const [isAddingGuest, setIsAddingGuest] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState<'RED' | 'BLUE'>('RED')
  const [isLoading, setIsLoading] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)

  // Connect to Socket.IO and setup real-time updates
  useEffect(() => {
    if (!user || !gameState.code) return

    console.log('🔌 Setting up Socket.IO connection for real-time game updates')

    const connectAndListen = async () => {
      try {
        // Connect to Socket.IO
        const socket = await socketService.connect()
        socketService.joinUserSession(user.id, user.name)
        console.log('✅ Connected to Socket.IO for game lobby')
        setSocketConnected(true)

        // Setup real-time event handlers
        const cleanup = socketService.onGameEvents({
          onGameUpdate: (gameData) => {
            console.log('🔄 Real-time game update received:', gameData)
            // Convert Socket game data to frontend format
            // Find host player data to get avatar correctly
            const hostPlayer = gameData.players.find(p => p.user_id === gameData.host_id)
            const convertedGame = {
              id: 0,
              code: gameData.code,
              status: gameData.status,
              gameMode: gameData.game_mode,
              winCondition: gameData.win_condition,
              winValue: gameData.win_value,
              maxGoals: gameData.max_goals,
              host: {
                id: gameData.host_id,
                name: gameData.host_name,
                firstName: hostPlayer?.user_first_name || gameData.host_name.split(' ')[0],
                lastName: hostPlayer?.user_last_name || gameData.host_name.split(' ').slice(1).join(' '),
                avatar: hostPlayer?.user_avatar || '', // Always use server avatar data
                elo: hostPlayer?.user_elo || 0,
              },
              table: {
                id: gameData.table_id,
                name: gameData.table_name,
                location: 'EPSI Montpellier',
              },
              players: gameData.players.map(p => ({
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
            setGameState(convertedGame)
          },
          onGameStarted: (gameData) => {
            console.log('🚀 Game started via Socket.IO:', gameData)
            // Convert socket data and call onStartGame
            // Find host player data to get avatar correctly
            const hostPlayer = gameData.players.find(p => p.user_id === gameData.host_id)
            const convertedGame = {
              id: 0,
              code: gameData.code,
              status: gameData.status,
              gameMode: gameData.game_mode,
              winCondition: gameData.win_condition,
              winValue: gameData.win_value,
              maxGoals: gameData.max_goals,
              host: {
                id: gameData.host_id,
                name: gameData.host_name,
                firstName: hostPlayer?.user_first_name || gameData.host_name.split(' ')[0],
                lastName: hostPlayer?.user_last_name || gameData.host_name.split(' ').slice(1).join(' '),
                avatar: hostPlayer?.user_avatar || '', // Always use server avatar data
                elo: hostPlayer?.user_elo || 0,
              },
              table: {
                id: gameData.table_id,
                name: gameData.table_name,
                location: 'EPSI Montpellier',
              },
              players: gameData.players.map(p => ({
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
            onStartGame(convertedGame)
          },
          onError: (error) => {
            console.error('❌ Socket.IO error in game lobby:', error)
          }
        })

        return cleanup
      } catch (error) {
        console.error('❌ Failed to connect to Socket.IO:', error)
        setSocketConnected(false)
        return undefined
      }
    }

    let cleanup: (() => void) | undefined

    connectAndListen().then((cleanupFn) => {
      cleanup = cleanupFn
    })

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup()
    }
  }, [user, gameState.code, onStartGame])

  // Update game state when props change
  useEffect(() => {
    setGameState(gameData)
  }, [gameData])

  // Vérifier si l'utilisateur actuel est l'hôte
  const isHost = user?.id === gameState.host.id

  // Calculer les équipes
  const redTeam = gameState.players.filter(p => p.team === 'RED')
  const blueTeam = gameState.players.filter(p => p.team === 'BLUE')

  // Calculer le nombre de joueurs nécessaires
  const maxPlayersPerTeam = gameState.gameMode === '1v1' ? 1 : 2
  const maxTotalPlayers = maxPlayersPerTeam * 2

  // Vérifier si la partie peut commencer
  const canStartGame = gameState.players.length === maxTotalPlayers && 
                      redTeam.length === maxPlayersPerTeam && 
                      blueTeam.length === maxPlayersPerTeam

  /**
   * Ajouter un joueur invité à la partie
   */
  const handleAddGuest = async () => {
    if (!guestName.trim() || !user || !socketConnected) return

    setIsLoading(true)
    try {
      console.log('👤 Adding guest player via Socket.IO:', guestName.trim())
      socketService.addGuestPlayer(gameState.code, guestName.trim(), user.id)
      setIsAddingGuest(false)
      setGuestName('')
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'invité:', error)
      alert(`Erreur lors de l'ajout de l'invité: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Démarrer la partie
   */
  const handleStartGame = async () => {
    if (!canStartGame || !isHost || !user || !socketConnected) return

    setIsLoading(true)
    try {
      console.log('🚀 Starting game via Socket.IO:', gameState.code)
      socketService.startGame(gameState.code, user.id)
      // onStartGame will be called via the onGameStarted socket event
    } catch (error) {
      console.error('Erreur lors du démarrage:', error)
      alert(`Erreur lors du démarrage: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Obtenir les équipes disponibles pour les invités
   */
  const getAvailableTeams = () => {
    const teams = []
    if (redTeam.length < maxPlayersPerTeam) teams.push('RED')
    if (blueTeam.length < maxPlayersPerTeam) teams.push('BLUE')
    return teams
  }

  /**
   * Afficher une carte de joueur
   */
  const PlayerCard = ({ player, teamColor }: { player: GamePlayer, teamColor: string }) => (
    <Card className={`border-${teamColor.toLowerCase()}-500 bg-${teamColor.toLowerCase()}-500/10`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center relative">
            {player.isGuest ? (
              <div className={`w-full h-full bg-${teamColor.toLowerCase()}-500 flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            ) : player.user?.avatar ? (
              <img 
                src={player.user.avatar} 
                alt={player.user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to letter if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            {/* Fallback letter display (hidden by default when avatar exists) */}
            <div 
              className={`absolute inset-0 bg-${teamColor.toLowerCase()}-500 flex items-center justify-center ${
                player.user?.avatar ? 'hidden' : 'flex'
              }`}
            >
              <span className="text-white font-bold text-lg">
                {player.user?.name?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-nubernext-extended-bold text-sm">
              {player.isGuest ? player.guestName : player.user?.name}
            </h3>
            <div className="flex items-center gap-2">
              {player.isGuest ? (
                <Badge variant="outline" className="text-xs border-gray-400 text-gray-400">
                  Invité
                </Badge>
              ) : (
                <>
                  {player.user?.elo && (
                    <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                      ELO: {player.user.elo}
                    </Badge>
                  )}
                  {player.user?.skillLevel && (
                    <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                      {player.user.skillLevel}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-white text-xs font-medium">
              {player.position === 'ATTACKER' ? 'Attaquant' : 'Défenseur'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  /**
   * Slot vide pour équipe
   */
  const EmptySlot = ({ position }: { position: string }) => (
    <Card className="border-dashed border-2 border-gray-600 bg-gray-800/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-center h-16">
          <div className="text-center">
            <div className="text-gray-400 text-sm">
              {position === 'ATTACKER' ? 'Attaquant' : 'Défenseur'}
            </div>
            <div className="text-gray-500 text-xs">En attente...</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="h-full overflow-auto bg-[#0C0E14]">
      {/* Content */}
      <div className="min-h-full flex flex-col">
          {/* Header */}
          <div className="px-6 pt-8 pb-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-nubernext-extended-heavy text-white mb-2">
                    Salon de partie
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-[#AAAAAA] text-lg">
                      Code de la partie: <span className="text-[#EA1846] font-mono text-2xl font-bold bg-[#EA1846]/10 px-3 py-1 rounded border border-[#EA1846]/30">{gameState.code}</span>
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={onLeaveGame}
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  Quitter
                </Button>
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="px-6 pb-6">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-[#101118] border-[#333]">
                <CardHeader>
                  <CardTitle className="text-white font-nubernext-extended-bold">
                    Informations de la partie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-[#AAAAAA]">Table:</span>
                      <div className="text-white font-medium">{gameState.table.name}</div>
                      <div className="text-[#AAAAAA] text-xs">{gameState.table.location}</div>
                    </div>
                    <div>
                      <span className="text-[#AAAAAA]">Mode de jeu:</span>
                      <div className="text-white font-medium">{gameState.gameMode}</div>
                    </div>
                    <div>
                      <span className="text-[#AAAAAA]">Victoire:</span>
                      <div className="text-white font-medium">
                        {gameState.winCondition === 'first_to_goals' 
                          ? `Premier à ${gameState.winValue} buts` 
                          : `${gameState.winValue} minutes`
                        }
                      </div>
                    </div>
                    <div>
                      <span className="text-[#AAAAAA]">Hôte:</span>
                      <div className="text-white font-medium">{gameState.host.name}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Teams */}
          <div className="flex-1 px-6 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Team RED */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    <h2 className="text-2xl font-nubernext-extended-bold text-white">
                      Équipe Rouge
                    </h2>
                    <Badge variant="outline" className="border-red-500 text-red-400">
                      {redTeam.length}/{maxPlayersPerTeam}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {gameState.gameMode === '2v2' && (
                      <>
                        {redTeam.find(p => p.position === 'ATTACKER') ? (
                          <PlayerCard 
                            player={redTeam.find(p => p.position === 'ATTACKER')!} 
                            teamColor="red" 
                          />
                        ) : (
                          <EmptySlot position="ATTACKER" />
                        )}
                        {redTeam.find(p => p.position === 'DEFENDER') ? (
                          <PlayerCard 
                            player={redTeam.find(p => p.position === 'DEFENDER')!} 
                            teamColor="red" 
                          />
                        ) : (
                          <EmptySlot position="DEFENDER" />
                        )}
                      </>
                    )}
                    
                    {gameState.gameMode === '1v1' && (
                      <>
                        {redTeam[0] ? (
                          <PlayerCard player={redTeam[0]} teamColor="red" />
                        ) : (
                          <EmptySlot position="PLAYER" />
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Team BLUE */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <h2 className="text-2xl font-nubernext-extended-bold text-white">
                      Équipe Bleue
                    </h2>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {blueTeam.length}/{maxPlayersPerTeam}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {gameState.gameMode === '2v2' && (
                      <>
                        {blueTeam.find(p => p.position === 'ATTACKER') ? (
                          <PlayerCard 
                            player={blueTeam.find(p => p.position === 'ATTACKER')!} 
                            teamColor="blue" 
                          />
                        ) : (
                          <EmptySlot position="ATTACKER" />
                        )}
                        {blueTeam.find(p => p.position === 'DEFENDER') ? (
                          <PlayerCard 
                            player={blueTeam.find(p => p.position === 'DEFENDER')!} 
                            teamColor="blue" 
                          />
                        ) : (
                          <EmptySlot position="DEFENDER" />
                        )}
                      </>
                    )}
                    
                    {gameState.gameMode === '1v1' && (
                      <>
                        {blueTeam[0] ? (
                          <PlayerCard player={blueTeam[0]} teamColor="blue" />
                        ) : (
                          <EmptySlot position="PLAYER" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                {/* Add Guest Button */}
                {isHost && getAvailableTeams().length > 0 && (
                  <div className="flex justify-center">
                    <Button 
                      onClick={() => setIsAddingGuest(true)}
                      variant="outline"
                      className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0C0E14]"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                      Ajouter un invité
                    </Button>
                  </div>
                )}

                {/* Start Game or Wait Message */}
                <div className="flex justify-center">
                  {isHost && canStartGame ? (
                    <Button 
                      onClick={handleStartGame}
                      disabled={isLoading}
                      className="bg-[#EA1846] hover:bg-[#d41539] text-white font-nubernext-extended-bold px-8"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Démarrage...
                        </div>
                      ) : (
                        'Commencer la partie'
                      )}
                    </Button>
                  ) : (
                    <div className="text-center text-[#AAAAAA]">
                      {gameState.players.length < maxTotalPlayers ? (
                        <span>En attente de {maxTotalPlayers - gameState.players.length} joueur(s) supplémentaire(s)</span>
                      ) : (
                        <span>Équilibrage des équipes nécessaire</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Add Guest Dialog */}
      <Dialog open={isAddingGuest} onOpenChange={setIsAddingGuest}>
        <DialogContent className="sm:max-w-md bg-[#101118] border-[#333] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-nubernext-extended-bold text-white">
              Ajouter un invité
            </DialogTitle>
            <DialogDescription className="text-[#AAAAAA]">
              Ajoutez un joueur invité pour compléter la partie.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white font-nubernext-extended-bold">Nom de l&apos;invité</Label>
              <Input
                type="text"
                placeholder="Nom du joueur"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="bg-[#0C0E14] border-[#333] text-white focus:border-[#EA1846]"
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-nubernext-extended-bold">Équipe</Label>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableTeams().map((team) => (
                  <Button
                    key={team}
                    variant={selectedTeam === team ? "default" : "outline"}
                    onClick={() => setSelectedTeam(team as 'RED' | 'BLUE')}
                    className={`${
                      team === 'RED' 
                        ? 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white' 
                        : 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                    } ${selectedTeam === team ? (team === 'RED' ? 'bg-red-500' : 'bg-blue-500') + ' text-white' : ''}`}
                  >
                    {team === 'RED' ? 'Équipe Rouge' : 'Équipe Bleue'}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddingGuest(false)}
              disabled={isLoading}
              className="border-[#333] text-[#AAAAAA] hover:text-white hover:border-[#555] bg-transparent"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleAddGuest}
              disabled={!guestName.trim() || isLoading}
              className="bg-[#EA1846] hover:bg-[#d41539] text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Ajout...
                </div>
              ) : (
                'Ajouter'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 