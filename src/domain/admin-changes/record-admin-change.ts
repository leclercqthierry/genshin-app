import { createSupabaseServiceClient } from "@/lib/supabase/service";
import type { AdminChangeAction } from "./types";

export async function recordAdminChange(params: {
    entityType: string;
    action: AdminChangeAction;
    entityName: string;
}) {
    const supabase = await createSupabaseServiceClient();

    const { entityType, action, entityName } = params;

    const today = new Date().toISOString().slice(0, 10);

    // 1. Récupérer entity_type_id
    const { data: type, error: typeError } = await supabase
        .from("entity_types")
        .select("id, name, label")
        .eq("name", entityType)
        .single();

    if (typeError || !type) {
        throw new Error(`Unknown entity type: ${entityType}`);
    }

    // 2. Trouver ou créer admin_changes
    const { data: existing } = await supabase
        .from("admin_changes")
        .select("id")
        .eq("date", today)
        .eq("entity_type_id", type.id)
        .eq("action", action)
        .maybeSingle();

    let changeId = existing?.id;

    if (!changeId) {
        const { data: created, error: createError } = await supabase
            .from("admin_changes")
            .insert({
                date: today,
                entity_type_id: type.id,
                action,
            })
            .select("id")
            .single();

        if (createError) throw createError;

        changeId = created.id;
    }

    // 3. Ajouter l’item
    const { error: itemError } = await supabase
        .from("admin_change_items")
        .insert({
            admin_change_id: changeId,
            entity_name: entityName,
        });

    if (itemError) throw itemError;
}