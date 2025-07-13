/**
 * @file Test pour vérifier la version du Flask déployée
 * @author BabyLink Team
 * @created 2025-01-10
 * 
 * Vérifie si le Flask a les nouvelles routes
 */

// Configuration des URLs
const config = {
  flask: 'https://bear-enhanced-mutt.ngrok-free.app'
}

// Test des routes disponibles
async function testFlaskRoutes() {
  console.log('🧪 Test des routes Flask disponibles...');
  
  const routes = [
    { path: '/', name: 'Page principale' },
    { path: '/admin', name: 'Page admin' },
    { path: '/api/games', name: 'API parties' },
    { path: '/api/games/TEST123', name: 'API partie spécifique' },
    { path: '/api/games/TEST123/reset-score', name: 'API reset score' },
    { path: '/reset', name: 'Reset global' }
  ]
  
  for (const route of routes) {
    try {
      const res = await fetch(`${config.flask}${route.path}`, {
        method: route.path.includes('reset') ? 'POST' : 'GET',
        headers: route.path.includes('reset') ? { 'Content-Type': 'application/json' } : {},
        body: route.path.includes('reset') ? JSON.stringify({ user_id: 1 }) : undefined
      });
      
      console.log(`📊 ${route.name}: ${res.status} ${res.statusText}`);
      
      if (res.status === 404) {
        console.log(`❌ Route ${route.path} non trouvée`);
      } else if (res.status === 200) {
        console.log(`✅ Route ${route.path} accessible`);
      }
      
    } catch (error) {
      console.log(`❌ Erreur ${route.name}: ${error.message}`);
    }
  }
}

// Test spécifique de la route reset-score
async function testResetScoreRoute() {
  console.log('🧪 Test spécifique de la route reset-score...');
  
  try {
    const res = await fetch(`${config.flask}/api/games/TEST123/reset-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 1 })
    });
    
    console.log(`📊 Status: ${res.status}`);
    console.log(`📊 Content-Type: ${res.headers.get('content-type')}`);
    
    const text = await res.text();
    console.log(`📊 Réponse (premiers 200 chars): ${text.substring(0, 200)}`);
    
    if (res.headers.get('content-type')?.includes('application/json')) {
      console.log('✅ Route reset-score retourne du JSON');
    } else {
      console.log('❌ Route reset-score retourne du HTML (probablement une page d\'erreur)');
    }
    
  } catch (error) {
    console.error('❌ Erreur test reset-score:', error.message);
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests de version Flask...');
  console.log(`📡 URL Flask: ${config.flask}`);
  
  await testFlaskRoutes();
  await testResetScoreRoute();
  
  console.log('🏁 Tests de version terminés');
}

// Exécuter si appelé directement
if (typeof window === 'undefined') {
  runTests();
} 