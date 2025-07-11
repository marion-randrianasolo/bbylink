import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * Refresh profile endpoint - reloads user data with updated avatar
 * @param {NextRequest} request - contains userId
 * @returns {NextResponse} - updated user data
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        score: true,
        avatar: true,
        elo: true,
        jerseyNumber: true,
        skillLevel: true,
        position: true,
        championship: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      )
    }

    // Générer un avatar automatique si l'utilisateur n'en a pas
    const avatar = user.avatar || `https://api.dicebear.com/9.x/big-smile/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=transparent`
    
    // Mettre à jour l'avatar dans la base si il était vide
    if (!user.avatar && avatar) {
      await prisma.user.update({
        where: { id: user.id },
        data: { avatar: avatar }
      })
    }
    
    const updatedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      score: user.score,
      avatar: avatar,
      elo: user.elo || 0,
      jerseyNumber: user.jerseyNumber,
      skillLevel: user.skillLevel,
      position: user.position,
      championship: user.championship,
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('Erreur lors du refresh profile:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 