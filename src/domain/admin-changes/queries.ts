import { createSupabaseClientReadOnly } from "@/lib/utils/supabase/clientReadOnly";
import type { AdminChangeGroup } from "./types";

export interface AdminChangeRow {
    id: number;
    date: string;
    action: "create" | "update" | "delete";
    entity_types: { label: string } | null; // OBJET, pas tableau
    admin_change_items: { entity_name: string }[];
}

export async function getAdminChangesGrouped(limit = 50) {
    const supabase = await createSupabaseClientReadOnly();

    const { data, error } = await supabase
        .from("admin_changes")
        .select(`
            id,
            date,
            action,
            entity_types (label),
            admin_change_items (entity_name)
        `)
        .order("date", { ascending: false })
        .limit(limit);

    if (error) throw error;

    const rows = (data ?? []) as unknown as AdminChangeRow[];

    const grouped: Record<string, Record<string, AdminChangeGroup>> = {};

    for (const change of rows) {
        const date = change.date;
        const label = change.entity_types?.label;

        if (!label) continue;

        if (!grouped[date]) grouped[date] = {};
        if (!grouped[date][label]) {
            grouped[date][label] = {
                date,
                entityLabel: label,
                creates: [],
                updates: [],
                deletes: [],
            };
        }

        const target = grouped[date][label];
        const names = change.admin_change_items.map(i => i.entity_name);

        if (change.action === "create") target.creates.push(...names);
        if (change.action === "update") target.updates.push(...names);
        if (change.action === "delete") target.deletes.push(...names);
    }

    return grouped;
}