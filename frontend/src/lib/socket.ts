/**
 * @file Socket.IO client service for real-time game communication
 * @author BabyLink Team
 * @created 2025-01-09
 * 
 * Manages Socket.IO connection to Flask backend for live game updates,
 * score streaming, and real-time lobby updates.
 */

import { io, Socket } from 'socket.io-client'

/**
 * Interface for game data from Socket.IO events
 */
interface SocketGameData {
  code: string
  status: string
  host_id: number
  host_name: string
  table_id: number
  table_name: string
  game_mode: string
  win_condition: string
  win_value: number
  max_goals?: number
  currentScoreLeft: number
  currentScoreRight: number
  created_at: number
  players: Array<{
    user_id: number | null
    user_name: string
    user_avatar?: string
    user_first_name?: string
    user_last_name?: string
    user_elo?: number
    team: string
    position: string
    is_guest: boolean
    is_host: boolean
  }>
  max_players: number
}

/**
 * Socket.IO event handlers interface
 */
interface SocketEventHandlers {
  onGameUpdate?: (gameData: SocketGameData) => void
  onScoreUpdate?: (scoreData: { left: number; right: number }) => void
  onGameStarted?: (gameData: SocketGameData) => void
  onPlayerJoined?: (gameData: SocketGameData) => void
  onPlayerLeft?: (gameData: SocketGameData) => void
  onGameEnded?: (gameData: SocketGameData) => void
  onGameJoined?: (response: { status: string; message?: string; game_data?: SocketGameData }) => void
  onGameCreated?: (response: { status: string; message?: string; game_data?: SocketGameData }) => void
  onGuestAdded?: (response: { status: string; message?: string; game_data?: SocketGameData }) => void
  onError?: (error: string) => void
}

class SocketService {
  private socket: Socket | null = null
  private connected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  /**
   * Connect to the Flask Socket.IO server
   * @param url - Socket.IO server URL (default: auto-detect based on hostname)
   */
  connect(url?: string): Promise<Socket> {
    // Auto-detect server URL based on current hostname
    if (!url) {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
      url = `http://${hostname}:5000`
      console.log(`🔌 Auto-detected Socket.IO server URL: ${url}`)
    }
    return new Promise((resolve, reject) => {
      if (this.socket && this.connected) {
        resolve(this.socket)
        return
      }

      this.socket = io(url, {
        transports: ['polling', 'websocket'],
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
        upgrade: true,
        rememberUpgrade: false
      })

      this.socket.on('connect', () => {
        console.log('✅ Connected to Flask Socket.IO server')
        this.connected = true
        this.reconnectAttempts = 0
        resolve(this.socket!)
      })

      this.socket.on('disconnect', (reason) => {
        console.log('❌ Disconnected from Flask Socket.IO server:', reason)
        this.connected = false
      })

      this.socket.on('reconnect', (attemptNumber) => {
        console.log(`🔄 Reconnected to Flask Socket.IO server (attempt ${attemptNumber})`)
        this.connected = true
        this.reconnectAttempts = 0
      })

      this.socket.on('reconnect_failed', () => {
        console.error('❌ Failed to reconnect to Flask Socket.IO server')
        this.connected = false
        reject(new Error('Failed to connect to Socket.IO server'))
      })

      this.socket.on('connect_error', (error) => {
        console.error('❌ Socket.IO connection error:', error)
        reject(error)
      })

      // Set connection timeout
      setTimeout(() => {
        if (!this.connected) {
          reject(new Error('Connection timeout'))
        }
      }, 10000)
    })
  }

  /**
   * Disconnect from the Socket.IO server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.connected = false
      console.log('🔌 Disconnected from Socket.IO server')
    }
  }

  /**
   * Check if connected to the server
   */
  isConnected(): boolean {
    return this.connected && this.socket?.connected === true
  }

  /**
   * Join a user session for receiving personalized events
   * @param userId - User ID for session management
   * @param userData - Complete user data for avatar generation
   */
  joinUserSession(userId: number, userData: { name: string; email?: string; elo?: number; firstName?: string; lastName?: string }): void {
    if (this.socket && this.connected) {
      this.socket.emit('join_user_session', {
        user_id: userId,
        user_name: userData.name,
        user_email: userData.email || '',    // NOUVEAU: Email pour génération avatar serveur
        elo: userData.elo || 0,
        first_name: userData.firstName || '',
        last_name: userData.lastName || '',
      })
      console.log(`👤 Joined user session: ${userData.name} (${userId}) avec email: ${userData.email}`)
    }
  }

  /**
   * Join a specific game room for real-time updates
   * @param gameCode - Game code to join
   * @param user - User object with all information
   */
  joinGame(gameCode: string, user: { id: number; name: string; email?: string; avatar?: string; firstName?: string; lastName?: string; elo?: number }): void {
    if (this.socket && this.connected) {
      this.socket.emit('join_game', {
        game_code: gameCode,
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,     // NOUVEAU: Email pour génération avatar serveur
        user_avatar: user.avatar,
        user_first_name: user.firstName,
        user_last_name: user.lastName,
        user_elo: user.elo,
      })
      console.log(`🎮 Joining game: ${gameCode}`)
    }
  }

  /**
   * Create a new game
   * @param gameData - Game creation data
   */
  createGame(gameData: {
    host_id: number
    host_name: string
    host_email?: string      // NOUVEAU: Email pour génération avatar serveur
    host_avatar?: string
    host_first_name?: string
    host_last_name?: string
    host_elo?: number
    table_id: number
    table_name: string
    game_mode: string
    win_condition: string
    win_value: number
    max_goals?: number
  }): void {
    if (this.socket && this.connected) {
      this.socket.emit('create_game', gameData)
      console.log('🎮 Creating game via Socket.IO with host avatar:', gameData.host_avatar)
    }
  }

  /**
   * Start a game (host only)
   * @param gameCode - Game code to start
   * @param userId - Host user ID
   */
  startGame(gameCode: string, userId: number): void {
    if (this.socket && this.connected) {
      this.socket.emit('start_game', {
        game_code: gameCode,
        user_id: userId,
      })
      console.log(`🚀 Starting game: ${gameCode}`)
    }
  }

  /**
   * Add a guest player (host only)
   * @param gameCode - Game code
   * @param guestName - Guest player name
   * @param userId - Host user ID
   */
  addGuestPlayer(gameCode: string, guestName: string, userId: number): void {
    if (this.socket && this.connected) {
      this.socket.emit('add_guest_player', {
        game_code: gameCode,
        guest_name: guestName,
        user_id: userId,
      })
      console.log(`👤 Adding guest player: ${guestName}`)
    }
  }

  /**
   * Subscribe to game-related events
   * @param handlers - Event handler functions
   */
  onGameEvents(handlers: SocketEventHandlers): () => void {
    if (!this.socket) return () => {}

    // Game update events
    if (handlers.onGameUpdate) {
      this.socket.on('game_update', handlers.onGameUpdate)
    }

    if (handlers.onPlayerJoined) {
      this.socket.on('player_joined', handlers.onPlayerJoined)
    }

    if (handlers.onPlayerLeft) {
      this.socket.on('player_left', handlers.onPlayerLeft)
    }

    if (handlers.onGameStarted) {
      this.socket.on('game_started', (data) => {
        handlers.onGameStarted!(data.game_data)
      })
    }

    if (handlers.onGameEnded) {
      this.socket.on('game_ended', handlers.onGameEnded)
    }

    if (handlers.onGameJoined) {
      this.socket.on('game_joined', handlers.onGameJoined)
    }

    if (handlers.onGameCreated) {
      this.socket.on('game_created', handlers.onGameCreated)
    }

    if (handlers.onGuestAdded) {
      this.socket.on('guest_added', handlers.onGuestAdded)
    }

    // Score update events
    if (handlers.onScoreUpdate) {
      this.socket.on('score_update', handlers.onScoreUpdate)
    }

    // Error handling
    if (handlers.onError) {
      this.socket.on('error', handlers.onError)
      this.socket.on('game_joined', (data) => {
        if (data.status === 'error') {
          handlers.onError!(data.message)
        }
      })
      this.socket.on('game_created', (data) => {
        if (data.status === 'error') {
          handlers.onError!(data.message)
        }
      })
      this.socket.on('game_start_result', (data) => {
        if (data.status === 'error') {
          handlers.onError!(data.message)
        }
      })
      this.socket.on('guest_added', (data) => {
        if (data.status === 'error') {
          handlers.onError!(data.message)
        }
      })
    }

    // Return cleanup function
    return () => {
      if (this.socket) {
        this.socket.off('game_update')
        this.socket.off('player_joined')
        this.socket.off('player_left')
        this.socket.off('game_started')
        this.socket.off('game_ended')
        this.socket.off('game_joined')
        this.socket.off('game_created')
        this.socket.off('guest_added')
        this.socket.off('score_update')
        this.socket.off('error')
        this.socket.off('game_start_result')
      }
    }
  }

  /**
   * Get the raw socket instance (for advanced usage)
   */
  getSocket(): Socket | null {
    return this.socket
  }
}

// Export singleton instance
export const socketService = new SocketService()
export default socketService
export type { SocketGameData, SocketEventHandlers } 