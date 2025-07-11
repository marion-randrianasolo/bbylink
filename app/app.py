from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
import threading
import random
import string
import time
import requests
import json
import sys

# Configuration Arduino
ARDUINO_FAKE_MODE = '--fake' in sys.argv or '-fake' in sys.argv

# Gestion de l'Arduino selon le mode
if not ARDUINO_FAKE_MODE:
    try:
        import serial
        ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
        print("🔌 Arduino connecté sur /dev/ttyACM0")
    except Exception as e:
        print(f"❌ Erreur Arduino: {e}")
        print("🤖 Mode simulation Arduino activé automatiquement")
        ARDUINO_FAKE_MODE = True
        ser = None
else:
    print("🤖 Mode simulation Arduino activé - Utilisez la page /admin pour contrôler")
    ser = None

# Création de l'app Flask + SocketIO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'babylink_secret_key_2025'

# Configuration CORS simplifiée selon documentation officielle Flask-CORS
# Source: https://flask-cors.readthedocs.io/en/latest/
import logging
logging.getLogger('flask_cors').level = logging.DEBUG

# Configuration CORS simple - recommended approach pour dev
# Permet CORS pour tous les domaines et toutes les routes (dev environment)
CORS(app)

# Debug middleware pour analyser les requêtes CORS
@app.before_request
def debug_cors_request():
    """Debug middleware pour analyser les requêtes CORS entrantes"""
    origin = request.headers.get('Origin')
    method = request.method
    host = request.headers.get('Host')
    user_agent = request.headers.get('User-Agent', 'Unknown')
    
    print(f"🌐 CORS Debug - Method: {method}, Origin: {origin}, Host: {host}")
    print(f"🔍 User-Agent: {user_agent[:50]}..." if len(user_agent) > 50 else f"🔍 User-Agent: {user_agent}")
    
    # Log spécifiquement pour les requêtes mobiles
    if origin and ('192.168' in origin or 'localhost' in origin):
        print(f"📱 Mobile/Local request detected: {origin}")

@app.after_request
def debug_cors_response(response):
    """Debug middleware pour analyser les réponses CORS"""
    origin = request.headers.get('Origin')
    if origin:
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
        }
        print(f"📤 CORS Response Headers: {cors_headers}")
    return response

# Configuration Socket.IO compatible avec toutes les versions
socketio = SocketIO(
    app, 
    cors_allowed_origins="*", 
    logger=False, 
    engineio_logger=False,
    ping_timeout=60,
    ping_interval=25
)

# État global du score (conservé pour l'Arduino)
score = {'GAUCHE': 0, 'DROITE': 0}

# État global des parties en cours
active_games = {}  # game_code -> game_data
user_connections = {}  # socket_id -> user_info

# Configuration pour communiquer avec l'API Next.js
NEXTJS_API_BASE = 'http://localhost:3000/api'

# User data storage for avatars and ELO - SYSTÈME REFAIT COMPLET
user_data_cache = {}

# SYSTÈME D'AVATAR REFAIT - SOURCE UNIQUE DE VÉRITÉ
# Principe Context7: Même seed = même avatar partout
# Solution: TOUJOURS utiliser l'avatar de la base de données Next.js

def get_user_data(user_id):
    """Get user data with STRICT database synchronization - NO avatar generation"""
    print(f"🎯 Avatar request for user {user_id} - Using DB as single source of truth")
    
    # ÉTAPE 1: Récupérer DIRECTEMENT depuis la base Next.js (pas de cache)
    db_user = get_user_from_nextjs_db_by_id(user_id)
    
    if not db_user:
        print(f"❌ User {user_id} not found in Next.js database")
        return {
            'avatar': '',
            'elo': 0,
            'first_name': '',
            'last_name': '',
            'email': '',
            'name': ''
        }
    
    # ÉTAPE 2: Utiliser EXACTEMENT l'avatar de la base - JAMAIS en générer
    user_data = {
        'avatar': db_user.get('avatar', ''),  # Utiliser tel quel de la BDD
        'elo': db_user.get('elo', 0),
        'first_name': db_user.get('firstName', ''),
        'last_name': db_user.get('lastName', ''),
        'email': db_user.get('email', ''),
        'name': db_user.get('name', ''),
        'last_updated': time.time()
    }
    
    # ÉTAPE 3: Mettre à jour le cache avec les données de la BDD
    user_data_cache[user_id] = user_data
    
    avatar_preview = user_data['avatar'][:50] + '...' if len(user_data['avatar']) > 50 else user_data['avatar']
    print(f"✅ Avatar from DB (NO generation): {avatar_preview}")
    print(f"📋 User data from DB: ID={user_id}, Email={user_data['email']}, Name={user_data['name']}")
    
    return user_data

def store_user_data(user_id, user_email='', user_name='', avatar='', elo=0, first_name='', last_name=''):
    """Store user data - FRONTEND AVATAR PRIORITY (like PlayerXPIndicator)"""
    print(f"💾 Storing user data for {user_id} - Frontend avatar priority mode")
    
    # NOUVEAU SYSTÈME: Utiliser l'avatar du frontend en priorité (comme PlayerXPIndicator)
    if avatar and avatar.strip():
        print(f"🎭 Using avatar from frontend (same as PlayerXPIndicator): {avatar[:50]}...")
        final_avatar = avatar
        final_elo = elo
        final_first_name = first_name
        final_last_name = last_name
        final_email = user_email
        final_name = user_name
    else:
        # Fallback: Consulter la base Next.js seulement si pas d'avatar frontend
        print(f"🔄 No frontend avatar, checking database...")
        if user_id:
            db_user = get_user_from_nextjs_db_by_id(user_id)
        elif user_email:
            db_user = get_user_from_nextjs_db(user_email)
        else:
            db_user = None
        
        if db_user:
            print(f"✅ Using data from Next.js database")
            final_avatar = db_user.get('avatar', '')
            final_elo = db_user.get('elo', elo)
            final_first_name = db_user.get('firstName', first_name)
            final_last_name = db_user.get('lastName', last_name)
            final_email = db_user.get('email', user_email)
            final_name = db_user.get('name', user_name)
        else:
            print(f"⚠️ No database data found - using provided data")
            final_avatar = ''  # Aucune génération automatique
            final_elo = elo
            final_first_name = first_name
            final_last_name = last_name
            final_email = user_email
            final_name = user_name
    
    user_data_cache[user_id] = {
        'avatar': final_avatar,
        'elo': final_elo,
        'first_name': final_first_name,
        'last_name': final_last_name,
        'email': final_email,
        'name': final_name,
        'last_updated': time.time()
    }
    
    avatar_preview = final_avatar[:50] + '...' if len(final_avatar) > 50 else final_avatar
    print(f"✅ User data stored: Avatar={avatar_preview}")
    print(f"🔍 Final avatar being used: {final_avatar}")
    
    return user_data_cache[user_id]

# DÉSACTIVER les fonctions de génération automatique
def generate_avatar_url(user_email, user_name=''):
    """DEPRECATED - Avatar generation disabled to ensure consistency"""
    print(f"⚠️ Avatar generation called but DISABLED for consistency")
    print(f"🎯 Use database avatar instead for {user_email}")
    return ''

def refresh_user_avatar(user_id, user_email, user_name=''):
    """DISABLED - Use database avatar only"""
    print(f"⚠️ Avatar refresh disabled - database is single source of truth")
    return get_user_data(user_id).get('avatar', '')

def get_user_from_nextjs_db(user_email):
    """Récupérer les données utilisateur depuis la base Next.js"""
    try:
        # URL corrigée pour port 3000
        api_url = 'http://localhost:3000/api/auth/get-user-by-email'
        print(f"🌐 Appel API Next.js: {api_url}?email={user_email}")
        
        # Appel à l'API Next.js pour récupérer l'utilisateur par email
        response = requests.get(api_url, 
                              params={'email': user_email}, 
                              timeout=5)
        
        print(f"📡 Réponse API: Status={response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            avatar_preview = user_data.get('avatar', 'None')
            if avatar_preview and len(avatar_preview) > 50:
                avatar_preview = avatar_preview[:50] + '...'
            print(f"📊 User trouvé en BDD: {user_data.get('email', '')} - Avatar: {avatar_preview}")
            print(f"🔍 Avatar complet: {user_data.get('avatar', 'None')}")
            return user_data
        else:
            print(f"❌ User non trouvé en BDD pour {user_email} (Status: {response.status_code})")
            print(f"📄 Réponse: {response.text[:200]}")
            return None
    except Exception as e:
        print(f"❌ Erreur connexion Next.js API: {e}")
        return None

def update_user_avatar_in_nextjs_db(user_email, avatar_url):
    """Mettre à jour l'avatar d'un utilisateur dans la base Next.js"""
    try:
        api_url = 'http://localhost:3000/api/auth/update-avatar'
        print(f"🌐 Update avatar API: {api_url}")
        
        response = requests.post(api_url, 
                               json={'email': user_email, 'avatar': avatar_url}, 
                               timeout=5)
        
        print(f"📡 Update réponse: Status={response.status_code}")
        
        if response.status_code == 200:
            print(f"✅ Avatar mis à jour en BDD pour {user_email}")
            return True
        else:
            print(f"❌ Erreur mise à jour avatar BDD pour {user_email} (Status: {response.status_code})")
            print(f"📄 Réponse: {response.text[:200]}")
            return False
    except Exception as e:
        print(f"❌ Erreur mise à jour avatar: {e}")
        return False

def get_user_from_nextjs_db_by_id(user_id):
    """Récupérer les données utilisateur depuis la base Next.js par ID"""
    try:
        # URL pour récupérer par ID
        api_url = 'http://localhost:3000/api/auth/get-user-by-id'
        print(f"🌐 Appel API Next.js (par ID): {api_url}?id={user_id}")
        
        # Appel à l'API Next.js pour récupérer l'utilisateur par ID
        response = requests.get(api_url, 
                              params={'id': user_id}, 
                              timeout=5)
        
        print(f"📡 Réponse API (ID): Status={response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            avatar_preview = user_data.get('avatar', 'None')
            if avatar_preview and len(avatar_preview) > 50:
                avatar_preview = avatar_preview[:50] + '...'
            print(f"📊 User trouvé en BDD (par ID): {user_data.get('email', '')} - Avatar: {avatar_preview}")
            print(f"🔍 Avatar complet (par ID): {user_data.get('avatar', 'None')}")
            return user_data
        else:
            print(f"❌ User non trouvé en BDD pour ID {user_id} (Status: {response.status_code})")
            print(f"📄 Réponse: {response.text[:200]}")
            return None
    except Exception as e:
        print(f"❌ Erreur connexion Next.js API (par ID): {e}")
        return None

# Route principale : page HTML
@app.route('/')
def index():
    return render_template('index.html', score=score)

# NOUVELLES ROUTES API POUR AVATARS - SYSTÈME SIMPLIFIÉ
@app.route('/api/user/<int:user_id>/avatar', methods=['GET'])
def get_user_avatar_api(user_id):
    """API pour récupérer l'avatar d'un utilisateur - SOURCE DB UNIQUEMENT"""
    print(f"🎯 API Avatar request for user {user_id} - Database source only")
    user_data = get_user_data(user_id)
    
    avatar = user_data.get('avatar', '')
    avatar_preview = avatar[:50] + '...' if len(avatar) > 50 else avatar
    print(f"📤 Returning avatar: {avatar_preview}")
    
    return jsonify({
        'success': True,
        'avatar': avatar,
        'user_id': user_id,
        'source': 'database_only'
    })

@app.route('/api/user/<int:user_id>/refresh-avatar', methods=['POST'])
def refresh_user_avatar_api(user_id):
    """API DEPRECATED - Avatar refresh désactivé pour cohérence"""
    print(f"⚠️ Avatar refresh called for user {user_id} but DISABLED")
    print(f"🎯 Use database avatar only - no generation allowed")
    
    user_data = get_user_data(user_id)
    
    return jsonify({
        'success': True,
        'avatar': user_data.get('avatar', ''),
        'user_id': user_id,
        'message': 'Avatar refresh disabled - using database source only'
    })

@app.route('/api/user/store-data', methods=['POST'])
def store_user_data_api():
    """API pour stocker les données utilisateur - PRIORITÉ BASE DE DONNÉES"""
    data = request.get_json() or {}
    
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({
            'success': False,
            'message': 'user_id requis'
        }), 400
    
    print(f"💾 Store data API call for user {user_id} - Database priority mode")
    
    # Utiliser la nouvelle fonction simplifiée
    user_data = store_user_data(
        user_id=user_id,
        user_email=data.get('email', ''),
        user_name=data.get('name', ''),
        avatar=data.get('avatar', ''),  # Si fourni, sinon récupéré de la DB
        elo=data.get('elo', 0),
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', '')
    )
    
    return jsonify({
        'success': True,
        'user_data': user_data,
        'message': 'Données stockées avec priorité base de données'
    })

# PAGE D'ADMINISTRATION (nouveau)
@app.route('/admin')
def admin_page():
    """Page d'administration pour contrôler manuellement les événements"""
    return f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>BabyLink - Administration</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; background: #0C0E14; color: white; }}
            .container {{ max-width: 800px; margin: 0 auto; }}
            .section {{ background: #1a1d24; padding: 20px; margin: 20px 0; border-radius: 8px; }}
            button {{ background: #EA1846; color: white; border: none; padding: 10px 20px; margin: 5px; border-radius: 4px; cursor: pointer; }}
            button:hover {{ background: #c41538; }}
            input, select {{ padding: 8px; margin: 5px; border-radius: 4px; border: 1px solid #333; background: #2a2d34; color: white; }}
            .score {{ font-size: 24px; margin: 10px 0; }}
            .games {{ margin-top: 20px; }}
            .game-item {{ background: #2a2d34; padding: 15px; margin: 10px 0; border-radius: 4px; }}
            .status {{ display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; }}
            .status.waiting {{ background: #f39c12; }}
            .status.playing {{ background: #27ae60; }}
            .status.finished {{ background: #e74c3c; }}
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js"></script>
    </head>
    <body>
        <div class="container">
            <h1>🎮 BabyLink - Administration</h1>
            
            <div class="section">
                <h2>📊 Score Arduino Global</h2>
                <div class="score">
                    Gauche: <span id="scoreLeft">{score['GAUCHE']}</span> | 
                    Droite: <span id="scoreRight">{score['DROITE']}</span>
                </div>
                <button onclick="simulateGoal('GAUCHE')">⚽ Goal Gauche</button>
                <button onclick="simulateGoal('DROITE')">⚽ Goal Droite</button>
                <button onclick="resetScore()">🔄 Reset Score</button>
            </div>

            <div class="section">
                <h2>🎯 Simulation Partie En Cours</h2>
                <p>Sélectionnez une partie active et simulez des goals pour cette partie :</p>
                <select id="gameSelect">
                    <option value="">Aucune partie sélectionnée</option>
                </select>
                <button onclick="simulateGameGoal('RED')">🔴 Goal Équipe Rouge</button>
                <button onclick="simulateGameGoal('BLUE')">🔵 Goal Équipe Bleue</button>
            </div>

            <div class="section">
                <h2>🎮 Parties Actives</h2>
                <button onclick="refreshGames()">🔄 Actualiser</button>
                <div id="gamesList" class="games"></div>
            </div>
        </div>

        <script>
            const socket = io();
            
            // Mise à jour du score en temps réel
            socket.on('score_update', function(data) {{
                document.getElementById('scoreLeft').textContent = data.left;
                document.getElementById('scoreRight').textContent = data.right;
            }});

            // Fonctions de simulation
            function simulateGoal(side) {{
                fetch('/admin/simulate_goal', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ side: side }})
                }});
            }}

            function simulateGameGoal(team) {{
                const gameCode = document.getElementById('gameSelect').value;
                if (!gameCode) {{
                    alert('Sélectionnez une partie d\\'abord');
                    return;
                }}
                
                fetch('/admin/simulate_game_goal', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ game_code: gameCode, team: team }})
                }});
            }}

            function resetScore() {{
                fetch('/reset', {{ method: 'POST' }});
            }}

            function refreshGames() {{
                fetch('/api/games')
                    .then(r => r.json())
                    .then(data => {{
                        updateGamesList(data.games);
                        updateGameSelect(data.games);
                    }});
            }}

            function updateGamesList(games) {{
                const container = document.getElementById('gamesList');
                if (games.length === 0) {{
                    container.innerHTML = '<p>Aucune partie active</p>';
                    return;
                }}
                
                container.innerHTML = games.map(game => `
                    <div class="game-item">
                        <strong>Code: ${{game.code}}</strong>
                        <span class="status ${{game.status}}">${{game.status}}</span>
                        <br>
                        Hôte: ${{game.host_name}} | Mode: ${{game.game_mode}}
                        <br>
                        Joueurs: ${{game.players.length}}/${{game.max_players}}
                        ${{game.status === 'playing' ? `<br>Score: ${{game.currentScoreLeft}} - ${{game.currentScoreRight}}` : ''}}
                    </div>
                `).join('');
            }}

            function updateGameSelect(games) {{
                const select = document.getElementById('gameSelect');
                select.innerHTML = '<option value="">Aucune partie sélectionnée</option>';
                games.filter(g => g.status === 'playing').forEach(game => {{
                    const option = document.createElement('option');
                    option.value = game.code;
                    option.textContent = `${{game.code}} - ${{game.host_name}} (${{game.currentScoreLeft}}-${{game.currentScoreRight}})`;
                    select.appendChild(option);
                }});
            }}

            // Actualiser au chargement
            refreshGames();
            setInterval(refreshGames, 5000); // Auto-refresh toutes les 5 secondes
        </script>
    </body>
    </html>
    '''

# Nouvelle route pour simuler un goal depuis l'admin
@app.route('/admin/simulate_goal', methods=['POST'])
def simulate_goal():
    """Simule un goal Arduino depuis la page d'admin"""
    data = request.get_json()
    side = data.get('side')
    
    if side in score:
        score[side] += 1
        emit_score()
        
        # Si une partie est en cours, mettre à jour le score de la partie
        if ARDUINO_FAKE_MODE:
            update_active_game_score(side)
        
        return jsonify({'status': 'success', 'side': side, 'new_score': score[side]})
    
    return jsonify({'status': 'error', 'message': 'Side invalide'}), 400

# Nouvelle route pour simuler un goal dans une partie spécifique
@app.route('/admin/simulate_game_goal', methods=['POST'])
def simulate_game_goal():
    """Simule un goal pour une partie spécifique"""
    data = request.get_json()
    game_code = data.get('game_code')
    team = data.get('team')  # 'RED' ou 'BLUE'
    
    if game_code not in active_games:
        return jsonify({'status': 'error', 'message': 'Partie introuvable'}), 404
    
    game_data = active_games[game_code]
    
    if game_data['status'] != 'playing':
        return jsonify({'status': 'error', 'message': 'Partie non active'}), 400
    
    # Augmenter le score selon l'équipe
    if team == 'RED':
        game_data['currentScoreLeft'] += 1
        score['GAUCHE'] += 1  # Sync avec le score Arduino
    elif team == 'BLUE':
        game_data['currentScoreRight'] += 1
        score['DROITE'] += 1  # Sync avec le score Arduino
    else:
        return jsonify({'status': 'error', 'message': 'Équipe invalide'}), 400
    
    # Vérifier si la partie est terminée
    check_game_end(game_code, game_data)
    
    # Émettre les mises à jour
    emit_score()  # Score Arduino global
    socketio.emit('live_score_update', {
        'game_code': game_code,
        'scoreLeft': game_data['currentScoreLeft'],
        'scoreRight': game_data['currentScoreRight'],
        'status': game_data['status']
    }, room=f"game_{game_code}")
    
    return jsonify({
        'status': 'success',
        'team': team,
        'game_code': game_code,
        'new_score': {
            'left': game_data['currentScoreLeft'],
            'right': game_data['currentScoreRight']
        }
    })

# Nouvelle route pour gérer le bouton "Remettre à zéro" (HTTP)
@app.route('/reset', methods=['POST'])
def reset_via_http():
    score['GAUCHE'] = 0
    score['DROITE'] = 0
    emit_score()
    return '', 204  # No Content

# API pour obtenir l'état des parties actives
@app.route('/api/games', methods=['GET'])
def get_active_games():
    return jsonify({
        'games': list(active_games.values()),
        'count': len(active_games)
    })

@app.route('/api/games/<string:game_code>', methods=['GET', 'POST'])
def handle_game_by_code(game_code):
    """Récupère ou modifie une partie par son code"""
    if game_code not in active_games:
        return jsonify({'error': 'Partie introuvable'}), 404
    
    game_data = active_games[game_code]
    
    if request.method == 'GET':
        # Convertir au format attendu par le frontend
        return jsonify({
            'game': {
                'id': 0,  # Flask ne gère pas d'ID SQL
                'code': game_data['code'],
                'status': game_data['status'],
                'gameMode': game_data['game_mode'],
                'winCondition': game_data['win_condition'],
                'winValue': game_data['win_value'],
                'maxGoals': game_data.get('max_goals'),
                'host': {
                    'id': game_data['host_id'],
                    'name': game_data['host_name'],
                    'firstName': get_user_data(game_data['host_id'])['first_name'] or game_data['host_name'].split(' ')[0],
                    'lastName': get_user_data(game_data['host_id'])['last_name'] or (' '.join(game_data['host_name'].split(' ')[1:]) if len(game_data['host_name'].split(' ')) > 1 else ''),
                    'avatar': get_user_data(game_data['host_id'])['avatar'],
                    'elo': get_user_data(game_data['host_id'])['elo'],
                },
                'table': {
                    'id': game_data['table_id'],
                    'name': game_data['table_name'],
                    'location': 'EPSI Montpellier',
                },
                'players': [
                    {
                        'id': p['user_id'] or 0,
                        'team': p['team'],
                        'position': p['position'],
                        'isGuest': p['is_guest'],
                        'guestName': p['user_name'] if p['is_guest'] else None,
                        'user': {
                            'id': p['user_id'],
                            'name': p['user_name'],
                            'firstName': p.get('user_first_name', p['user_name'].split(' ')[0]),
                            'lastName': p.get('user_last_name', ' '.join(p['user_name'].split(' ')[1:]) if len(p['user_name'].split(' ')) > 1 else ''),
                            'avatar': p.get('user_avatar', ''),
                            'elo': p.get('user_elo', 0),
                            'skillLevel': '',
                            'position': '',
                        } if p['user_id'] else None,
                    } for p in game_data['players']
                ]
            }
        })
    
    elif request.method == 'POST':
        data = request.get_json()
        action = data.get('action', 'join')  # Default to join for backward compatibility
        
        if action == 'start':
            # Démarrer une partie via REST API
            print(f"📥 REST START_GAME reçu: {data}")
            
            user_id = data.get('user_id')
            
            # Vérifier que c'est l'hôte qui démarre
            if game_data['host_id'] != user_id:
                return jsonify({'error': 'Seul l\'hôte peut démarrer la partie'}), 403
            
            # Vérifier qu'il y a assez de joueurs
            if len(game_data['players']) < 2:
                return jsonify({'error': 'Il faut au moins 2 joueurs pour commencer'}), 400
            
            # Démarrer la partie
            game_data['status'] = 'playing'
            game_data['started_at'] = time.time()
            
            # Remettre le score Arduino à zéro
            score['GAUCHE'] = 0
            score['DROITE'] = 0
            game_data['currentScoreLeft'] = 0
            game_data['currentScoreRight'] = 0
            
            print(f"🚀 Partie {game_code} démarrée via REST!")
            
            return jsonify({
                'game': {
                    'id': 0,
                    'code': game_data['code'],
                    'status': game_data['status'],
                    'gameMode': game_data['game_mode'],
                    'winCondition': game_data['win_condition'],
                    'winValue': game_data['win_value'],
                    'maxGoals': game_data.get('max_goals'),
                    'host': {
                        'id': game_data['host_id'],
                        'name': game_data['host_name'],
                        'firstName': get_user_data(game_data['host_id'])['first_name'] or game_data['host_name'].split(' ')[0],
                        'lastName': get_user_data(game_data['host_id'])['last_name'] or (' '.join(game_data['host_name'].split(' ')[1:]) if len(game_data['host_name'].split(' ')) > 1 else ''),
                        'avatar': get_user_data(game_data['host_id'])['avatar'],
                        'elo': get_user_data(game_data['host_id'])['elo'],
                    },
                    'table': {
                        'id': game_data['table_id'],
                        'name': game_data['table_name'],
                        'location': 'EPSI Montpellier',
                    },
                    'players': [
                        {
                            'id': p['user_id'] or 0,
                            'team': p['team'],
                            'position': p['position'],
                            'isGuest': p['is_guest'],
                            'guestName': p['user_name'] if p['is_guest'] else None,
                            'user': {
                                'id': p['user_id'],
                                'name': p['user_name'],
                                'firstName': p.get('user_first_name', p['user_name'].split(' ')[0]),
                                'lastName': p.get('user_last_name', ' '.join(p['user_name'].split(' ')[1:]) if len(p['user_name'].split(' ')) > 1 else ''),
                                'avatar': p.get('user_avatar', ''),
                                'elo': p.get('user_elo', 0),
                                'skillLevel': '',
                                'position': '',
                            } if p['user_id'] else None,
                        } for p in game_data['players']
                    ]
                }
            })
        
        else:  # action == 'join' or no action specified
            # Rejoindre une partie via REST API
            print(f"📥 REST JOIN_GAME reçu: {data}")
            
            if game_data['status'] != 'waiting':
                return jsonify({'error': 'Cette partie a déjà commencé'}), 400
            
            if len(game_data['players']) >= game_data['max_players']:
                return jsonify({'error': 'Partie complète'}), 400
        
        # Déterminer l'équipe et la position
        team = 'BLUE' if len([p for p in game_data['players'] if p['team'] == 'RED']) >= (game_data['max_players'] // 2) else 'RED'
        
        if game_data['game_mode'] == '2v2':
            team_players = [p for p in game_data['players'] if p['team'] == team]
            position = 'DEFENDER' if len(team_players) == 0 else 'ATTACKER'
        else:
            position = 'PLAYER'
        
        user_id = data.get('user_id')
        
        # Stocker les données du joueur avec nouveau système d'avatar
        store_user_data(
            user_id=user_id,
            user_email=data.get('user_email', ''),
            user_name=data.get('user_name', ''),
            avatar=data.get('user_avatar', ''),  # Si fourni par frontend, sinon auto-généré
            elo=data.get('user_elo', 0),
            first_name=data.get('user_first_name', ''),
            last_name=data.get('user_last_name', '')
        )
        
        # Récupérer les données stockées
        user_data = get_user_data(user_id)
        
        new_player = {
            'user_id': user_id,
            'user_name': data.get('user_name'),
            'user_avatar': user_data['avatar'],
            'user_first_name': user_data['first_name'],
            'user_last_name': user_data['last_name'],
            'user_elo': user_data['elo'],
            'team': team,
            'position': position,
            'is_guest': data.get('is_guest', False),
            'is_host': False
        }
        
        game_data['players'].append(new_player)
        print(f"👤 Joueur ajouté via REST: {new_player}")
        
        # Retourner la partie mise à jour
        # Notifier les autres participants de l'ajout (simulation temps réel)
        print(f"🔄 Joueur {data.get('user_name')} ajouté à la partie {game_code} - {len(game_data['players'])} joueurs total")
        
        return jsonify({
            'game': {
                'id': 0,
                'code': game_data['code'],
                'status': game_data['status'],
                'gameMode': game_data['game_mode'],
                'winCondition': game_data['win_condition'],
                'winValue': game_data['win_value'],
                'maxGoals': game_data.get('max_goals'),
                'host': {
                    'id': game_data['host_id'],
                    'name': game_data['host_name'],
                    'firstName': get_user_data(game_data['host_id'])['first_name'] or game_data['host_name'].split(' ')[0],
                    'lastName': get_user_data(game_data['host_id'])['last_name'] or (' '.join(game_data['host_name'].split(' ')[1:]) if len(game_data['host_name'].split(' ')) > 1 else ''),
                    'avatar': get_user_data(game_data['host_id'])['avatar'],
                    'elo': get_user_data(game_data['host_id'])['elo'],
                },
                'table': {
                    'id': game_data['table_id'],
                    'name': game_data['table_name'],
                    'location': 'EPSI Montpellier',
                },
                'players': [
                    {
                        'id': p['user_id'] or 0,
                        'team': p['team'],
                        'position': p['position'],
                        'isGuest': p['is_guest'],
                        'guestName': p['user_name'] if p['is_guest'] else None,
                        'user': {
                            'id': p['user_id'],
                            'name': p['user_name'],
                            'firstName': p.get('user_first_name', p['user_name'].split(' ')[0]),
                            'lastName': p.get('user_last_name', ' '.join(p['user_name'].split(' ')[1:]) if len(p['user_name'].split(' ')) > 1 else ''),
                            'avatar': p.get('user_avatar', ''),
                            'elo': p.get('user_elo', 0),
                            'skillLevel': '',
                            'position': '',
                        } if p['user_id'] else None,
                    } for p in game_data['players']
                ]
            }
        })

# Fonction d'envoi des scores en temps réel (conservée pour l'Arduino)
def emit_score():
    socketio.emit('score_update', {
        'left': score['GAUCHE'],
        'right': score['DROITE']
    })

# Fonction pour générer un code de partie unique
def generate_game_code():
    while True:
        code = ''.join(random.choices(string.digits, k=4))
        if code not in active_games:
            return code

# Fonction pour notifier les changements de partie
def emit_game_update(game_code):
    if game_code in active_games:
        game_data = active_games[game_code]
        room_name = f"game_{game_code}"
        print(f"🔄 Émission game_update pour room '{room_name}' - {len(game_data['players'])} joueurs")
        print(f"📡 Données émises: {game_data}")
        
        # Debug spécifique pour chaque joueur
        for i, player in enumerate(game_data['players']):
            print(f"👤 Joueur {i}: {player}")
            if player.get('is_host'):
                print(f"🖼️ HÔTE - Avatar: {player.get('user_avatar', 'MANQUANT')}")
            else:
                print(f"👥 INVITÉ - Avatar: {player.get('user_avatar', 'MANQUANT')}")
        
        # Utiliser to= au lieu de room= et enlever broadcast
        socketio.emit('game_update', game_data, to=room_name)

# Thread pour lire les infos série de l'Arduino (désactivé en mode fake)
def read_serial():
    if ARDUINO_FAKE_MODE or ser is None:
        print("⏭️  Thread Arduino désactivé (mode simulation)")
        return
    
    while True:
        try:
            if ser.in_waiting > 0:
                line = ser.readline().decode().strip()
                if line in score:
                    score[line] += 1
                    emit_score()

                    # Si une partie est en cours, mettre à jour le score de la partie
                    update_active_game_score(line)
        except Exception as e:
            print(f"Erreur lecture série: {e}")
            time.sleep(1)

def update_active_game_score(side):
    """Met à jour le score d'une partie active quand l'Arduino envoie un signal"""
    for game_code, game_data in active_games.items():
        if game_data['status'] == 'playing':
            if side == 'GAUCHE':
                game_data['currentScoreLeft'] += 1
            elif side == 'DROITE':
                game_data['currentScoreRight'] += 1
            
            # Vérifier si la partie est terminée
            check_game_end(game_code, game_data)
            
            # Notifier tous les clients de la partie
            socketio.emit('live_score_update', {
                'game_code': game_code,
                'scoreLeft': game_data['currentScoreLeft'],
                'scoreRight': game_data['currentScoreRight'],
                'status': game_data['status']
            }, room=f"game_{game_code}")
            
            break  # Une seule partie peut être active à la fois

def check_game_end(game_code, game_data):
    """Vérifie si une partie doit se terminer selon ses conditions"""
    score_left = game_data['currentScoreLeft']
    score_right = game_data['currentScoreRight']
    
    if game_data['win_condition'] == 'first_to_goals':
        target = game_data['win_value']
        if score_left >= target or score_right >= target:
            game_data['status'] = 'finished'
            game_data['finishedAt'] = time.time()
            
            # Déterminer le gagnant
            winner_team = 'left' if score_left > score_right else 'right'
            game_data['winner'] = winner_team
            
            # Notifier la fin de partie
            socketio.emit('game_finished', {
                'game_code': game_code,
                'winner': winner_team,
                'final_score': {
                    'left': score_left,
                    'right': score_right
                }
            }, room=f"game_{game_code}")

# === ÉVÉNEMENTS SOCKET.IO ===

@socketio.on('connect')
def handle_connect():
    emit_score()  # Envoyer le score actuel pour l'Arduino
    print(f"Client connecté: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    # Nettoyer les connexions utilisateur
    if request.sid in user_connections:
        user_info = user_connections[request.sid]
        # Quitter toutes les rooms de parties
        for game_code in active_games:
            leave_room(f"game_{game_code}")
        del user_connections[request.sid]
    print(f"Client déconnecté: {request.sid}")

@socketio.on('join_user_session')
def handle_join_user_session(data):
    """Associe une connexion socket à un utilisateur avec avatar auto-généré"""
    user_id = data.get('user_id')
    user_email = data.get('user_email', '')
    user_name = data.get('user_name', '')
    
    # Stocker les données utilisateur dans le cache serveur avec avatar auto-généré
    if user_id and (user_email or user_name):
        user_data = store_user_data(
            user_id=user_id,
            user_email=user_email,
            user_name=user_name,
            elo=data.get('elo', 0),
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', '')
        )
        print(f"✅ User data auto-stored in session: {user_data}")
    
    user_connections[request.sid] = {
        'user_id': user_id,
        'user_name': user_name,
        'joined_at': time.time()
    }
    
    # Retourner l'avatar généré côté serveur
    user_data = get_user_data(user_id) if user_id else {}
    emit('user_session_joined', {
        'status': 'success',
        'avatar': user_data.get('avatar', ''),
        'server_generated_avatar': True
    })

@socketio.on('create_game')
def handle_create_game(data):
    """Crée une nouvelle partie"""
    try:
        game_code = generate_game_code()
        host_id = data.get('host_id')
        
        # Stocker les données de l'hôte - UTILISER L'AVATAR FRONTEND (comme PlayerXPIndicator)
        print(f"🎯 Storing host data for user {host_id} - Using frontend avatar directly")
        store_user_data(
            user_id=host_id,
            user_email=data.get('host_email', ''),
            user_name=data.get('host_name', ''),
            avatar=data.get('host_avatar', ''),  # Utiliser l'avatar envoyé par le frontend
            elo=data.get('host_elo', 0),
            first_name=data.get('host_first_name', ''),
            last_name=data.get('host_last_name', '')
        )
        
        game_data = {
            'code': game_code,
            'status': 'waiting',
            'host_id': host_id,
            'host_name': data.get('host_name'),
            'table_id': data.get('table_id', 1),
            'table_name': data.get('table_name', 'Table Principale'),
            'game_mode': data.get('game_mode', '1v1'),
            'win_condition': data.get('win_condition', 'first_to_goals'),
            'win_value': data.get('win_value', 10),
            'max_goals': data.get('max_goals'),
            'currentScoreLeft': 0,
            'currentScoreRight': 0,
            'created_at': time.time(),
            'players': [],
            'max_players': 2 if data.get('game_mode') == '1v1' else 4
        }
        
        # Ajouter l'hôte à la partie avec ses données complètes
        host_user_data = get_user_data(host_id)
        host_player = {
            'user_id': host_id,
            'user_name': data.get('host_name'),
            'user_avatar': host_user_data['avatar'],
            'user_first_name': host_user_data['first_name'],
            'user_last_name': host_user_data['last_name'],
            'user_elo': host_user_data['elo'],
            'team': 'RED',
            'position': 'ATTACKER' if game_data['game_mode'] == '2v2' else 'PLAYER',
            'is_guest': False,
            'is_host': True
        }
        
        # Debug: Vérifier les données d'avatar
        print(f"🖼️ Host avatar stored: {host_user_data['avatar']}")
        print(f"👤 Host player data: {host_player}")
        print(f"📝 Data received from frontend: {data}")
        game_data['players'].append(host_player)
        
        # Debug final: vérifier game_data complet
        print(f"🎮 Game data final avec hôte: {game_data}")
        print(f"👥 Nombre de joueurs: {len(game_data['players'])}")
        print(f"🔍 Premier joueur (hôte): {game_data['players'][0] if game_data['players'] else 'AUCUN'}")
        
        active_games[game_code] = game_data
        
        # Joindre la room de la partie
        room_name = f"game_{game_code}"
        join_room(room_name)
        print(f"🏠 Host {data.get('host_name')} rejoint la room '{room_name}'")
        
        emit('game_created', {
            'status': 'success',
            'game_code': game_code,
            'game_data': game_data
        })
        
        print(f"🎮 Partie créée: {game_code} par {data.get('host_name')}")
        
    except Exception as e:
        emit('game_created', {
            'status': 'error',
            'message': str(e)
        })

@socketio.on('join_game')
def handle_join_game(data):
    """Rejoindre une partie existante"""
    try:
        # Debug : voir ce qui est reçu
        print(f"📥 JOIN_GAME reçu: {data}")
        
        game_code = data.get('game_code')
        
        if game_code not in active_games:
            emit('game_joined', {
                'status': 'error',
                'message': 'Partie introuvable'
            })
            return
        
        game_data = active_games[game_code]
        
        if game_data['status'] != 'waiting':
            emit('game_joined', {
                'status': 'error',
                'message': 'Cette partie a déjà commencé'
            })
            return
        
        if len(game_data['players']) >= game_data['max_players']:
            emit('game_joined', {
                'status': 'error',
                'message': 'Partie complète'
            })
            return
        
        # Déterminer l'équipe et la position
        team = 'BLUE' if len([p for p in game_data['players'] if p['team'] == 'RED']) >= (game_data['max_players'] // 2) else 'RED'
        
        if game_data['game_mode'] == '2v2':
            # Déterminer la position (DEFENDER/ATTACKER)
            team_players = [p for p in game_data['players'] if p['team'] == team]
            position = 'DEFENDER' if len(team_players) == 0 else 'ATTACKER'
        else:
            position = 'PLAYER'
        
        user_id = data.get('user_id')
        
        # Stocker les données du joueur - UTILISER L'AVATAR FRONTEND (comme PlayerXPIndicator)
        print(f"🎯 Storing joining player data for user {user_id} - Using frontend avatar directly")
        store_user_data(
            user_id=user_id,
            user_email=data.get('user_email', ''),
            user_name=data.get('user_name', ''),
            avatar=data.get('user_avatar', ''),  # Utiliser l'avatar envoyé par le frontend
            elo=data.get('user_elo', 0),
            first_name=data.get('user_first_name', ''),
            last_name=data.get('user_last_name', '')
        )
        
        # Récupérer les données stockées
        user_data = get_user_data(user_id)
        
        new_player = {
            'user_id': user_id,
            'user_name': data.get('user_name'),
            'user_avatar': user_data['avatar'],
            'user_first_name': user_data['first_name'],
            'user_last_name': user_data['last_name'],
            'user_elo': user_data['elo'],
            'team': team,
            'position': position,
            'is_guest': data.get('is_guest', False),
            'is_host': False
        }
        
        # Debug: Vérifier les données d'avatar pour le joueur qui rejoint
        print(f"🖼️ Joining player avatar stored: {user_data['avatar']}")
        print(f"👤 New player data: {new_player}")
        
        # Joindre la room de la partie AVANT d'ajouter le joueur
        room_name = f"game_{game_code}"
        join_room(room_name)
        print(f"🚪 Joueur {data.get('user_name')} rejoint la room '{room_name}'")
        
        game_data['players'].append(new_player)
        print(f"👤 Joueur ajouté: {new_player}")
        
        # Debug: Vérifier l'état de tous les joueurs AVANT emit_game_update
        print(f"🔍 État des joueurs AVANT emit_game_update:")
        for i, player in enumerate(game_data['players']):
            print(f"  Joueur {i}: ID={player.get('user_id')}, Avatar={player.get('user_avatar', 'MANQUANT')}, Host={player.get('is_host', False)}")
        
        # Notifier tous les participants (maintenant que le joueur est dans la room)
        emit_game_update(game_code)
        
        # Debug pour vérifier les événements
        print(f"🔄 Game update émis pour {game_code} - {len(game_data['players'])} joueurs")
        
        emit('game_joined', {
            'status': 'success',
            'game_data': game_data
        })
        
        print(f"✅ {data.get('user_name')} a rejoint la partie {game_code}")
        
    except Exception as e:
        emit('game_joined', {
            'status': 'error',
            'message': str(e)
        })

@socketio.on('start_game')
def handle_start_game(data):
    """Démarrer une partie"""
    try:
        game_code = data.get('game_code')
        user_id = data.get('user_id')
        
        if game_code not in active_games:
            emit('game_start_result', {
                'status': 'error',
                'message': 'Partie introuvable'
            })
            return
        
        game_data = active_games[game_code]
        
        # Vérifier que c'est l'hôte qui démarre
        if game_data['host_id'] != user_id:
            emit('game_start_result', {
                'status': 'error',
                'message': 'Seul l\'hôte peut démarrer la partie'
            })
            return
        
        # Vérifier qu'il y a assez de joueurs
        if len(game_data['players']) < 2:
            emit('game_start_result', {
                'status': 'error',
                'message': 'Il faut au moins 2 joueurs pour commencer'
            })
            return
        
        game_data['status'] = 'playing'
        game_data['started_at'] = time.time()
        
        # Remettre le score Arduino à zéro
        score['GAUCHE'] = 0
        score['DROITE'] = 0
        game_data['currentScoreLeft'] = 0
        game_data['currentScoreRight'] = 0
        
        # Notifier tous les participants
        socketio.emit('game_started', {
            'game_code': game_code,
            'game_data': game_data
        }, room=f"game_{game_code}")
        
        print(f"🚀 Partie {game_code} démarrée !")
        
    except Exception as e:
        emit('game_start_result', {
            'status': 'error',
            'message': str(e)
        })

@socketio.on('add_guest_player')
def handle_add_guest_player(data):
    """Ajouter un joueur invité"""
    try:
        game_code = data.get('game_code')
        guest_name = data.get('guest_name')
        user_id = data.get('user_id')  # ID de l'hôte qui ajoute l'invité
        
        if game_code not in active_games:
            emit('guest_added', {
                'status': 'error',
                'message': 'Partie introuvable'
            })
            return
        
        game_data = active_games[game_code]
        
        # Vérifier que c'est l'hôte qui ajoute
        if game_data['host_id'] != user_id:
            emit('guest_added', {
                'status': 'error',
                'message': 'Seul l\'hôte peut ajouter des invités'
            })
            return
        
        if len(game_data['players']) >= game_data['max_players']:
            emit('guest_added', {
                'status': 'error',
                'message': 'Partie complète'
            })
            return
        
        # Déterminer l'équipe et la position
        team = 'BLUE' if len([p for p in game_data['players'] if p['team'] == 'RED']) >= (game_data['max_players'] // 2) else 'RED'
        
        if game_data['game_mode'] == '2v2':
            team_players = [p for p in game_data['players'] if p['team'] == team]
            position = 'DEFENDER' if len(team_players) == 0 else 'ATTACKER'
        else:
            position = 'PLAYER'
        
        guest_player = {
            'user_id': None,
            'user_name': guest_name,
            'team': team,
            'position': position,
            'is_guest': True,
            'is_host': False
        }
        
        game_data['players'].append(guest_player)
        
        # Notifier tous les participants
        emit_game_update(game_code)
        
        emit('guest_added', {
            'status': 'success',
            'game_data': game_data
        })
        
        print(f"👤 Invité '{guest_name}' ajouté à la partie {game_code}")
        
    except Exception as e:
        emit('guest_added', {
            'status': 'error',
            'message': str(e)
        })

# Lancement de l'app Flask + SocketIO
if __name__ == '__main__':
    # Démarrer le thread Arduino seulement si nécessaire
    if not ARDUINO_FAKE_MODE and ser is not None:
        threading.Thread(target=read_serial, daemon=True).start()
        print("🚀 Serveur BabyLink démarré avec Arduino")
    else:
        print("🚀 Serveur BabyLink démarré sans Arduino")
        print(f"📖 Page d'administration disponible sur: http://localhost:5000/admin")
    
    socketio.run(app,
                 host='0.0.0.0',
                 port=5000,
                 allow_unsafe_werkzeug=True)
