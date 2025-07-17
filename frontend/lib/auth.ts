import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: "client" | "operator" | "admin";
  createdAt: Date;
  avatar?: string;
}

interface AuthStore {
  /* state */
  user: User | null;
  isAuthenticated: boolean;
  /* local helpers */
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  /* Supabase helpers */
  signInWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ user: User | null; error: string | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  fetchUserSession: () => Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Zustand store                                                              */
/* -------------------------------------------------------------------------- */

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      /* ---------- local state helpers ---------- */
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => {
        const current = get().user;
        if (current) set({ user: { ...current, ...updates } });
      },

      /* ---------- Supabase helpers (safe if not configured) ---------- */
      signInWithEmail: async (email, password) => {
        if (!isSupabaseConfigured()) {
          return {
            user: null,
            error:
              "Logowanie chwilowo niedostępne (brak konfiguracji Supabase).",
          };
        }

        try {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
          const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": supabaseAnonKey ?? "",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            return { user: null, error: data.error_description || data.error || "Błąd logowania." };
          }
          // data.user nie istnieje, trzeba pobrać usera przez getUser
          const access_token = data.access_token;
          if (!access_token) return { user: null, error: "Brak access_token po logowaniu." };

          // Pobierz usera na podstawie access_token
          const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
            headers: {
              "apikey": supabaseAnonKey ?? "",
              "Authorization": `Bearer ${access_token}`,
            },
          });
          const userData = await userRes.json();
          if (!userRes.ok || !userData) {
            return { user: null, error: "Nie udało się pobrać danych użytkownika." };
          }
          const user = supabaseUserToLocal(userData);
          set({ user, isAuthenticated: true });
          return { user, error: null };
        } catch (err) {
          return { user: null, error: (err as Error).message };
        }
      },

      signUpWithEmail: async (email, password, name) => {
        if (!isSupabaseConfigured()) {
          return {
            user: null,
            error:
              "Rejestracja chwilowo niedostępna (brak konfiguracji Supabase).",
          };
        }

        const { data, error } = await createClient().auth.signUp({
          email,
          password,
          options: { data: { name, role: "client" } },
        });
        if (error) return { user: null, error: error.message };

        const u = data.user;
        if (!u) return { user: null, error: "Nieoczekiwany błąd rejestracji." };

        const user = supabaseUserToLocal(u);
        set({ user, isAuthenticated: true });
        return { user, error: null };
      },

      signOut: async () => {
        if (!isSupabaseConfigured()) {
          set({ user: null, isAuthenticated: false });
          return { error: null };
        }
        const { error } = await createClient().auth.signOut();
        if (!error) set({ user: null, isAuthenticated: false });
        return { error: error?.message || null };
      },

      fetchUserSession: async () => {
        if (!isSupabaseConfigured()) return;
        const { data } = await createClient().auth.getSession();
        const u = data.session?.user;
        if (u) {
          set({ user: supabaseUserToLocal(u), isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
      onRehydrateStorage: () => (s) => s?.fetchUserSession(),
    },
  ),
);

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function supabaseUserToLocal(u: unknown): User {
  return {
    id: (u as any).id,
    email: (u as any).email ?? "",
    name: (u as any).user_metadata?.name ?? (u as any).email?.split("@")[0] ?? "Użytkownik",
    role: (u as any).user_metadata?.role as User["role"] || "client",
    createdAt: new Date((u as any).created_at),
    phone: (u as any).phone || undefined,
    avatar: (u as any).user_metadata?.avatar || undefined,
  };
}

/**
 * Dev-only helper preserved for legacy imports and tests.
 * Provides an in-memory “login” that doesn’t hit Supabase at all.
 */
export const mockLogin = (
  email: string,
  role: User["role"] = "client",
): User => {
  const user: User = {
    id: Math.random().toString(36).slice(2, 9),
    email,
    name: email.split("@")[0],
    role,
    createdAt: new Date(),
  };
  useAuth.getState().login(user);
  return user;
};

/**
 * Dev-only helper preserved for legacy imports and tests.
 * Clears any mock session created with `mockLogin`.
 */
export const mockLogout = (): void => {
  useAuth.getState().logout();
};
