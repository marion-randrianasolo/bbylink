import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, avatar } = body

    if (!email || !avatar) {
      return NextResponse.json(
        { error: 'Email and avatar are required' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { avatar },
      select: {
        id: true,
        email: true,
        avatar: true
      }
    })

    return NextResponse.json({
      success: true,
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user avatar:', error)
    
    // Si l'utilisateur n'existe pas
    if ((error as any)?.code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 