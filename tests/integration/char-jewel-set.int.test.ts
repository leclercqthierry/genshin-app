/**
 * @vitest-environment node
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { describe, it, expect } from "vitest";
import { createSupabaseServiceClientNode } from "@/lib/utils/supabase/service-node";

describe("CharJewelSet – CRUD réel via client Node (hybride)", () => {
    it("create → get → update → get → delete → get", async () => {
        const supabase = createSupabaseServiceClientNode();

        // 0) CREATE ELEMENT (FK)
        const elementName = `test-element-${Date.now()}`;

        const { data: element, error: elementError } = await supabase
            .from("elements")
            .insert({
                name: elementName,
                icon_url: "https://example.com/anemo.png", // obligatoire
            })
            .select()
            .single();

        expect(elementError).toBeNull();
        expect(element).toBeDefined();

        const elementId = element.id;

        // 1) CREATE CHAR_JEWEL_SET
        const uniqueName = `test-charjewel-${Date.now()}`;

        const { data: created, error: createError } = await supabase
            .from("char_jewel_sets")
            .insert({
                name: uniqueName,
                element_id: elementId,
                rarity2_url: "https://example.com/r2.png",
                rarity3_url: "https://example.com/r3.png",
                rarity4_url: "https://example.com/r4.png",
                rarity5_url: "https://example.com/r5.png",
            })
            .select()
            .single();

        expect(createError).toBeNull();
        expect(created).toBeDefined();

        const id = created.id;

        try {
            // 2) GET après création
            const { data: fetchedAfterCreate, error: getError1 } = await supabase
                .from("char_jewel_sets")
                .select("*")
                .eq("id", id)
                .single();

            expect(getError1).toBeNull();
            expect(fetchedAfterCreate).not.toBeNull();
            expect(fetchedAfterCreate?.name).toBe(uniqueName);

            // 3) UPDATE
            const updatedName = uniqueName + "-updated";

            const { error: updateError } = await supabase
                .from("char_jewel_sets")
                .update({ name: updatedName })
                .eq("id", id);

            expect(updateError).toBeNull();

            // 4) GET après update
            const { data: fetchedAfterUpdate, error: getError2 } = await supabase
                .from("char_jewel_sets")
                .select("*")
                .eq("id", id)
                .single();

            expect(getError2).toBeNull();
            expect(fetchedAfterUpdate?.name).toBe(updatedName);

        } finally {
            // 5) DELETE CHAR_JEWEL_SET
            const { error: deleteError } = await supabase
                .from("char_jewel_sets")
                .delete()
                .eq("id", id);

            expect(deleteError).toBeNull();

            // 6) DELETE ELEMENT (FK)
            const { error: deleteElementError } = await supabase
                .from("elements")
                .delete()
                .eq("id", elementId);

            expect(deleteElementError).toBeNull();

            // 7) Vérification suppression
            const { data: afterDelete } = await supabase
                .from("char_jewel_sets")
                .select("*")
                .eq("id", id)
                .maybeSingle();

            expect(afterDelete).toBeNull();
        }
    });
});