/**
 * @file API routes for game management
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Handles game creation, listing, and management operations
 * Integrates with Prisma database and Flask backend
 */

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/games - List all games with optional filters
 * @param {NextRequest} request - may contain query parameters for filtering
 * @returns {NextResponse} - list of games or error message
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const hostId = searchParams.get('hostId')

    const whereClause: any = {}
    
    if (status) {
      whereClause.status = status
    }
    
    if (hostId) {
      whereClause.hostId = parseInt(hostId)
    }

    const games = await prisma.game.findMany({
      where: whereClause,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            avatar: true,
            elo: true,
          }
        },
        table: {
          select: {
            id: true,
            name: true,
            location: true,
            isAvailable: true,
          }
        },
        players: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                avatar: true,
                elo: true,
                skillLevel: true,
                position: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ games })
  } catch (error) {
    console.error('Erreur lors de la récupération des parties:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/games - Create a new game
 * @param {NextRequest} request - contains game creation data
 * @returns {NextResponse} - new game data or error message
 */
export async function POST(request: NextRequest) {
  try {
    const {
      hostId,
      tableId,
      gameMode,
      winCondition,
      winValue,
      maxGoals
    } = await request.json()

    if (!hostId || !tableId || !gameMode || !winCondition || !winValue) {
      return NextResponse.json(
        { error: 'Données de partie incomplètes' },
        { status: 400 }
      )
    }

    // Vérifier que l'hôte existe
    const host = await prisma.user.findUnique({
      where: { id: hostId },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
      }
    })

    if (!host) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      )
    }

    // Vérifier que la table existe (disponibilité ignorée)
    const table = await prisma.foosballTable.findUnique({
      where: { id: tableId }
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Table introuvable' },
        { status: 404 }
      )
    }

    // Note: La disponibilité des tables est ignorée - toutes les tables peuvent être utilisées

    // Générer un code unique de 4 chiffres
    let code: string
    let attempts = 0
    const maxAttempts = 100

    do {
      code = Math.floor(1000 + Math.random() * 9000).toString()
      const existingGame = await prisma.game.findUnique({
        where: { code }
      })
      
      if (!existingGame) break
      
      attempts++
    } while (attempts < maxAttempts)

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { error: 'Impossible de générer un code unique' },
        { status: 500 }
      )
    }

    // Créer la partie
    const game = await prisma.game.create({
      data: {
        code,
        hostId,
        tableId,
        gameMode,
        winCondition,
        winValue,
        maxGoals,
        status: 'waiting',
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            avatar: true,
            elo: true,
          }
        },
        table: {
          select: {
            id: true,
            name: true,
            location: true,
          }
        },
        players: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                avatar: true,
                elo: true,
                skillLevel: true,
                position: true,
              }
            }
          }
        }
      }
    })

    // Ajouter l'hôte comme premier joueur
    await prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        userId: hostId,
        team: 'left',
        position: gameMode === '2v2' ? 'attack' : 'player',
        isGuest: false,
      }
    })

    // Note: Les tables ne sont plus marquées comme occupées/libres automatiquement

    // Récupérer la partie mise à jour avec le joueur hôte
    const updatedGame = await prisma.game.findUnique({
      where: { id: game.id },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            avatar: true,
            elo: true,
          }
        },
        table: {
          select: {
            id: true,
            name: true,
            location: true,
          }
        },
        players: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                avatar: true,
                elo: true,
                skillLevel: true,
                position: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ game: updatedGame })
  } catch (error) {
    console.error('Erreur lors de la création de la partie:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 