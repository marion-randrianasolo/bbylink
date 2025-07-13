/**
 * @file Modal de création de partie avec configuration complète
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Interface de configuration pour créer une nouvelle partie de baby-foot
 * Inclut choix de table, mode de jeu, conditions de victoire, etc.
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

interface Table {
  id: number
  name: string
  location: string
  isAvailable: boolean
  isActive: boolean
}

interface CreateGameModalProps {
  isOpen: boolean
  onClose: () => void
  onGameCreated: (gameData: any) => void
}

/**
 * Modal de création de partie avec toutes les options de configuration
 * @param {CreateGameModalProps} props - propriétés du modal
 * @returns {JSX.Element} Modal de configuration de partie
 */
export default function CreateGameModal({ isOpen, onClose, onGameCreated }: CreateGameModalProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [tables, setTables] = useState<Table[]>([])
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [gameMode, setGameMode] = useState<'1v1' | '2v2'>('1v1')
  const [winCondition, setWinCondition] = useState<'first_to_goals' | 'time_limit'>('first_to_goals')
  const [winValue, setWinValue] = useState(10)
  const [maxGoals, setMaxGoals] = useState<number | null>(null)

  // Charger les tables disponibles
  useEffect(() => {
    if (isOpen) {
      fetchTables()
    }
  }, [isOpen])

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables?available=true&active=true')
      const data = await response.json()
      
      if (response.ok) {
        setTables(data.tables)
        // Sélectionner automatiquement la première table disponible
        if (data.tables.length > 0) {
          setSelectedTable(data.tables[0].id)
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tables:', error)
    }
  }

  const handleCreateGame = async () => {
    if (!user || !selectedTable) return;

    setIsLoading(true);
    try {
      // 1. Persister la partie côté Next.js/Neon
      console.log('Début création partie : appel API Next.js');
      const currentUser = {
        ...user,
        avatar: user.avatar || ''
      };
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostId: currentUser.id,
          tableId: selectedTable,
          gameMode,
          winCondition,
          winValue,
          maxGoals: winCondition === 'time_limit' ? (maxGoals || undefined) : undefined,
        })
      });
      const data = await res.json();
      if (!res.ok || !data.game) {
        console.error('Erreur lors de la création de la partie côté Next.js:', data.error);
        setIsLoading(false);
        alert('Erreur lors de la création de la partie (persistance en base échouée): ' + (data.error || 'Erreur inconnue'));
        return;
      }
      const nextjsGame = data.game;
      console.log('✅ Partie persistée en base Neon (Next.js)', nextjsGame);

      // 2. Transmettre à Flask/Socket.IO
      if (!socketService.isConnected()) {
        await socketService.connect();
      }
      console.log('DEBUG: Appel à socketService.createGame (connexion OK)', {
        game_code: nextjsGame.code,
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
      });
      const selectedTableDetails = tables.find(t => t.id === selectedTable);
      if (!selectedTableDetails) {
        console.error('Table introuvable');
        setIsLoading(false);
        return;
      }
      socketService.createGame({
        game_code: nextjsGame.code,
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
      });
      console.log('🎮 Partie transmise à Flask/Socket.IO');

      // Callback et reset
      onGameCreated(nextjsGame);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la création de la partie:', error);
      setIsLoading(false);
      alert('Erreur JS lors de la création de la partie: ' + error);
    }
  }

  const resetForm = () => {
    setSelectedTable(null)
    setGameMode('1v1')
    setWinCondition('first_to_goals')
    setWinValue(10)
    setMaxGoals(null)
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
      resetForm()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-[#101118] border-[#333] text-white max-h-[95vh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle className="text-2xl font-nubernext-extended-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EA1846] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            Créer une nouvelle partie
          </DialogTitle>
          <DialogDescription className="text-[#AAAAAA]">
            Configure ta partie selon tes préférences et obtiens un code pour inviter tes amis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sélection de table */}
          <div className="space-y-3">
            <Label className="text-white font-nubernext-extended-bold">Table de baby-foot</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tables.map((table) => (
                <Card 
                  key={table.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTable === table.id 
                      ? 'border-[#EA1846] bg-[#EA1846]/10' 
                      : 'border-[#333] bg-[#0C0E14] hover:border-[#555]'
                  }`}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-nubernext-extended-bold text-white text-sm">
                          {table.name}
                        </h3>
                        <p className="text-[#AAAAAA] text-xs">
                          {table.location}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        table.isAvailable ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mode de jeu */}
          <div className="space-y-3">
            <Label className="text-white font-nubernext-extended-bold">Mode de jeu</Label>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  gameMode === '1v1' 
                    ? 'border-[#EA1846] bg-[#EA1846]/10' 
                    : 'border-[#333] bg-[#0C0E14] hover:border-[#555]'
                }`}
                onClick={() => setGameMode('1v1')}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-[#EA1846] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <span className="text-[#AAAAAA] text-sm">VS</span>
                      <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <span className="text-[#0C0E14] text-xs font-bold">1</span>
                      </div>
                    </div>
                    <span className="text-white font-nubernext-extended-bold text-sm">1 vs 1</span>
                    <span className="text-[#AAAAAA] text-xs">Duel classique</span>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  gameMode === '2v2' 
                    ? 'border-[#EA1846] bg-[#EA1846]/10' 
                    : 'border-[#333] bg-[#0C0E14] hover:border-[#555]'
                }`}
                onClick={() => setGameMode('2v2')}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 bg-[#EA1846] rounded-full border-2 border-[#101118]"></div>
                        <div className="w-6 h-6 bg-[#EA1846] rounded-full border-2 border-[#101118]"></div>
                      </div>
                      <span className="text-[#AAAAAA] text-sm">VS</span>
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 bg-[#FFD700] rounded-full border-2 border-[#101118]"></div>
                        <div className="w-6 h-6 bg-[#FFD700] rounded-full border-2 border-[#101118]"></div>
                      </div>
                    </div>
                    <span className="text-white font-nubernext-extended-bold text-sm">2 vs 2</span>
                    <span className="text-[#AAAAAA] text-xs">Équipes de deux</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Conditions de victoire */}
          <div className="space-y-3">
            <Label className="text-white font-nubernext-extended-bold">Conditions de victoire</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  winCondition === 'first_to_goals' 
                    ? 'border-[#EA1846] bg-[#EA1846]/10' 
                    : 'border-[#333] bg-[#0C0E14] hover:border-[#555]'
                }`}
                onClick={() => setWinCondition('first_to_goals')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#0C0E14]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-nubernext-extended-bold text-sm">Premier à X buts</h3>
                      <p className="text-[#AAAAAA] text-xs">Mode classique</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  winCondition === 'time_limit' 
                    ? 'border-[#EA1846] bg-[#EA1846]/10' 
                    : 'border-[#333] bg-[#0C0E14] hover:border-[#555]'
                }`}
                onClick={() => setWinCondition('time_limit')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#9C27B0] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-nubernext-extended-bold text-sm">Durée limitée</h3>
                      <p className="text-[#AAAAAA] text-xs">Match chronométré</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Valeur de victoire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-nubernext-extended-bold">
                {winCondition === 'first_to_goals' ? 'Nombre de buts' : 'Durée (minutes)'}
              </Label>
              <Input
                type="number"
                value={winValue}
                onChange={(e) => setWinValue(parseInt(e.target.value) || 1)}
                min={1}
                max={winCondition === 'first_to_goals' ? 50 : 60}
                className="bg-[#0C0E14] border-[#333] text-white focus:border-[#EA1846]"
              />
            </div>

            {winCondition === 'time_limit' && (
              <div className="space-y-2">
                <Label className="text-white font-nubernext-extended-bold">
                  Buts maximum (optionnel)
                </Label>
                <Input
                  type="number"
                  value={maxGoals || ''}
                  onChange={(e) => setMaxGoals(parseInt(e.target.value) || null)}
                  min={1}
                  max={50}
                  placeholder="Illimité"
                  className="bg-[#0C0E14] border-[#333] text-white focus:border-[#EA1846]"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isLoading}
            className="border-[#333] text-[#AAAAAA] hover:text-white hover:border-[#555] bg-transparent"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleCreateGame}
            disabled={isLoading || !selectedTable}
            className="bg-[#EA1846] hover:bg-[#d41539] text-white font-nubernext-extended-bold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Création en cours...
              </div>
            ) : (
              'Créer la partie'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 