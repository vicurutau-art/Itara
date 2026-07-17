import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente con permisos de administrador (bypassa RLS por completo).
 * SOLO se debe usar en Server Actions o Route Handlers.
 * NUNCA importar este archivo en un componente 'use client'.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
