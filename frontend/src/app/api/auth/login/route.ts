import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createHash } from 'crypto'

/**
 * Hashes passwords the same way we do everywhere else
 * @param {string} password - plain text password
 * @returns {string} - SHA256 hash
 */
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/**
 * Login endpoint - checks email/password and returns user data
 * @param {NextRequest} request - contains email and password in body
 * @returns {NextResponse} - user data or error message
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    const hashedPassword = hashPassword(password)

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        password: true,
        avatar: true,
        elo: true,
        xp: true, // Ajouté
        coins: true, // Ajouté
        jerseyNumber: true,
        skillLevel: true,
        position: true,
        championship: true,
      },
    })

    if (!user || user.password !== hashedPassword) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // Générer un avatar automatique si l'utilisateur n'en a pas
    const avatar = user.avatar || `https://api.dicebear.com/9.x/big-smile/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=transparent`
    
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: avatar,
      elo: user.elo ?? 0,
      xp: user.xp ?? 0, // Ajouté
      coins: user.coins ?? 0, // Ajouté
      jerseyNumber: user.jerseyNumber,
      skillLevel: user.skillLevel,
      position: user.position,
      championship: user.championship,
    }
    
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 