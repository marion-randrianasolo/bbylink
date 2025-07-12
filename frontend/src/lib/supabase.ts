// frontend/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// L’URL publique de ton projet Supabase (Data API)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

// La clé « service_role » (secret) pour les appels côté serveur
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
)
