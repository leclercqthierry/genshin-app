/**
 * @vitest-environment node
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { describe, it, expect } from "vitest";
import { createSupabaseServiceClientNode } from "@/lib/utils/supabase/service-node";

describe("Profile – CRUD réel via client Node (hybride)", () => {
    it("create user → create profile → get → update → delete profile → delete user", async () => {
        const supabase = createSupabaseServiceClientNode();

        // 0) CREATE USER (auth)
        const email = `test-user-${Date.now()}@example.com`;

        const { data: userData, error: userError } =
            await supabase.auth.admin.createUser({
                email,
                email_confirm: true,
            });

        expect(userError).toBeNull();
        expect(userData).not.toBeNull();
        expect(userData!.user).not.toBeNull();

        const userId = userData!.user!.id;

        try {
            // 1) CREATE PROFILE
            const pseudo = `test-pseudo-${Date.now()}`;

            const { error: createProfileError } = await supabase
                .from("profiles")
                .insert({
                    id: userId,
                    role: "user",
                    pseudo,
                });

            expect(createProfileError).toBeNull();

            // 2) GET PROFILE
            const { data: fetchedAfterCreate, error: getError1 } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            expect(getError1).toBeNull();
            expect(fetchedAfterCreate).not.toBeNull();
            expect(fetchedAfterCreate?.pseudo).toBe(pseudo);

            // 3) UPDATE PROFILE
            const updatedPseudo = pseudo + "-updated";

            const { error: updateError } = await supabase
                .from("profiles")
                .update({ pseudo: updatedPseudo })
                .eq("id", userId);

            expect(updateError).toBeNull();

            // 4) GET après update
            const { data: fetchedAfterUpdate, error: getError2 } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            expect(getError2).toBeNull();
            expect(fetchedAfterUpdate?.pseudo).toBe(updatedPseudo);

        } finally {
            // 5) DELETE PROFILE
            const { error: deleteProfileError } = await supabase
                .from("profiles")
                .delete()
                .eq("id", userId);

            expect(deleteProfileError).toBeNull();

            // 6) DELETE USER (auth)
            const { error: deleteUserError } =
                await supabase.auth.admin.deleteUser(userId);

            expect(deleteUserError).toBeNull();

            // 7) Vérification suppression
            const { data: afterDelete } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .maybeSingle();

            expect(afterDelete).toBeNull();
        }
    });
});