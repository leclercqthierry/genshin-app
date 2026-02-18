import { createSupabaseServer } from "@/lib/utils/supabase/server";
import { createSupabaseServerReadOnly } from "@/lib/utils/supabase/serverReadOnly";
import type { Profile } from "@/domain/user/types";

export async function getProfile(userId: string): Promise<Profile | null> {
    const supabase = await createSupabaseServerReadOnly();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) return null;

    return data as Profile;
}

export async function createProfile(userId: string, pseudo: string): Promise<void> {
    const supabase = await createSupabaseServer();

    const { error } = await supabase.from("profiles").insert({
        id: userId,
        role: "user",
        pseudo,
    });

    if (error) {
        console.error("PROFILE INSERT ERROR", error);
        throw error;
    }
}
