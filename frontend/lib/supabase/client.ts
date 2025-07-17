import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

/**
 * Returns `true` only when both public Supabase env-vars are available.
 */
export const isSupabaseConfigured = (): boolean =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

/**
 * Lazy singleton creator.
 * When env-vars are missing we return a **mock client** so the app can still run
 * in preview / local builds without crashing. Auth methods then surface a
 * predictable `"Supabase not configured"` error.
 */
let cached: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (!isSupabaseConfigured()) return mockClient as unknown as SupabaseClient;

  if (!cached) {
    cached = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    );
  }
  return cached;
}

/* -------------------------------------------------------------------------- */
/* Fallback – minimal mock Supabase client                                    */
/* -------------------------------------------------------------------------- */

const supabaseError = { message: "Supabase not configured" };

const mockClient = {
  auth: {
    signInWithPassword: async () => ({
      data: { user: null },
      error: supabaseError,
    }),
    signUp: async () => ({ data: { user: null }, error: supabaseError }),
    signOut: async () => ({ error: supabaseError }),
    getSession: async () => ({ data: { session: null }, error: supabaseError }),
  },
};
