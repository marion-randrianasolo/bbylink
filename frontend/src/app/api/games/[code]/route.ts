/**
 * @file Dynamic API route for specific game management
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Handles individual game operations like joining, updating, and retrieving
 */

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/games/[code] - Get a specific game by its code
 * @param {NextRequest} request - HTTP request
 * @param {Object} params - URL parameters containing the game code
 * @returns {NextResponse} - game data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    const game = await prisma.game.findUnique({
      where: { code },
      include: {
        host: {
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
      }
    })

    if (!game) {
      return NextResponse.json(
        { error: 'Partie introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({ game })
  } catch (error) {
    console.error('Erreur lors de la récupération de la partie:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/games/[code] - Join a game or perform actions on it
 * @param {NextRequest} request - contains action data (join, start, etc.)
 * @param {Object} params - URL parameters containing the game code
 * @returns {NextResponse} - updated game data or error message
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const body = await request.json() // LIRE UNE SEULE FOIS
    const { action, userId, guestName, position, winnerTeam } = body

    if (!action) {
      return NextResponse.json(
        { error: 'Action requise' },
        { status: 400 }
      )
    }

    const game = await prisma.game.findUnique({
      where: { code },
      include: {
        players: {
          include: {
            user: true
          }
        }
      }
    })

    if (!game) {
      return NextResponse.json(
        { error: 'Partie introuvable' },
        { status: 404 }
      )
    }

    switch (action) {
      case 'join':
        return handleJoinGame(game, userId, guestName, position)
      
      case 'start':
        return handleStartGame(game, userId)
      
      case 'leave':
        return handleLeaveGame(game, userId)
      
      case 'finish':
        return handleFinishGame(game, userId, winnerTeam)
      
      default:
        return NextResponse.json(
          { error: 'Action non supportée' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Erreur lors de l\'action sur la partie:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

/**
 * Handle joining a game
 */
async function handleJoinGame(game: any, userId: number, guestName?: string, requestedPosition?: string) {
  if (game.status !== 'waiting') {
    return NextResponse.json(
      { error: 'Cette partie a déjà commencé' },
      { status: 409 }
    )
  }

  const maxPlayers = game.gameMode === '1v1' ? 2 : 4
  
  if (game.players.length >= maxPlayers) {
    return NextResponse.json(
      { error: 'Partie complète' },
      { status: 409 }
    )
  }

  // Check if user is already in the game
  if (userId && game.players.some((p: any) => p.userId === userId)) {
    return NextResponse.json(
      { error: 'Vous êtes déjà dans cette partie' },
      { status: 409 }
    )
  }

  // Determine team and position
  let team: string
  let position: string

  if (game.gameMode === '1v1') {
    // For 1v1, simple RED/BLUE assignment
    team = game.players.length === 0 ? 'RED' : 'BLUE'
    position = 'PLAYER'
  } else {
    // For 2v2, more complex assignment
    const redPlayers = game.players.filter((p: any) => p.team === 'RED')
    const bluePlayers = game.players.filter((p: any) => p.team === 'BLUE')
    
    if (redPlayers.length <= bluePlayers.length) {
      team = 'RED'
      position = redPlayers.length === 0 ? 'ATTACKER' : 'DEFENDER'
    } else {
      team = 'BLUE'
      position = bluePlayers.length === 0 ? 'ATTACKER' : 'DEFENDER'
    }
  }

  // Create game player entry
  const gamePlayer = await prisma.gamePlayer.create({
    data: {
      gameId: game.id,
      userId: userId || null,
      team,
      position,
      isGuest: !userId,
      guestName: guestName || null,
    }
  })

  // Get updated game
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

  return NextResponse.json({ game: updatedGame, player: gamePlayer })
}

/**
 * Handle starting a game
 */
async function handleStartGame(game: any, userId: number) {
  if (game.hostId !== userId) {
    return NextResponse.json(
      { error: 'Seul l\'hôte peut démarrer la partie' },
      { status: 403 }
    )
  }

  if (game.status !== 'waiting') {
    return NextResponse.json(
      { error: 'Cette partie ne peut pas être démarrée' },
      { status: 409 }
    )
  }

  if (game.players.length < 2) {
    return NextResponse.json(
      { error: 'Il faut au moins 2 joueurs pour commencer' },
      { status: 409 }
    )
  }

  const updatedGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      status: 'playing',
      startedAt: new Date(),
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

  return NextResponse.json({ game: updatedGame })
}

/**
 * Handle leaving a game
 */
async function handleLeaveGame(game: any, userId: number) {
  if (game.status !== 'waiting') {
    return NextResponse.json(
      { error: 'Impossible de quitter une partie en cours' },
      { status: 409 }
    )
  }

  const playerInGame = game.players.find((p: any) => p.userId === userId)
  
  if (!playerInGame) {
    return NextResponse.json(
      { error: 'Vous n\'êtes pas dans cette partie' },
      { status: 404 }
    )
  }

  // If host is leaving, transfer host to another player or cancel the game
  if (game.hostId === userId) {
    const otherPlayers = game.players.filter((p: any) => p.userId !== userId && !p.isGuest)
    
    if (otherPlayers.length > 0) {
      // Transfer host to another player
      await prisma.game.update({
        where: { id: game.id },
        data: {
          hostId: otherPlayers[0].userId
        }
      })
    } else {
      // Cancel the game if no other non-guest players
      await prisma.game.update({
        where: { id: game.id },
        data: {
          status: 'cancelled'
        }
      })
      
      // Note: Les tables ne sont plus gérées automatiquement (disponibilité ignorée)
    }
  }

  // Remove player from game
  await prisma.gamePlayer.delete({
    where: { id: playerInGame.id }
  })

  // Get updated game
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
} 

/**
 * Handle finishing a game and updating rewards
 */
async function handleFinishGame(game: any, triggerUserId: number, winnerTeam: string) {
  // Met à jour le statut de la partie
  await prisma.game.update({
    where: { id: game.id },
    data: { status: 'finished', finishedAt: new Date() }
  });

  // Récompenses
  const eloDelta = 50;
  const coinsDelta = 50;
  const xpWin = 100;
  const xpLose = 20;

  console.log(`🏁 Finishing game ${game.code} - Winner team: ${winnerTeam}`);

  for (const p of game.players) {
    // Compatibilité : userId direct ou via jointure user
    const playerUserId = p.userId || p.user?.id;
    if (!playerUserId) {
      console.log(`⏭️ Skipping guest player: ${p.guestName || 'Unknown'}`);
      continue; // skip guests or invalid
    }
    
    const isWinner = p.team === winnerTeam;
    console.log(`👤 Processing player ${playerUserId} (${p.user?.name || 'Unknown'}) - Team: ${p.team}, Winner: ${isWinner}`);

    // Récupérer l'elo actuel pour éviter de descendre sous 0
    const user = await prisma.user.findUnique({ 
      where: { id: playerUserId }, 
      select: { elo: true, coins: true, xp: true } 
    });
    
    let newElo = user?.elo ?? 1000;
    let newCoins = user?.coins ?? 0;
    let newXp = user?.xp ?? 1250;
    
    if (isWinner) {
      newElo += eloDelta;
      newCoins += coinsDelta;
      newXp += xpWin;
      console.log(`✅ Winner ${playerUserId}: +${eloDelta} ELO, +${coinsDelta} COINS, +${xpWin} XP`);
    } else {
      newElo = Math.max(0, newElo - eloDelta);
      newXp += xpLose;
      console.log(`❌ Loser ${playerUserId}: -${eloDelta} ELO, +0 COINS, +${xpLose} XP`);
    }

    await prisma.user.update({
      where: { id: playerUserId },
      data: {
        elo: newElo,
        coins: newCoins,
        xp: newXp
      }
    });
  }

  console.log(`✅ Game ${game.code} finished - All rewards updated`);
  return NextResponse.json({ success: true });
} 