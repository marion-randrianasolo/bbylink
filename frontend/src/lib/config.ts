/**
 * @file Configuration des URLs pour différents environnements
 * @author BabyLink Team
 * @created 2025-01-10
 * 
 * Gère les URLs pour Next.js, Flask, et ngrok selon l'environnement
 */

// Configuration des URLs selon l'environnement
const config = {
  // URLs Flask/Arduino
  flask: {
    // URL ngrok du Raspberry Pi (production)
    production: 'https://bear-enhanced-mutt.ngrok-free.app',
    // URL locale pour développement
    development: 'http://localhost:5000',
    // URL par défaut (utilise production si disponible)
    default: process.env.NODE_ENV === 'production' 
      ? 'https://bear-enhanced-mutt.ngrok-free.app'
      : 'http://localhost:5000'
  },
  
  // URLs Next.js
  nextjs: {
    production: 'https://bbylink.vercel.app',
    development: 'http://localhost:3000',
    default: process.env.NODE_ENV === 'production'
      ? 'https://bbylink.vercel.app'
      : 'http://localhost:3000'
  }
}

/**
 * Obtenir l'URL Flask selon l'environnement
 */
export function getFlaskUrl(): string {
  // Priorité : variable d'environnement
  if (process.env.NEXT_PUBLIC_FLASK_API_URL) {
    return process.env.NEXT_PUBLIC_FLASK_API_URL
  }
  
  // Fallback : configuration par défaut
  return config.flask.default
}

/**
 * Obtenir l'URL Next.js selon l'environnement
 */
export function getNextjsUrl(): string {
  return config.nextjs.default
}

/**
 * Configuration complète
 */
export default config 