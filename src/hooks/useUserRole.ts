import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/Profile";

export function useUserRole(user: User | null, profile: Profile | null) {
    const isAdmin = profile?.role === "admin";
    const isAuthenticated = !!user;
    const loading = false; // placeholder si tu ajoutes un loader plus tard

    return {
        user,
        isAdmin,
        isAuthenticated,
        loading,
    };
}