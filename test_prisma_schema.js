/**
 * @file Test script pour vérifier la cohérence avec le schéma Prisma
 * @author BabyLink Team
 * @created 2025-01-10
 * 
 * Teste que les APIs utilisent les bons champs selon le schéma Prisma
 */

// Configuration des URLs
const config = {
  nextjs: 'https://bbylink.vercel.app', // URL Vercel en production
  flask: 'https://bear-enhanced-mutt.ngrok-free.app' // URL ngrok du Raspberry Pi
}

// Test de création de partie avec les bons champs
async function testGameCreation() {
  console.log('🧪 Test création partie avec schéma Prisma...');
  
  try {
    const createRes = await fetch(`${config.nextjs}/api/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hostId: 1,
        tableId: 1,
        gameMode: '1v1',
        winCondition: 'first_to_goals',
        winValue: 10,
        maxGoals: null
      })
    });
    
    if (!createRes.ok) {
      throw new Error('Erreur création partie');
    }
    
    const gameData = await createRes.json();
    const game = gameData.game;
    
    console.log('✅ Partie créée avec succès');
    console.log('📊 Champs vérifiés:');
    console.log(`  - code: ${game.code}`);
    console.log(`  - gameMode: ${game.gameMode}`);
    console.log(`  - winCondition: ${game.winCondition}`);
    console.log(`  - winValue: ${game.winValue}`);
    console.log(`  - maxScore: ${game.maxScore}`);
    console.log(`  - scoreLeft: ${game.scoreLeft}`);
    console.log(`  - scoreRight: ${game.scoreRight}`);
    console.log(`  - status: ${game.status}`);
    
    // Vérifier que tous les champs du schéma sont présents
    const requiredFields = ['code', 'gameMode', 'winCondition', 'winValue', 'maxScore', 'scoreLeft', 'scoreRight', 'status'];
    const missingFields = requiredFields.filter(field => !(field in game));
    
    if (missingFields.length > 0) {
      throw new Error(`Champs manquants: ${missingFields.join(', ')}`);
    }
    
    console.log('✅ Tous les champs du schéma Prisma sont présents');
    
    return game;
    
  } catch (error) {
    console.error('❌ Test échoué:', error.message);
    return null;
  }
}

// Test de nouvelle partie avec un nouveau code
async function testNewGameWithSameCode(originalGame) {
  console.log('🧪 Test nouvelle partie avec nouveau code...');
  
  try {
    const newGameRes = await fetch(`${config.nextjs}/api/games/${originalGame.code}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'new_game',
        userId: 1
      })
    });
    
    if (!newGameRes.ok) {
      throw new Error('Erreur création nouvelle partie');
    }
    
    const newGameData = await newGameRes.json();
    const newGame = newGameData.game;
    
    console.log('✅ Nouvelle partie créée avec succès');
    console.log('📊 Comparaison:');
    console.log(`  - Code original: ${originalGame.code}`);
    console.log(`  - Code nouvelle: ${newGame.code}`);
    console.log(`  - ID original: ${originalGame.id}`);
    console.log(`  - ID nouvelle: ${newGame.id}`);
    console.log(`  - Scores nouvelle: ${newGame.scoreLeft}-${newGame.scoreRight}`);
    
    // Vérifier que c'est bien une nouvelle partie
    if (newGame.id === originalGame.id) {
      throw new Error('ERREUR: Même ID pour la nouvelle partie');
    }
    
    if (newGame.code === originalGame.code) {
      throw new Error('ERREUR: Même code pour la nouvelle partie (contrainte unique)');
    }
    
    if (newGame.scoreLeft !== 0 || newGame.scoreRight !== 0) {
      throw new Error('ERREUR: Scores non resetés dans la nouvelle partie');
    }
    
    console.log('✅ Nouvelle partie valide: nouveau code, nouvel ID, scores resetés');
    
  } catch (error) {
    console.error('❌ Test échoué:', error.message);
  }
}

// Test de récupération des parties
async function testGameRetrieval() {
  console.log('🧪 Test récupération parties...');
  
  try {
    const getRes = await fetch(`${config.nextjs}/api/games`);
    
    if (!getRes.ok) {
      throw new Error('Erreur récupération parties');
    }
    
    const data = await getRes.json();
    console.log(`✅ ${data.games.length} parties récupérées`);
    
    if (data.games.length > 0) {
      const game = data.games[0];
      console.log('📊 Exemple de partie:');
      console.log(`  - Code: ${game.code}`);
      console.log(`  - Status: ${game.status}`);
      console.log(`  - Joueurs: ${game.players.length}`);
      console.log(`  - Hôte: ${game.host.name}`);
    }
    
  } catch (error) {
    console.error('❌ Test échoué:', error.message);
  }
}

// Exécuter tous les tests
async function runAllTests() {
  console.log('🚀 Démarrage des tests Prisma...');
  console.log(`📡 URLs utilisées:`);
  console.log(`  - Next.js: ${config.nextjs}`);
  console.log(`  - Flask: ${config.flask}`);
  
  const originalGame = await testGameCreation();
  if (originalGame) {
    await testNewGameWithSameCode(originalGame);
  }
  await testGameRetrieval();
  
  console.log('🏁 Tests Prisma terminés');
}

// Exécuter si appelé directement
if (typeof window === 'undefined') {
  runAllTests();
} 