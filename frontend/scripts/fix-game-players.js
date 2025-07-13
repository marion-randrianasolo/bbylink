const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function fixGamePlayers() {
  console.log('🔧 Fixing GamePlayer teams from "left"/"right" to "RED"/"BLUE"...');
  
  try {
    // Récupérer tous les GamePlayer
    const gamePlayers = await prisma.gamePlayer.findMany({
      include: {
        game: true,
        user: true
      }
    });
    
    console.log(`📊 Found ${gamePlayers.length} GamePlayer entries`);
    
    let updatedCount = 0;
    
    for (const player of gamePlayers) {
      if (player.team === 'left') {
        await prisma.gamePlayer.update({
          where: { id: player.id },
          data: { team: 'RED' }
        });
        console.log(`✅ Updated player ${player.user?.name || player.guestName || 'Unknown'} (ID: ${player.id}) from 'left' to 'RED'`);
        updatedCount++;
      } else if (player.team === 'right') {
        await prisma.gamePlayer.update({
          where: { id: player.id },
          data: { team: 'BLUE' }
        });
        console.log(`✅ Updated player ${player.user?.name || player.guestName || 'Unknown'} (ID: ${player.id}) from 'right' to 'BLUE'`);
        updatedCount++;
      } else {
        console.log(`ℹ️ Player ${player.user?.name || player.guestName || 'Unknown'} (ID: ${player.id}) already has correct team: ${player.team}`);
      }
    }
    
    console.log(`\n🎉 Fix completed! Updated ${updatedCount} GamePlayer entries.`);
    
  } catch (error) {
    console.error('❌ Error fixing GamePlayer teams:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixGamePlayers(); 