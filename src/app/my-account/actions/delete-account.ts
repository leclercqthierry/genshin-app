"use server";

import { requireUser } from "@/services/auth/require-user";
import { deleteProfile, deleteUser } from "@/services/supabase/user";
import { createSupabaseClient } from "@/lib/supabase/client";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { redirect } from "next/navigation";

export async function deleteAccount() {

    const result = await requireUser();

    if (result.redirect || result.user === undefined) {
        throw new Error("Utilisateur non authentifié");
    }

    const { user } = result;
    const writeClient = await createSupabaseClient();
    const serviceClient = await createSupabaseServiceClient();

    // 1. Supprimer son propre profil
    await deleteProfile(writeClient, user.id);

    // 2. Supprimer l'utilisateur auth (dans supabase)
    await deleteUser(serviceClient, user.id);

    // 3. Déconnecter l'utilisateur (sinon cookie reste)
    await writeClient.auth.signOut();

    //4. Redirection vers la page de succès
    redirect("/delete-account-success");
}