import type { Profile } from "@/domain/user/types";

export type LoginDeps = {
    signIn: (
        email: string,
        password: string
    ) => Promise<{ userId: string | null; error: string | null }>;

    getProfile: (userId: string) => Promise<Profile | null>;
};

export async function loginUser(
    deps: LoginDeps,
    data: { email: string; password: string }
) {
    const { userId, error } = await deps.signIn(data.email, data.password);

    if (error || !userId) {
        return {
            success: false,
            message: error ?? "Identifiants incorrects",
            role: null,
        };
    }

    const profile = await deps.getProfile(userId);

    if (!profile) {
        return {
            success: false,
            message: "Profil utilisateur introuvable",
            role: null,
        };
    }

    // 🔥 Normalisation du rôle (string → "admin" | "user")
    const normalizedRole: "admin" | "user" =
        profile.role === "admin" ? "admin" : "user";

    return {
        success: true,
        message: null,
        role: normalizedRole,
    };
}