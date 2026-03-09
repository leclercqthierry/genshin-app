// src/services/supabase/user.ts
import type { ClientReadOnly, ClientWrite, ClientService } from "@/lib/supabase/ports";
import type { Profile } from "@/domain/user/types";

export async function getProfile(
    supabase: ClientReadOnly,
    userId: string
): Promise<Profile | null> {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("ERREUR LORS DE LA RÉCUPÉRATION DU PROFIL :", error);
            return null;
        }

        return data as Profile;
    } catch (err) {
        console.error("ERREUR INATTENDUE GET PROFILE :", err);
        return null;
    }
}

export async function createProfile(
    supabase: ClientWrite,
    userId: string,
    pseudo: string
): Promise<void> {
    const { error } = await supabase.from("profiles").insert({
        id: userId,
        role: "user",
        pseudo,
    });

    if (error) {
        console.error("ERREUR D'INSERTION DE PROFIL", error);
        throw error;
    }
}

export async function deleteProfile(
    supabase: ClientWrite,
    userId: string
): Promise<void> {
    const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

    if (error) {
        console.error("ERREUR DE SUPPRESSION DE PROFIL", error);
        throw error;
    }
}

export async function deleteUser(
    supabase: ClientService,
    userId: string
): Promise<void> {
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
        console.error("ERREUR DE SUPPRESSION D'UN UTILISATEUR AUTHENTIFIÉ", error);
        throw error;
    }
}