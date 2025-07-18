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
        return handleFinishGame(game, userId, body.leftScore, body.rightScore)
      
      case 'new_game':
        return handleNewGame(game, userId)
      
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

  // Correction logique d'attribution d'équipe
  let team: string
  let position: string

  if (game.gameMode === '1v1') {
    // Premier joueur RED, deuxième BLUE
    const redCount = game.players.filter((p: any) => p.team === 'RED').length
    const blueCount = game.players.filter((p: any) => p.team === 'BLUE').length
    if (redCount === 0) {
      team = 'RED'
    } else {
      team = 'BLUE'
    }
    position = 'PLAYER'
  } else {
    // 2v2 : équilibrer les équipes
    const redPlayers = game.players.filter((p: any) => p.team === 'RED')
    const bluePlayers = game.players.filter((p: any) => p.team === 'BLUE')
    if (redPlayers.length < 2) {
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
async function handleFinishGame(game: any, triggerUserId: number, leftScore: number, rightScore: number) {
  // Protection : empêcher la double attribution
  if (game.status === 'finished') {
    return NextResponse.json({ error: 'La partie est déjà terminée.' }, { status: 409 });
  }

  // Déterminer le gagnant côté backend
  const WIN_SCORE = game.winValue || 10;
  let winnerTeam: 'RED' | 'BLUE' | null = null;
  if (leftScore >= WIN_SCORE && leftScore > rightScore) {
    winnerTeam = 'RED';
  } else if (rightScore >= WIN_SCORE && rightScore > leftScore) {
    winnerTeam = 'BLUE';
  } else {
    return NextResponse.json({ error: 'Impossible de déterminer le gagnant.' }, { status: 400 });
  }

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

  for (const p of game.players) {
    const playerUserId = p.userId || p.user?.id;
    if (!playerUserId) continue;

    const isWinner = p.team === winnerTeam;
    const user = await prisma.user.findUnique({ 
      where: { id: playerUserId }, 
      select: { elo: true, coins: true, xp: true } 
    });
    const currentElo = user?.elo ?? 1000;
    const currentCoins = user?.coins ?? 0;
    const currentXp = user?.xp ?? 1250;

    const newXp = currentXp + (isWinner ? xpWin : xpLose);
    const newCoins = isWinner ? currentCoins + coinsDelta : currentCoins;
    const newElo = isWinner
      ? currentElo + eloDelta
      : Math.max(0, currentElo - eloDelta);

    await prisma.user.update({
      where: { id: playerUserId },
      data: {
        xp: newXp,
        coins: newCoins,
        elo: newElo
      }
    });
  }

  return NextResponse.json({ success: true });
}

/**
 * Handle creating a new game with the same code (for rematch)
 */
async function handleNewGame(game: any, userId: number) {
  // Vérifier que c'est l'hôte qui demande une nouvelle partie
  if (game.hostId !== userId) {
    return NextResponse.json(
      { error: 'Seul l\'hôte peut créer une nouvelle partie' },
      { status: 403 }
    )
  }

  // Générer un nouveau code unique de 4 chiffres
  let newCode: string
  let attempts = 0
  const maxAttempts = 100

  do {
    newCode = Math.floor(1000 + Math.random() * 9000).toString()
    const existingGame = await prisma.game.findUnique({
      where: { code: newCode }
    })
    
    if (!existingGame) break
    
    attempts++
  } while (attempts < maxAttempts)

  if (attempts >= maxAttempts) {
    return NextResponse.json(
      { error: 'Impossible de générer un code unique pour la nouvelle partie' },
      { status: 500 }
    )
  }

  // Créer une nouvelle partie avec un nouveau code
  const newGame = await prisma.game.create({
    data: {
      code: newCode, // Nouveau code unique
      hostId: game.hostId,
      tableId: game.tableId,
      gameMode: game.gameMode,
      winCondition: game.winCondition,
      winValue: game.winValue,
      maxGoals: game.maxGoals,
      status: 'waiting',
      scoreLeft: 0, // Reset des scores selon le schéma Prisma
      scoreRight: 0,
      maxScore: game.maxScore || 10, // Ajouté selon le schéma
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

  // Ajouter l'hôte comme premier joueur dans la nouvelle partie
  await prisma.gamePlayer.create({
    data: {
      gameId: newGame.id,
      userId: game.hostId,
      team: 'RED',
      position: game.gameMode === '2v2' ? 'ATTACKER' : 'PLAYER',
      isGuest: false,
    }
  })

  // Récupérer la partie mise à jour avec le joueur hôte
  const updatedNewGame = await prisma.game.findUnique({
    where: { id: newGame.id },
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

  return NextResponse.json({ 
    game: updatedNewGame,
    message: 'Nouvelle partie créée avec un nouveau code'
  })
} 