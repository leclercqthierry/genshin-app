/**
 * En attendant de sortir les dépendances
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { describe, it, expect } from "vitest";
import { createSupabaseServiceClientNode } from "@/lib/supabase/service-node";

describe("WorldBossDrop – CRUD réel via client Node (hybride)", () => {
    it("create → get → update → get → delete → get", async () => {
        const supabase = createSupabaseServiceClientNode();

        // 1) CREATE
        const uniqueName = `test-worldbossdrop-${Date.now()}`;

        const { data: created, error: createError } = await supabase
            .from("world_boss_drops")
            .insert({
                name: uniqueName,
                icon_url: "https://example.com/test.png",
            })
            .select()
            .single();

        expect(createError).toBeNull();
        expect(created).toBeDefined();

        const id = created.id;

        try {
            // 2) GET après création (client Node)
            const { data: fetchedAfterCreate, error: getError1 } = await supabase
                .from("world_boss_drops")
                .select("*")
                .eq("id", id)
                .single();

            expect(getError1).toBeNull();
            expect(fetchedAfterCreate).not.toBeNull();
            expect(fetchedAfterCreate?.name).toBe(uniqueName);

            // 3) UPDATE
            const updatedName = uniqueName + "-updated";

            const { error: updateError } = await supabase
                .from("world_boss_drops")
                .update({ name: updatedName })
                .eq("id", id);

            expect(updateError).toBeNull();

            // 4) GET après update
            const { data: fetchedAfterUpdate, error: getError2 } = await supabase
                .from("world_boss_drops")
                .select("*")
                .eq("id", id)
                .single();

            expect(getError2).toBeNull();
            expect(fetchedAfterUpdate?.name).toBe(updatedName);

        } finally {
            // 5) DELETE
            const { error: deleteError } = await supabase
                .from("world_boss_drops")
                .delete()
                .eq("id", id);

            expect(deleteError).toBeNull();

            // 6) Vérification suppression
            const { data: afterDelete } = await supabase
                .from("world_boss_drops")
                .select("*")
                .eq("id", id)
                .maybeSingle();

            expect(afterDelete).toBeNull();
        }
    });
});