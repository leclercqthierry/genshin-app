import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAdminChangesGrouped } from "./get-admin-changes-grouped";

import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";

vi.mock("@/lib/supabase/client-read-only");

describe("getAdminChangesGrouped", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    function mockSupabaseReturn(data: unknown, error: unknown = null) {
        (createSupabaseClientReadOnly as unknown as {
            mockResolvedValue: (v: unknown) => unknown;
        }).mockResolvedValue({
            from: () => ({
                select: () => ({
                    order: () => ({
                        limit: () => ({ data, error }),
                    }),
                }),
            }),
        });
    }

    it("retourne un objet vide si data est null", async () => {
        mockSupabaseReturn(null);

        const result = await getAdminChangesGrouped();
        expect(result).toEqual({});
    });

    it("ignore les lignes sans entity_types.label", async () => {
        mockSupabaseReturn([
            {
                id: 1,
                date: "2024-01-01",
                action: "create",
                entity_types: null,
                admin_change_items: [{ entity_name: "A" }],
            },
        ]);

        const result = await getAdminChangesGrouped();
        expect(result).toEqual({});
    });

    it("groupe correctement par date et label", async () => {
        mockSupabaseReturn([
            {
                id: 1,
                date: "2024-01-01",
                action: "create",
                entity_types: { label: "User" },
                admin_change_items: [{ entity_name: "Alice" }],
            },
            {
                id: 2,
                date: "2024-01-01",
                action: "update",
                entity_types: { label: "User" },
                admin_change_items: [{ entity_name: "Bob" }],
            },
            {
                id: 3,
                date: "2024-01-02",
                action: "delete",
                entity_types: { label: "Post" },
                admin_change_items: [{ entity_name: "Post 1" }],
            },
        ]);

        const result = await getAdminChangesGrouped();

        expect(result).toEqual({
            "2024-01-01": {
                User: {
                    date: "2024-01-01",
                    entityLabel: "User",
                    creates: ["Alice"],
                    updates: ["Bob"],
                    deletes: [],
                },
            },
            "2024-01-02": {
                Post: {
                    date: "2024-01-02",
                    entityLabel: "Post",
                    creates: [],
                    updates: [],
                    deletes: ["Post 1"],
                },
            },
        });
    });

    it("gère plusieurs noms dans admin_change_items", async () => {
        mockSupabaseReturn([
            {
                id: 1,
                date: "2024-01-01",
                action: "create",
                entity_types: { label: "User" },
                admin_change_items: [
                    { entity_name: "A" },
                    { entity_name: "B" },
                ],
            },
        ]);

        const result = await getAdminChangesGrouped();

        expect(result["2024-01-01"].User.creates).toEqual(["A", "B"]);
    });

    it("lève une erreur si Supabase renvoie error", async () => {
        mockSupabaseReturn(null, { message: "DB error" });

        await expect(getAdminChangesGrouped()).rejects.toEqual({ message: "DB error" });
    });
});