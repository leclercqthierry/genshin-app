"use server";

import { createSupabaseServer } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
    const supabase = await createSupabaseServer();
    await supabase.auth.signOut();
    redirect("/auth/login");
}