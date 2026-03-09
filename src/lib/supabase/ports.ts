// src/lib/supabase/ports.ts
import type { SupabaseClient } from "@supabase/supabase-js";

// Lecture profil (RLS, read-only)
export interface ClientReadOnly {
    from: SupabaseClient["from"];
}

// Écriture profil (RLS, user authentifié)
export interface ClientWrite {
    from: SupabaseClient["from"];
}

// Service-role (admin)
export interface ClientService {
    auth: {
        admin: {
            deleteUser: (userId: string) => Promise<{ error: unknown }>;
        };
        // signUp: SupabaseClient["auth"]["signUp"];
    };
}