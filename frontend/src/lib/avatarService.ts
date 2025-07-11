/**
 * Service Avatar SIMPLIFIÉ - Récupération directe depuis Flask
 * Flask utilise UNIQUEMENT la base de données Next.js comme source
 * Principe Context7: Une seule source de vérité = cohérence garantie
 */

// Auto-detection de l'URL du serveur Flask
const getFlaskServerUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000'
    } else {
      // Utiliser l'IP détectée pour mobile
      return `http://${hostname}:5000`
    }
  }
  return 'http://localhost:5000'
}

const FLASK_SERVER_URL = getFlaskServerUrl()

/**
 * Interface pour les données utilisateur avatar
 */
export interface UserAvatarData {
  avatar: string
  elo: number
  first_name: string
  last_name: string
  email: string
  name: string
  last_updated?: number
}

/**
 * Service Avatar SIMPLIFIÉ - Source unique de vérité
 */
export class AvatarService {
  /**
   * Récupérer l'avatar d'un utilisateur depuis Flask
   * Flask consulte UNIQUEMENT la base Next.js - pas de génération
   */
  static async getUserAvatar(userId: number): Promise<string> {
    try {
      console.log(`🎯 Simple avatar fetch for user ${userId} from ${FLASK_SERVER_URL}`)
      
      const response = await fetch(`${FLASK_SERVER_URL}/api/user/${userId}/avatar`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success) {
        console.log(`✅ Avatar retrieved from database: ${data.avatar}`)
        return data.avatar
      } else {
        console.error('❌ Failed to get avatar:', data)
        return ''
      }
    } catch (error) {
      console.error(`❌ Error fetching avatar for user ${userId}:`, error)
      return ''
    }
  }

  /**
   * Méthode simplifiée pour obtenir un avatar "frais" 
   * Plus de génération - juste récupération DB via Flask
   */
  static async getFreshAvatar(userId: number, userEmail: string, userName: string): Promise<string> {
    console.log(`🎯 Getting fresh avatar for user ${userId} - Database only mode`)
    return await this.getUserAvatar(userId)
  }

  /**
   * Synchronisation simplifiée - juste un appel de récupération
   */
  static async syncUserWithServer(userId: number): Promise<UserAvatarData | null> {
    console.log(`🎯 Simple sync for user ${userId} - database source only`)
    
    const avatar = await this.getUserAvatar(userId)
    
    if (avatar) {
      return {
        avatar,
        elo: 0,
        first_name: '',
        last_name: '',
        email: '',
        name: '',
        last_updated: Date.now()
      }
    }
    
    return null
  }
}

/**
 * Hook pour l'utilisation dans les composants React
 */
export const useAvatarService = () => {
  return AvatarService
}

export default AvatarService 