import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lazy initialization for client-side Supabase client
let browserSupabase:
  | ReturnType<typeof createSupabaseClient<Database>>
  | undefined;

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase environment variables are not set. Returning a mock client. " +
        "Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are configured.",
    );
    // Return a mock client for development/testing when env vars are missing
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({
          data: { user: null, session: null },
          error: null,
        }),
        signUp: async () => ({
          data: { user: null, session: null },
          error: null,
        }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => ({ data: null, error: null }),
            order: () => ({ data: [], error: null }),
          }),
          order: () => ({ data: [], error: null }),
        }),
        insert: () => ({
          select: () => ({
            single: () => ({ data: null, error: null }),
          }),
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: () => ({ data: null, error: null }),
            }),
          }),
        }),
        delete: () => ({
          eq: () => ({
            select: () => ({
              single: () => ({ data: null, error: null }),
            }),
          }),
        }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
        }),
      },
    } as ReturnType<typeof createSupabaseClient<Database>>;
  }

  // Singleton pattern for browser client
  if (typeof window !== "undefined") {
    if (!browserSupabase) {
      browserSupabase = createSupabaseClient<Database>(
        supabaseUrl,
        supabaseAnonKey,
      );
    }
    return browserSupabase;
  }

  // Server-side client (can be used in Route Handlers, Server Actions)
  // Note: For Server Components, you might use a different pattern (e.g., cookies-based client)
  // For simplicity, this example uses the anon key for server-side as well,
  // but for sensitive operations, the service role key should be used with caution
  // or a dedicated server-side client with row-level security.
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Optional: A separate function for the service role client (use with extreme caution)
export function createServiceRoleClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Supabase service role environment variables are not set. " +
        "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are configured.",
    );
  }
  return createSupabaseClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const db = createClient();
