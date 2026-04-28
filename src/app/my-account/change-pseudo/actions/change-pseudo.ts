"use server";

import { requireUser } from "@/services/auth/require-user";
import { updateProfilePseudo } from "@/services/supabase/user";
import { createSupabaseClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { changePseudoSchema } from "../schema";

export async function changePseudo(formData: FormData) {
    const result = await requireUser();
    if (result.redirect || result.user === undefined) {
        throw new Error("Utilisateur non authentifié");
    }

    const { user } = result;
    const supabase = await createSupabaseClient();

    const newPseudo = formData.get("pseudo")?.toString()?.trim() ?? "";
    if (!newPseudo) {
        return { success: false as const, error: "Pseudo invalide" };
    }

    // Validation Zod côté serveur
    const parsed = changePseudoSchema.safeParse(newPseudo.trim());
    if (!parsed.success) {
        throw new Error(parsed.error.issues[0].message);
    }

    await updateProfilePseudo(supabase, user.id, parsed.data);

    redirect("/my-account");
}
