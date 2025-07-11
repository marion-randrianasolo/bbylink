/**
 * @file API route pour récupérer les données d'un utilisateur par ID
 * @created 2025-07-10
 * 
 * Cette route permet à Flask de récupérer les données utilisateur
 * depuis la base de données SQLite pour les avatars et statistiques.
 */

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID utilisateur invalide' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        elo: true,
        skillLevel: true,
        position: true,
        score: true,
        xp: true,
        coins: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
    
  } catch (error) {
    console.error('Erreur lors de la récupération utilisateur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
} 