import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * PATCH /api/tables/[id] - Met à jour la disponibilité d'une table
 * Body: { isAvailable: boolean }
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tableId = parseInt(params.id, 10)
    if (isNaN(tableId)) {
      return NextResponse.json({ error: 'ID de table invalide' }, { status: 400 })
    }
    const { isAvailable } = await request.json()
    if (typeof isAvailable !== 'boolean') {
      return NextResponse.json({ error: 'isAvailable requis (booléen)' }, { status: 400 })
    }
    const table = await prisma.foosballTable.update({
      where: { id: tableId },
      data: { isAvailable, updatedAt: new Date() },
    })
    return NextResponse.json({ table })
  } catch (error) {
    console.error('Erreur PATCH /api/tables/[id]:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
} 