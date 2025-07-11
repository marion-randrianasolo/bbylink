/**
 * @file Page de jeu principale avec options de création et de rejoint de partie
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface principale pour créer ou rejoindre des parties de baby-foot
 * Design avec cartes carrées et navigation par étapes intégrée
 */

"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import JoinGameModal from '@/components/game/JoinGameModal'
import GameLobby from '@/components/game/GameLobby'
import LiveScore from '@/components/game/LiveScore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { socketService } from '@/lib/socket'
import AvatarService from '@/lib/avatarService'

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
  players: any[]
}

interface Table {
  id: number
  name: string
  location: string
  isAvailable: boolean
  isActive: boolean
}

type CreateGameStep = 1 | 2 | 3 | 4

/**
 * Page principale pour les options de jeu avec deux cartes principales
 * @returns {JSX.Element} Interface de jeu avec cartes créer/rejoindre
 */
export default function JouerPage() {
  const { user } = useAuth()
  const [gameCode, setGameCode] = useState('')
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [currentGame, setCurrentGame] = useState<GameData | null>(null)
  const [isInLobby, setIsInLobby] = useState(false)
  const [isInLiveScore, setIsInLiveScore] = useState(false)
  
  // États pour la création de partie par étapes
  const [isCreatingGame, setIsCreatingGame] = useState(false)
  const [createStep, setCreateStep] = useState<CreateGameStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [tables, setTables] = useState<Table[]>([])
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [gameMode, setGameMode] = useState<'1v1' | '2v2'>('1v1')
  const [winCondition, setWinCondition] = useState<'first_to_goals' | 'time_limit'>('first_to_goals')
  const [winValue, setWinValue] = useState(10)
  const [maxGoals, setMaxGoals] = useState<number | null>(null)

  const totalSteps = 4

  // Charger les tables disponibles quand on entre en mode création
  useEffect(() => {
    if (isCreatingGame && createStep === 1) {
      fetchTables()
    }
  }, [isCreatingGame, createStep])

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables?available=true&active=true')
      const data = await response.json()
      
      if (response.ok) {
        setTables(data.tables)
        if (data.tables.length > 0) {
          setSelectedTable(data.tables[0].id)
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tables:', error)
    }
  }

  const handleCreateGame = () => {
    setIsCreatingGame(true)
    setCreateStep(1)
  }

  const handleJoinGame = () => {
    setShowJoinModal(true)
  }

  const handleBackToMenu = () => {
    setIsCreatingGame(false)
    setCreateStep(1)
    resetCreateForm()
  }

  const resetCreateForm = () => {
    setSelectedTable(null)
    setGameMode('1v1')
    setWinCondition('first_to_goals')
    setWinValue(10)
    setMaxGoals(null)
  }

  const handleCreateNext = () => {
    if (createStep < totalSteps) {
      setCreateStep(prev => (prev + 1) as CreateGameStep)
    } else {
      handleFinalizeGame()
    }
  }

  const handleCreatePrevious = () => {
    if (createStep > 1) {
      setCreateStep(prev => (prev - 1) as CreateGameStep)
    }
  }

  const handleFinalizeGame = async () => {
    if (!user || !selectedTable) return

    setIsLoading(true)
    
    try {
      const currentUser = {
        ...user,
        avatar: user.avatar || ''
      }
      
      if (!socketService.isConnected()) {
        await socketService.connect()
      }

      const selectedTableDetails = tables.find(t => t.id === selectedTable)
      if (!selectedTableDetails) {
        console.error('Table introuvable')
        setIsLoading(false)
        return
      }

      const cleanup = socketService.onGameEvents({
        onGameCreated: (response) => {
          if (response.status === 'success' && response.game_data) {
            const convertedGameData = {
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
                firstName: currentUser.firstName || currentUser.name.split(' ')[0],
                lastName: currentUser.lastName || currentUser.name.split(' ').slice(1).join(' '),
                avatar: response.game_data?.players?.find(p => p.user_id === response.game_data?.host_id)?.user_avatar || currentUser.avatar,
                elo: response.game_data?.players?.find(p => p.user_id === response.game_data?.host_id)?.user_elo || currentUser.elo,
              },
              table: {
                id: response.game_data.table_id,
                name: response.game_data.table_name,
                location: selectedTableDetails.location,
              },
              players: response.game_data.players.map((p: any) => ({
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
                } : undefined,
              }))
            }
            
            cleanup()
            setCurrentGame(convertedGameData)
            setIsInLobby(true)
            setIsCreatingGame(false)
            resetCreateForm()
          } else {
            console.error('Erreur lors de la création:', response.message)
            setIsLoading(false)
            cleanup()
          }
        },
        onError: (errorMessage: string) => {
          console.error('Erreur lors de la création de la partie:', errorMessage)
          setIsLoading(false)
          cleanup()
        }
      })

      socketService.createGame({
        host_id: currentUser.id,
        host_name: currentUser.name,
        host_email: currentUser.email || '',
        host_avatar: currentUser.avatar,
        host_first_name: currentUser.firstName,
        host_last_name: currentUser.lastName,
        host_elo: currentUser.elo,
        table_id: selectedTable,
        table_name: selectedTableDetails.name,
        game_mode: gameMode,
        win_condition: winCondition,
        win_value: winValue,
        max_goals: winCondition === 'time_limit' ? (maxGoals || undefined) : undefined,
      })

      setTimeout(() => {
        if (isLoading) {
          console.error('Timeout - impossible de créer la partie')
          setIsLoading(false)
          cleanup()
        }
      }, 10000)

    } catch (error) {
      console.error('Erreur lors de la création de la partie:', error)
      setIsLoading(false)
    }
  }

  const onGameJoined = (gameData: GameData) => {
    console.log('Partie rejointe:', gameData)
    setCurrentGame(gameData)
    setIsInLobby(true)
    setShowJoinModal(false)
  }

  const handleLeaveGame = () => {
    setCurrentGame(null)
    setIsInLobby(false)
    setIsInLiveScore(false)
    setGameCode('')
  }

  const handleStartGame = (gameData: GameData) => {
    console.log('Partie démarrée:', gameData)
    setCurrentGame({ ...gameData, status: 'playing' })
    setIsInLobby(false)
    setIsInLiveScore(true)
  }

  const handleGameEnd = () => {
    console.log('Partie terminée')
    setIsInLiveScore(false)
    setIsInLobby(false)
    setCurrentGame(null)
  }

  // Animations pour les transitions
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  }

  // Si on est en Live Score, afficher le composant LiveScore
  if (isInLiveScore && currentGame) {
    return (
      <LiveScore 
        gameData={currentGame}
        onGameEnd={handleGameEnd}
        onLeaveGame={handleLeaveGame}
      />
    )
  }

  // Si on est dans le lobby, afficher le composant GameLobby
  if (isInLobby && currentGame) {
    return (
      <GameLobby 
        gameData={currentGame}
        onLeaveGame={handleLeaveGame}
        onStartGame={handleStartGame}
      />
    )
  }

  // Rendu des étapes de création
  const renderCreateStep = () => {
    switch (createStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-2">
                Choisir une table
              </h3>
              <p className="text-[#AAAAAA]">
                Sélectionnez la table pour votre partie
              </p>
            </div>
            <div className="space-y-3">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`border-2 p-4 cursor-pointer transition-all ${
                    selectedTable === table.id
                      ? 'border-[#EA1846] bg-[#EA1846]/10'
                      : 'border-[#333] hover:border-[#EA1846]/50'
                  }`}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-nubernext-extended-bold text-white">
                        {table.name}
                      </h4>
                      <p className="text-[#AAAAAA] text-sm">{table.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-500 text-sm">Disponible</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-2">
                Mode de jeu
              </h3>
              <p className="text-[#AAAAAA]">
                Choisissez le format de votre partie
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`border-2 p-6 cursor-pointer transition-all text-center ${
                  gameMode === '1v1'
                    ? 'border-[#EA1846] bg-[#EA1846]/10'
                    : 'border-[#333] hover:border-[#EA1846]/50'
                }`}
                onClick={() => setGameMode('1v1')}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-3 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/assets/player-placeholder.png')" }}
                />
                <h4 className="font-nubernext-extended-bold text-white">1v1</h4>
                <p className="text-[#AAAAAA] text-sm">Duel classique</p>
              </div>
              <div
                className={`border-2 p-6 cursor-pointer transition-all text-center ${
                  gameMode === '2v2'
                    ? 'border-[#EA1846] bg-[#EA1846]/10'
                    : 'border-[#333] hover:border-[#EA1846]/50'
                }`}
                onClick={() => setGameMode('2v2')}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-3 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/assets/club.png')" }}
                />
                <h4 className="font-nubernext-extended-bold text-white">2v2</h4>
                <p className="text-[#AAAAAA] text-sm">Équipe de deux</p>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-2">
                Condition de victoire
              </h3>
              <p className="text-[#AAAAAA]">
                Comment gagner la partie ?
              </p>
            </div>
            <div className="space-y-4">
              <div
                className={`border-2 p-4 cursor-pointer transition-all ${
                  winCondition === 'first_to_goals'
                    ? 'border-[#EA1846] bg-[#EA1846]/10'
                    : 'border-[#333] hover:border-[#EA1846]/50'
                }`}
                onClick={() => setWinCondition('first_to_goals')}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/blackball.png')" }}
                  />
                  <div>
                    <h4 className="font-nubernext-extended-bold text-white">Premier à X buts</h4>
                    <p className="text-[#AAAAAA] text-sm">Le premier à atteindre le score gagne</p>
                  </div>
                </div>
              </div>
              <div
                className={`border-2 p-4 cursor-pointer transition-all ${
                  winCondition === 'time_limit'
                    ? 'border-[#EA1846] bg-[#EA1846]/10'
                    : 'border-[#333] hover:border-[#EA1846]/50'
                }`}
                onClick={() => setWinCondition('time_limit')}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/cone.png')" }}
                  />
                  <div>
                    <h4 className="font-nubernext-extended-bold text-white">Limite de temps</h4>
                    <p className="text-[#AAAAAA] text-sm">Durée fixe avec score maximum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-nubernext-extended-bold text-white mb-2">
                Configuration finale
              </h3>
              <p className="text-[#AAAAAA]">
                Définissez les paramètres de votre partie
              </p>
            </div>
            <div className="space-y-4">
              {winCondition === 'first_to_goals' ? (
                <div>
                  <Label className="text-white font-nubernext-extended-bold">
                    Nombre de buts pour gagner
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={winValue}
                    onChange={(e) => setWinValue(parseInt(e.target.value) || 10)}
                    className="bg-[#101118] border-[#333] text-white mt-2"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-white font-nubernext-extended-bold">
                      Durée en minutes
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="60"
                      value={winValue}
                      onChange={(e) => setWinValue(parseInt(e.target.value) || 10)}
                      className="bg-[#101118] border-[#333] text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-white font-nubernext-extended-bold">
                      Score maximum (optionnel)
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={maxGoals || ''}
                      onChange={(e) => setMaxGoals(parseInt(e.target.value) || null)}
                      className="bg-[#101118] border-[#333] text-white mt-2"
                      placeholder="Aucune limite"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Si on est en mode création, afficher les étapes
  if (isCreatingGame) {
    return (
      <div className="h-full overflow-auto bg-[#0C0E14]">
        <div className="min-h-full p-6">
          <div className="max-w-2xl mx-auto">
            
            {/* Header avec navigation */}
            <div className="flex items-center justify-between mb-8">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBackToMenu}
                className="text-[#AAAAAA] hover:text-[#EA1846] transition-colors"
              >
                ← Retour au menu
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCreatePrevious}
                  disabled={createStep === 1}
                  className="p-2 hover:bg-[#EA1846]/10 transition-colors disabled:opacity-30"
                >
                  <ChevronLeft className="h-5 w-5 text-[#EA1846]" />
                </Button>
                <span className="text-sm text-[#AAAAAA] px-2">
                  {createStep} / {totalSteps}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCreateNext}
                  disabled={isLoading}
                  className="p-2 hover:bg-[#EA1846]/10 transition-colors disabled:opacity-30"
                >
                  <ChevronRight className="h-5 w-5 text-[#EA1846]" />
                </Button>
              </div>
            </div>

            {/* Titre et progression */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-nubernext-extended-heavy text-white mb-4">
                Creation d'une partie
              </h1>
              <div className="flex justify-center space-x-2 mb-4">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2 w-8 transition-colors ${
                      i + 1 <= createStep ? "bg-[#EA1846]" : "bg-[#333]"
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: i + 1 === createStep ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>

            {/* Contenu de l'étape */}
            <Card className="bg-[#101118] border-[#333]">
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={createStep}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {renderCreateStep()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleCreatePrevious}
                disabled={createStep === 1}
                className="hover:bg-[#EA1846]/10 hover:border-[#EA1846]/50 transition-all duration-200"
              >
                Précédent
              </Button>
              
              {createStep < totalSteps ? (
                <Button 
                  onClick={handleCreateNext}
                  disabled={
                    (createStep === 1 && !selectedTable) ||
                    (createStep === 2 && !gameMode) ||
                    (createStep === 3 && !winCondition)
                  }
                  className="bg-[#EA1846] hover:bg-[#EA1846]/90 text-white transition-all duration-200 hover:scale-105"
                >
                  Suivant
                </Button>
              ) : (
                <Button 
                  onClick={handleFinalizeGame}
                  disabled={isLoading}
                  className="bg-[#EA1846] hover:bg-[#EA1846]/90 text-white transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? "Création..." : "Créer la partie"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Menu principal avec les deux cartes
  return (
    <div className="h-full overflow-auto bg-[#0C0E14]">
      <div className="min-h-full p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 lg:mb-20">
            <h1 className="text-4xl lg:text-5xl font-nubernext-extended-heavy text-white mb-4">
              Prêt à jouer ?
            </h1>
            <p className="text-[#AAAAAA] text-lg lg:text-xl max-w-2xl mx-auto">
              Crée ta propre partie ou rejoins une partie existante pour commencer à jouer !
            </p>
          </div>

          {/* Cartes principales en disposition horizontale */}
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Carte Créer une partie */}
            <Card 
              className="bg-[#101118] border-[#333] hover:bg-[#EA1846] cursor-pointer group transition-colors duration-300"
              onClick={handleCreateGame}
            >
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundImage: "url('/assets/upcoming.png')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#101118]/80 group-hover:to-[#EA1846]/80 transition-all duration-300" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <h3 className="text-xl font-nubernext-extended-bold text-white text-center transition-colors">
                      Host une partie
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carte Rejoindre une partie */}
            <Card 
              className="bg-[#101118] border-[#333] hover:bg-[#EA1846] cursor-pointer group transition-colors duration-300"
              onClick={handleJoinGame}
            >
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundImage: "url('/assets/latest-reports.png')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#101118]/80 group-hover:to-[#EA1846]/80 transition-all duration-300" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <h3 className="text-xl font-nubernext-extended-bold text-white text-center transition-colors">
                      Rejoindre une partie
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </div>

      {/* Modal pour rejoindre une partie */}
      <JoinGameModal 
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onGameJoined={onGameJoined}
        initialCode={gameCode}
      />
    </div>
  )
} 