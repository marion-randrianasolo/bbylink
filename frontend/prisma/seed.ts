import { PrismaClient } from '../src/generated/prisma'
import { createHash } from 'crypto'

const prisma = new PrismaClient()

/**
 * Simple password hasher using SHA256 - keeps things consistent with the auth routes
 * @param {string} password - plain text password
 * @returns {string} - hashed password
 */
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/**
 * Generate a random game code
 */
function generateGameCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

/**
 * Main seeding function - sets up some famous football players for testing
 */
async function main() {
  // Clear existing data first - in correct order due to foreign key constraints
  await prisma.gamePlayer.deleteMany()
  await prisma.game.deleteMany()
  await prisma.foosballTable.deleteMany()
  await prisma.user.deleteMany()

  const users = [
    {
      email: 'messi@epsi.fr',
      name: 'Lionel Messi',
      password: 'test123',
      score: 2450,
      firstName: 'Lionel',
      lastName: 'Messi',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=messi10',
      skillLevel: 'EXPERT',
      position: 'Attaquant',
      championship: 'EPSI Montpellier',
      xp: 2450,
      coins: 1200,
      elo: 2100,
      jerseyNumber: 10,
    },
    {
      email: 'ronaldo@epsi.fr',
      name: 'Cristiano Ronaldo',
      password: 'test123',
      score: 1890,
      firstName: 'Cristiano',
      lastName: 'Ronaldo',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=ronaldo7',
      skillLevel: 'EXPERT',
      position: 'Attaquant',
      championship: 'EPSI Montpellier',
      xp: 1890,
      coins: 950,
      elo: 1980,
      jerseyNumber: 7,
    },
    {
      email: 'neymar@epsi.fr',
      name: 'Neymar Jr',
      password: 'test123',
      score: 1650,
      firstName: 'Neymar',
      lastName: 'Da Silva Santos Jr',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=neymar11',
      skillLevel: 'AVANCE',
      position: 'Milieu',
      championship: 'EPSI Montpellier',
      xp: 1650,
      coins: 800,
      elo: 1750,
      jerseyNumber: 11,
    },
    {
      email: 'mbappe@epsi.fr',
      name: 'Kylian Mbappé',
      password: 'test123',
      score: 1200,
      firstName: 'Kylian',
      lastName: 'Mbappé',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mbappe9',
      skillLevel: 'INTERMEDIAIRE',
      position: 'Attaquant',
      championship: 'EPSI Montpellier',
      xp: 1200,
      coins: 600,
      elo: 1520,
      jerseyNumber: 9,
    },
  ]

  // Create users first
  const createdUsers = []
  for (const userData of users) {
    const hashedPassword = hashPassword(userData.password)
    
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        score: userData.score,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        skillLevel: userData.skillLevel,
        position: userData.position,
        championship: userData.championship,
        xp: userData.xp,
        coins: userData.coins,
        elo: userData.elo,
        jerseyNumber: userData.jerseyNumber,
      },
    })

    createdUsers.push(user)
    console.log(`✅ Utilisateur créé: ${user.name} (${user.email}) - Score: ${user.score}`)
  }

  // Create foosball tables
  const tables = [
    {
      name: 'Table Principale',
      location: 'Salle principale - RDC',
      isActive: true,
      isAvailable: true,
    },
    {
      name: 'Table 2',
      location: 'Salle détente - 1er étage',
      isActive: true,
      isAvailable: false,
    },
  ]

  const createdTables = []
  for (const tableData of tables) {
    const table = await prisma.foosballTable.create({
      data: tableData,
    })

    createdTables.push(table)
    console.log(`🏓 Table créée: ${table.name} (${table.location}) - Disponible: ${table.isAvailable ? 'Oui' : 'Non'}`)
  }

  // Create some test games
  const game1 = await prisma.game.create({
    data: {
      code: generateGameCode(),
      status: 'waiting',
      gameMode: '1v1',
      tableId: createdTables[0].id,
      hostId: createdUsers[0].id, // Messi as host
    },
  })

  // Add players to the game
  await prisma.gamePlayer.create({
    data: {
      gameId: game1.id,
      userId: createdUsers[0].id, // Messi
      team: 'left',
    },
  })

  await prisma.gamePlayer.create({
    data: {
      gameId: game1.id,
      userId: createdUsers[1].id, // Ronaldo
      team: 'right',
    },
  })

  console.log(`🎮 Partie créée: ${game1.code} (${game1.gameMode}) - Statut: ${game1.status}`)

  // Create another game that's playing
  const game2 = await prisma.game.create({
    data: {
      code: generateGameCode(),
      status: 'playing',
      gameMode: '1v1',
      scoreLeft: 3,
      scoreRight: 2,
      tableId: createdTables[1].id,
      hostId: createdUsers[2].id, // Neymar as host
      startedAt: new Date(),
    },
  })

  await prisma.gamePlayer.create({
    data: {
      gameId: game2.id,
      userId: createdUsers[2].id, // Neymar
      team: 'left',
    },
  })

  await prisma.gamePlayer.create({
    data: {
      gameId: game2.id,
      userId: createdUsers[3].id, // Mbappé
      team: 'right',
    },
  })

  console.log(`🎮 Partie créée: ${game2.code} (${game2.gameMode}) - Statut: ${game2.status} - Score: ${game2.scoreLeft}-${game2.scoreRight}`)

  console.log('\n🎉 Base de données initialisée avec succès!')
  console.log('🔑 Mot de passe pour tous les utilisateurs de test: test123')
  console.log('📊 4 utilisateurs créés avec des profils complets')
  console.log('🏓 2 tables de baby-foot créées')
  console.log('🎮 2 parties de test créées')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 