/**
 * @file Écran Live Score en temps réel pour les parties de babyfoot
 * @author BabyLink Team
 * @created 2025-01-10
 * 
 * Composant Live Score inspiré de la maquette HTML avec Socket.IO temps réel
 * Affiche le score en direct, gère la victoire et les célébrations
 */

"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import socketService from '@/lib/socket'

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

interface LiveScoreProps {
  gameData: GameData
  onGameEnd: () => void
  onLeaveGame: () => void
}

interface ScoreData {
  left: number
  right: number
}

/**
 * Composant Live Score pour afficher le score en temps réel
 */
export default function LiveScore({ gameData, onGameEnd, onLeaveGame }: LiveScoreProps) {
  const [score, setScore] = useState<ScoreData>({ left: 0, right: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState<string>('')
  const [socketConnected, setSocketConnected] = useState(false)
  
  // Refs pour les éléments audio et animations
  const winSoundRef = useRef<HTMLAudioElement>(null)
  const leftScoreRef = useRef<HTMLSpanElement>(null)
  const rightScoreRef = useRef<HTMLSpanElement>(null)

  // Configuration du jeu
  const WIN_SCORE = gameData.winValue || 10
  
  // Équipes et joueurs
  const leftTeam = gameData.players.filter(p => p.team === 'RED')
  const rightTeam = gameData.players.filter(p => p.team === 'BLUE')
  
  const leftPlayerName = leftTeam[0]?.user?.name || leftTeam[0]?.guestName || 'Équipe Rouge'
  const rightPlayerName = rightTeam[0]?.user?.name || rightTeam[0]?.guestName || 'Équipe Bleue'

  // Socket.IO connection et événements
  useEffect(() => {
    const connectAndListen = async () => {
      try {
        await socketService.connect()
        setSocketConnected(true)
        console.log('🔌 LiveScore connected to Socket.IO')

        // Écouter les mises à jour de score en temps réel
        const cleanup = socketService.onGameEvents({
          onScoreUpdate: (scoreData: ScoreData) => {
            console.log('📊 Live score update:', scoreData)
            
            // Animation pulse pour les scores qui changent
            if (scoreData.left > score.left) {
              pulseScore('left')
            }
            if (scoreData.right > score.right) {
              pulseScore('right')
            }
            
            setScore(scoreData)
            
            // Vérifier la victoire
            if (scoreData.left >= WIN_SCORE || scoreData.right >= WIN_SCORE) {
              const winnerName = scoreData.left >= WIN_SCORE ? leftPlayerName : rightPlayerName
              handleGameEnd(winnerName)
            }
          },
          onGameEnded: (gameData) => {
            console.log('🏁 Game ended via Socket.IO')
            onGameEnd()
          },
          onError: (error) => {
            console.error('❌ LiveScore Socket.IO error:', error)
          }
        })

        return cleanup
      } catch (error) {
        console.error('❌ Failed to connect LiveScore to Socket.IO:', error)
        setSocketConnected(false)
      }
    }

    let cleanup: (() => void) | undefined
    connectAndListen().then((cleanupFn) => {
      cleanup = cleanupFn
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [score, WIN_SCORE, leftPlayerName, rightPlayerName, onGameEnd])

  /**
   * Animation pulse pour les scores
   */
  const pulseScore = (side: 'left' | 'right') => {
    const scoreElement = side === 'left' ? leftScoreRef.current : rightScoreRef.current
    if (scoreElement) {
      scoreElement.classList.add('score-pulse')
      setTimeout(() => {
        scoreElement.classList.remove('score-pulse')
      }, 600)
    }
  }

  /**
   * Gestion de la fin de partie avec célébrations
   */
  const handleGameEnd = (winnerName: string) => {
    setGameOver(true)
    setWinner(winnerName)
    
    // Son de victoire
    if (winSoundRef.current) {
      winSoundRef.current.play().catch(console.error)
    }
    
    // Confettis
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.5 }
      })
    }
  }

  /**
   * Reset du score (admin/host seulement)
   */
  /**
   * Nouvelle partie
   */
  const handleNewGame = () => {
    setGameOver(false)
    setWinner('')
    setScore({ left: 0, right: 0 })
  }

  return (
    <div className="h-full relative overflow-hidden overflow-y-auto">
      {/* Audio pour victoire */}
      <audio ref={winSoundRef} preload="auto">
        <source src="/assets/win.mp3" type="audio/mpeg" />
      </audio>

      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-[#0C0E14]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header avec informations de la partie */}
        <div className="px-6 pt-6 pb-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-nubernext-extended-bold text-white">
                Live Score
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#AAAAAA] font-mono">#{gameData.code}</span>
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

        {/* Scoreboard Principal */}
        {!gameOver && (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-3 gap-8 items-center">
                
                {/* Équipe Gauche (Rouge) */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden">
                      {leftTeam[0]?.user?.avatar ? (
                        <img 
                          src={leftTeam[0].user.avatar} 
                          alt={leftPlayerName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#333] rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {leftPlayerName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-nubernext-extended-bold text-white mb-2">
                      {leftPlayerName}
                    </h2>
                    <div className="text-[#AAAAAA]">Équipe Rouge</div>
                  </div>
                  
                  {/* Score Gauche */}
                  <div className="relative">
                    <span 
                      ref={leftScoreRef}
                      className="text-8xl font-nubernext-extended-heavy text-red-500 transition-all duration-300"
                    >
                      {score.left}
                    </span>
                    <div className="w-full h-2 bg-red-500/20 rounded-full mt-4">
                      <div 
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((score.left / WIN_SCORE) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Séparateur Central */}
                <div className="text-center">
                  <div className="text-6xl font-nubernext-extended-heavy text-white mb-4">–</div>
                  <div className="text-[#AAAAAA] text-lg">
                    Premier à {WIN_SCORE}
                  </div>
                  <div className="mt-4 text-sm text-[#666]">
                    {gameData.gameMode} • {gameData.table.name}
                  </div>
                </div>

                {/* Équipe Droite (Bleue) */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden">
                      {rightTeam[0]?.user?.avatar ? (
                        <img 
                          src={rightTeam[0].user.avatar} 
                          alt={rightPlayerName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#333] rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {rightPlayerName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-nubernext-extended-bold text-white mb-2">
                      {rightPlayerName}
                    </h2>
                    <div className="text-[#AAAAAA]">Équipe Bleue</div>
                  </div>
                  
                  {/* Score Droit */}
                  <div className="relative">
                    <span 
                      ref={rightScoreRef}
                      className="text-8xl font-nubernext-extended-heavy text-blue-500 transition-all duration-300"
                    >
                      {score.right}
                    </span>
                    <div className="w-full h-2 bg-blue-500/20 rounded-full mt-4">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((score.right / WIN_SCORE) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Écran de Victoire */}
        {gameOver && (() => {
          const isLeftWinner = score.left >= WIN_SCORE
          const winnerTeam = isLeftWinner ? leftTeam : rightTeam
          const winnerAvatar = winnerTeam[0]?.user?.avatar
          const isUserWinner = winnerTeam.some(p => p.user?.id === gameData.host.id) // Simplification pour demo
          
          return (
            <div className="flex-1 flex items-center justify-center px-6">
              <Card className="bg-[#101118]/90 backdrop-blur-lg border-[#333] max-w-2xl w-full">
                <CardContent className="p-12 text-center">
                  <div className="mb-8">
                    {/* Avatar du vainqueur */}
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#FFD700]">
                      {winnerAvatar ? (
                        <img 
                          src={winnerAvatar} 
                          alt={winner}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {winner.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h1 className="text-4xl font-nubernext-extended-heavy text-white mb-4">
                      {isUserWinner ? "🎉 Victoire ! 🎉" : "💔 Défaite 💔"}
                    </h1>
                    <p className="text-2xl text-[#FFD700] font-nubernext-extended-bold mb-2">
                      {isUserWinner ? `Bravo ${winner} !` : `Défaite face à ${winner}`}
                    </p>
                    <p className="text-[#AAAAAA] text-lg mb-6">
                      Score final : {score.left} - {score.right}
                    </p>
                    
                    {/* Gains/Pertes ELO et COINS */}
                    <div className="flex justify-center gap-8 mb-6">
                      <div className="flex items-center gap-2">
                        <img src="/assets/trophy.png" alt="ELO" className="w-6 h-6" />
                        <span className={`text-lg font-bold ${isUserWinner ? 'text-green-500' : 'text-red-500'}`}>
                          {isUserWinner ? '+50' : '-50'} ELO
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/assets/coin.png" alt="COINS" className="w-6 h-6" />
                        <span className={`text-lg font-bold ${isUserWinner ? 'text-green-500' : 'text-gray-500'}`}>
                          {isUserWinner ? '+50' : '+0'} COINS
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={handleNewGame}
                      className="w-full bg-[#EA1846] hover:bg-[#d41539] text-white py-4 text-lg font-nubernext-extended-bold"
                    >
                      Nouvelle partie
                    </Button>
                    <Button 
                      onClick={onLeaveGame}
                      variant="outline"
                      className="w-full border-[#333] text-[#AAAAAA] hover:text-white hover:border-white"
                    >
                      Retour au menu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })()}


      </div>

      {/* Styles globaux pour les animations dans le head */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .score-pulse {
            animation: scorePulse 0.6s ease-out;
          }
          
          @keyframes scorePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); color: #FFD700; }
            100% { transform: scale(1); }
          }
        `
      }} />
    </div>
  )
} 