/**
 * @file API routes for foosball table management
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Handles foosball table listing and availability management
 */

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET /api/tables - List all foosball tables with their availability status
 * @param {NextRequest} request - may contain query parameters for filtering
 * @returns {NextResponse} - list of tables or error message
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'

    const whereClause: any = {}
    
    // Note: Le paramètre 'available' est ignoré - toutes les tables sont retournées
    
    if (activeOnly) {
      whereClause.isActive = true
    }

    const tables = await prisma.foosballTable.findMany({
      where: whereClause,
      include: {
        games: {
          where: {
            status: {
              in: ['waiting', 'playing']
            }
          },
          select: {
            id: true,
            code: true,
            status: true,
            gameMode: true,
            host: {
              select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
              }
            },
            players: {
              select: {
                id: true,
                team: true,
                position: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    firstName: true,
                    lastName: true,
                  }
                },
                guestName: true,
                isGuest: true,
              }
            }
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    })

    return NextResponse.json({ tables })
  } catch (error) {
    console.error('Erreur lors de la récupération des tables:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/tables - Update table availability or status
 * @param {NextRequest} request - contains table update data
 * @returns {NextResponse} - updated table data or error message
 */
export async function PATCH(request: NextRequest) {
  try {
    const { tableId, isAvailable, isActive } = await request.json()

    if (!tableId) {
      return NextResponse.json(
        { error: 'ID de table requis' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    
    if (typeof isAvailable === 'boolean') {
      updateData.isAvailable = isAvailable
    }
    
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Aucune donnée à mettre à jour' },
        { status: 400 }
      )
    }

    const table = await prisma.foosballTable.update({
      where: { id: tableId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        games: {
          where: {
            status: {
              in: ['waiting', 'playing']
            }
          },
          select: {
            id: true,
            code: true,
            status: true,
            gameMode: true,
            host: {
              select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ table })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la table:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 