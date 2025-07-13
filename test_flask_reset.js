/**
 * @file Test spécifique pour le reset Flask avec vraie partie
 * @author BabyLink Team
 * @created 2025-01-10
 * 
 * Teste le reset Flask avec une partie qui existe réellement
 */

// Configuration des URLs
const config = {
  nextjs: 'https://bbylink.vercel.app', // URL Vercel en production
  flask: 'https://bear-enhanced-mutt.ngrok-free.app'
}

// Test du reset Flask avec une vraie partie
async function testFlaskResetWithRealGame() {
  console.log('🧪 Test reset Flask avec vraie partie...');
  
  try {
    // 1. Créer une partie via Next.js
    console.log('📝 Création d\'une partie de test...');
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
      throw new Error('Erreur création partie de test');
    }
    
    const gameData = await createRes.json();
    const gameCode = gameData.game.code;
    console.log(`✅ Partie de test créée: ${gameCode}`);
    
    // 2. Tester le reset Flask avec cette partie
    console.log(`🔄 Test reset Flask pour la partie ${gameCode}...`);
    const resetRes = await fetch(`${config.flask}/api/games/${gameCode}/reset-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1
      })
    });
    
    if (resetRes.ok) {
      const resetData = await resetRes.json();
      console.log('✅ Reset Flask réussi !');
      console.log('📊 Réponse Flask:', resetData);
    } else {
      const errorData = await resetRes.json();
      console.log('❌ Reset Flask échoué');
      console.log('📊 Erreur Flask:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Test échoué:', error.message);
  }
}

// Test de connexion Flask basique
async function testFlaskConnection() {
  console.log('🧪 Test connexion Flask basique...');
  
  try {
    const healthRes = await fetch(`${config.flask}/`);
    
    if (healthRes.ok) {
      console.log('✅ Flask accessible');
      console.log('📊 Status:', healthRes.status);
    } else {
      console.log('⚠️ Flask accessible mais erreur HTTP');
      console.log('📊 Status:', healthRes.status);
    }
    
  } catch (error) {
    console.log('❌ Flask non accessible:', error.message);
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests Flask...');
  console.log(`📡 URL Flask: ${config.flask}`);
  
  await testFlaskConnection();
  await testFlaskResetWithRealGame();
  
  console.log('🏁 Tests Flask terminés');
}

// Exécuter si appelé directement
if (typeof window === 'undefined') {
  runTests();
} 