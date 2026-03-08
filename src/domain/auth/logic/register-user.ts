import type { RegisterFormState } from "@/app/auth/register/types";

export type RegisterDeps = {
    signUp: (email: string, password: string) => Promise<{ userId: string | null; error: string | null }>;
    createProfile: (userId: string, pseudo: string) => Promise<"ok" | "error">;
    deleteUser: (userId: string) => Promise<void>;
};

export async function registerUser(deps: RegisterDeps, data: { email: string; password: string; pseudo: string }): Promise<RegisterFormState> {
    const { userId, error } = await deps.signUp(data.email, data.password);

    if (error || !userId) {
        return {
            success: false,
            errors: {},
            message: error ?? "Impossible de créer le compte",
        };
    }

    const profile = await deps.createProfile(userId, data.pseudo);

    if (profile === "error") {
        await deps.deleteUser(userId);
        return {
            success: false,
            errors: {},
            message: "Impossible de créer le profil utilisateur",
        };
    }

    return { success: true, errors: {}, message: "Un email de confirmation vous a été envoyé" };
}