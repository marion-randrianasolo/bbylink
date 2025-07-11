import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createHash } from 'crypto'

/**
 * Password hasher - same SHA256 approach as everywhere else
 * @param {string} password - plain text password
 * @returns {string} - hashed password
 */
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/**
 * Registration endpoint - creates new users with all their profile data
 * @param {NextRequest} request - contains all the registration form data
 * @returns {NextResponse} - new user data or error message
 */
export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      password, 
      name,
      firstName,
      lastName,
      championship,
      avatar,
      jerseyNumber,
      skillLevel,
      position
    } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, mot de passe et nom requis' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      )
    }

    const hashedPassword = hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        firstName,
        lastName,
        championship,
        avatar,
        jerseyNumber,
        skillLevel,
        position,
        score: 0,
        // Valeurs par défaut BabyLink
        coins: 0,     // Nouveau joueur commence avec 0 coins
        xp: 1250,     // Nouveau joueur commence avec 1250 XP
        elo: 1000,    // Nouveau joueur commence avec 1000 ELO
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        score: true,
        avatar: true,
        jerseyNumber: true,
        skillLevel: true,
        position: true,
        championship: true,
        coins: true,
        xp: true,
        elo: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 