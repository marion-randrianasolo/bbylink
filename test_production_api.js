/**
 * @file Test de diagnostic pour l'API de production
 * @author BabyLink Team
 * @created 2025-01-10
 * 
 * Diagnostique les problèmes avec l'API Vercel
 */

// Configuration des URLs
const config = {
  nextjs: 'https://bbylink.vercel.app',
  flask: 'https://bear-enhanced-mutt.ngrok-free.app'
}

// Test de connexion basique à l'API
async function testBasicConnection() {
  console.log('🧪 Test connexion basique à l\'API...');
  
  try {
    const res = await fetch(`${config.nextjs}/api/games`);
    
    console.log('📊 Status:', res.status);
    console.log('📊 Headers:', Object.fromEntries(res.headers.entries()));
    
    if (res.ok) {
      const data = await res.json();
      console.log('✅ API accessible');
      console.log('📊 Parties trouvées:', data.games?.length || 0);
    } else {
      console.log('❌ API accessible mais erreur HTTP');
      const errorText = await res.text();
      console.log('📊 Erreur:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Erreur connexion:', error.message);
  }
}

// Test de création de partie avec plus de détails
async function testGameCreation() {
  console.log('🧪 Test création partie avec détails...');
  
  try {
    const res = await fetch(`${config.nextjs}/api/games`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        hostId: 1,
        tableId: 1,
        gameMode: '1v1',
        winCondition: 'first_to_goals',
        winValue: 10
      })
    });
    
    console.log('📊 Status:', res.status);
    console.log('📊 Headers:', Object.fromEntries(res.headers.entries()));
    
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Création réussie');
      console.log('📊 Partie créée:', data.game?.code);
    } else {
      console.log('❌ Création échouée');
      const errorText = await res.text();
      console.log('📊 Erreur:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Erreur création:', error.message);
  }
}

// Test de l'API avec un utilisateur existant
async function testWithExistingUser() {
  console.log('🧪 Test avec utilisateur existant...');
  
  try {
    // D'abord récupérer les utilisateurs existants
    const usersRes = await fetch(`${config.nextjs}/api/users`);
    
    if (usersRes.ok) {
      const usersData = await usersRes.json();
      console.log('📊 Utilisateurs disponibles:', usersData.users?.length || 0);
      
      if (usersData.users && usersData.users.length > 0) {
        const firstUser = usersData.users[0];
        console.log('📊 Utilisateur test:', firstUser.name);
        
        // Tester création avec cet utilisateur
        const createRes = await fetch(`${config.nextjs}/api/games`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            hostId: firstUser.id,
            tableId: 1,
            gameMode: '1v1',
            winCondition: 'first_to_goals',
            winValue: 10
          })
        });
        
        if (createRes.ok) {
          const data = await createRes.json();
          console.log('✅ Création réussie avec utilisateur existant');
          console.log('📊 Partie créée:', data.game?.code);
        } else {
          const errorText = await createRes.text();
          console.log('❌ Création échouée:', errorText);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur test utilisateur:', error.message);
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests de diagnostic...');
  console.log(`📡 URL testée: ${config.nextjs}`);
  
  await testBasicConnection();
  await testGameCreation();
  await testWithExistingUser();
  
  console.log('🏁 Tests de diagnostic terminés');
}

// Exécuter si appelé directement
if (typeof window === 'undefined') {
  runTests();
} 