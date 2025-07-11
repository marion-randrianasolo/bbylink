/**
 * @file API route pour récupérer tous les utilisateurs pour le classement
 * @created 2025-01-09
 * 
 * Cette route permet de récupérer tous les utilisateurs de la base de données
 * avec leurs statistiques réelles pour le leaderboard.
 */

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Récupérer tous les utilisateurs avec leurs statistiques
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        elo: true,
        score: true,
        xp: true,
        coins: true,
        jerseyNumber: true,
        skillLevel: true,
        position: true,
        championship: true,
        createdAt: true,
      },
      orderBy: {
        elo: 'desc' // Trier par ELO par défaut
      }
    })

    return NextResponse.json(users)
    
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
} 