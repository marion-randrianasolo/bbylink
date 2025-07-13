// frontend/test_api_rewards.js
console.log('TEST SCRIPT LANCÉ');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'https://bbylink.vercel.app/api/games';
const USER_API = 'https://bbylink.vercel.app/api/users';
const MARION_ID = 13;
const OLANDRIA_ID = 14;

async function getUserStats(userId) {
  const res = await fetch(`${USER_API}/${userId}`);
  const data = await res.json();
  return {
    xp: data.xp,
    coins: data.coins,
    elo: data.elo
  };
}

async function createGame(hostId) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hostId,
      tableId: 3,
      gameMode: '1v1',
      winCondition: 'first_to_goals',
      winValue: 10
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error('Erreur création partie: ' + JSON.stringify(data));
  return data.game.code;
}

async function joinGame(code, userId) {
  const res = await fetch(`${API_BASE}/${code}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'join',
      userId
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error('Erreur join: ' + JSON.stringify(data));
}

async function getGameState(code) {
  const res = await fetch(`${API_BASE}/${code}`);
  const data = await res.json();
  return data.game;
}

async function testDynamicScenario({ label, hostId, joinId, winner: winnerLabel }) {
  console.log(`\n=== ${label} ===`);
  // Stats avant
  const statsBeforeHost = await getUserStats(hostId);
  const statsBeforeJoin = await getUserStats(joinId);

  // Créer partie
  const code = await createGame(hostId);
  await joinGame(code, joinId);

  // Récupérer la composition des équipes
  const gameState = await getGameState(code);
  const players = gameState.players.map(p => ({
    id: p.userId || (p.user && p.user.id),
    team: p.team
  }));
  console.log('Teams:', players);

  // Déterminer qui est RED/BLUE
  const hostTeam = players.find(p => p.id === hostId)?.team;
  const joinTeam = players.find(p => p.id === joinId)?.team;

  // Déterminer le score à envoyer pour faire gagner l'équipe voulue
  let leftScore, rightScore;
  if (winnerLabel === 'host') {
    if (hostTeam === 'RED') {
      leftScore = 10; rightScore = 2;
    } else {
      leftScore = 2; rightScore = 10;
    }
  } else if (winnerLabel === 'joiner') {
    if (joinTeam === 'RED') {
      leftScore = 10; rightScore = 2;
    } else {
      leftScore = 2; rightScore = 10;
    }
  } else {
    // égalité
    leftScore = 10; rightScore = 10;
  }

  // Finir la partie
  const res = await fetch(`${API_BASE}/${code}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'finish',
      userId: hostId,
      leftScore,
      rightScore
    })
  });
  const data = await res.json();
  console.log('Réponse API:', data);

  // Lire la structure réelle des joueurs après finish
  const gameStateAfter = await getGameState(code);
  const playersAfter = gameStateAfter.players.map(p => ({
    id: p.userId || (p.user && p.user.id),
    team: p.team
  }));
  console.log('Joueurs/équipes dans la partie après finish:', playersAfter);

  // Stats après
  const statsAfterHost = await getUserStats(hostId);
  const statsAfterJoin = await getUserStats(joinId);

  // Afficher le delta
  console.log(`Stats ${hostId} (avant/après/delta):`, statsBeforeHost, statsAfterHost, {
    xp: statsAfterHost.xp - statsBeforeHost.xp,
    coins: statsAfterHost.coins - statsBeforeHost.coins,
    elo: statsAfterHost.elo - statsBeforeHost.elo
  });
  console.log(`Stats ${joinId} (avant/après/delta):`, statsBeforeJoin, statsAfterJoin, {
    xp: statsAfterJoin.xp - statsBeforeJoin.xp,
    coins: statsAfterJoin.coins - statsBeforeJoin.coins,
    elo: statsAfterJoin.elo - statsBeforeJoin.elo
  });
}

// === AUDIT D'UNE PARTIE EXISTANTE ===
async function auditGameByCode(gameCode, userIds) {
  console.log(`\n=== AUDIT PARTIE ${gameCode} ===`);
  const game = await getGameState(gameCode);
  if (!game) {
    console.log('Partie introuvable');
    return;
  }
  const players = game.players.map(p => ({
    id: p.userId || (p.user && p.user.id),
    team: p.team
  }));
  console.log('Joueurs/équipes dans la partie:', players);
  for (const userId of userIds) {
    const stats = await getUserStats(userId);
    console.log(`Stats user ${userId}:`, stats);
  }
}

// === EXEMPLE D'UTILISATION ===
// Décommente et remplace le code/ids pour auditer une partie réelle
 await auditGameByCode('3558', [13, 14]);

(async () => {
  // 1. Victoire du host (peu importe qui est RED/BLUE)
  await testDynamicScenario({
    label: 'Victoire du host',
    hostId: MARION_ID,
    joinId: OLANDRIA_ID,
    winner: 'host'
  });

  // 2. Victoire du joiner (peu importe qui est RED/BLUE)
  await testDynamicScenario({
    label: 'Victoire du joiner',
    hostId: OLANDRIA_ID,
    joinId: MARION_ID,
    winner: 'joiner'
  });

  // 3. Égalité (doit échouer, pas de changement)
  await testDynamicScenario({
    label: 'Égalité',
    hostId: MARION_ID,
    joinId: OLANDRIA_ID,
    winner: 'egalite'
  });
})();