/**
 * @file Test script pour vérifier le flow de nouvelle partie
 * @author BabyLink Team
 * @created 2025-01-10
 * 
 * Teste la création d'une nouvelle partie avec le même code
 */

// Configuration des URLs
const config = {
  nextjs: 'https://bbylink.vercel.app', // URL Vercel en production
  flask: 'https://bear-enhanced-mutt.ngrok-free.app' // URL ngrok du Raspberry Pi
}

// Test de l'API Next.js pour créer une nouvelle partie
async function testNewGameAPI() {
  console.log('🧪 Test de l\'API nouvelle partie...');
  
  try {
    // 1. Créer une partie initiale
    const createRes = await fetch(`${config.nextjs}/api/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hostId: 1,
        tableId: 1,
        gameMode: '1v1',
        winCondition: 'first_to_goals',
        winValue: 10
      })
    });
    
    if (!createRes.ok) {
      throw new Error('Erreur création partie initiale');
    }
    
    const gameData = await createRes.json();
    const gameCode = gameData.game.code;
    console.log('✅ Partie initiale créée:', gameCode);
    
    // 2. Créer une nouvelle partie avec un nouveau code
    const newGameRes = await fetch(`${config.nextjs}/api/games/${gameCode}`, {
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
    console.log('✅ Nouvelle partie créée:', newGameData.game.code);
    console.log('📊 Nouvelle partie ID:', newGameData.game.id);
    console.log('📊 Ancienne partie ID:', gameData.game.id);
    
    // Vérifier que c'est bien une nouvelle partie (ID différent ET code différent)
    if (newGameData.game.id === gameData.game.id) {
      throw new Error('ERREUR: Même ID pour la nouvelle partie');
    }
    
    if (newGameData.game.code === gameData.game.code) {
      throw new Error('ERREUR: Même code pour la nouvelle partie (contrainte unique)');
    }
    
    console.log('✅ Test réussi: Nouvelle partie avec ID et code différents');
    
  } catch (error) {
    console.error('❌ Test échoué:', error.message);
  }
}

// Test du reset Flask
async function testFlaskReset() {
  console.log('🧪 Test du reset Flask...');
  
  try {
    const resetRes = await fetch(`${config.flask}/api/games/TEST123/reset-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1
      })
    });
    
    if (resetRes.ok) {
      console.log('✅ Reset Flask fonctionne');
    } else {
      console.log('⚠️ Reset Flask échoué (normal si partie inexistante)');
    }
    
  } catch (error) {
    console.log('⚠️ Flask non accessible:', error.message);
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests...');
  console.log(`📡 URLs utilisées:`);
  console.log(`  - Next.js: ${config.nextjs}`);
  console.log(`  - Flask: ${config.flask}`);
  
  await testNewGameAPI();
  await testFlaskReset();
  
  console.log('🏁 Tests terminés');
}

// Exécuter si appelé directement
if (typeof window === 'undefined') {
  runTests();
} 