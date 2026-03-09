import { describe, it, expect, vi, beforeEach } from "vitest";
import { recordAdminChange } from "@/domain/admin-changes/record-admin-change";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

vi.mock("@/lib/utils/supabase/service");

describe("recordAdminChange (integration)", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers().setSystemTime(new Date("2024-01-01"));
    });

    function mockSupabase() {
        const select = vi.fn().mockReturnThis();
        const eq = vi.fn().mockReturnThis();
        const single = vi.fn();
        const maybeSingle = vi.fn();

        const insertSelect = vi.fn().mockReturnThis();
        const insertSingle = vi.fn();

        const insert = vi.fn().mockReturnValue({
            select: insertSelect,
            single: insertSingle,
        });

        const from = vi.fn().mockReturnValue({
            select,
            eq,
            single,
            maybeSingle,
            insert,
        });

        (createSupabaseServiceClient as unknown as {
            mockResolvedValue: (value: unknown) => unknown;
        }).mockResolvedValue({ from });

        return {
            from,
            select,
            eq,
            single,
            maybeSingle,
            insert,
            insertSelect,
            insertSingle,
        };
    }

    it("throw si entityType est inconnu", async () => {
        const { select, single } = mockSupabase();

        select.mockReturnThis();
        single.mockResolvedValue({ data: null, error: { message: "not found" } });

        await expect(
            recordAdminChange({
                entityType: "unknown",
                action: "create",
                entityName: "Test",
            })
        ).rejects.toThrow("Unknown entity type: unknown");
    });

    it("utilise un admin_changes existant si trouvé", async () => {
        const { from, select, single, maybeSingle, insert } = mockSupabase();

        select.mockReturnThis();
        single.mockResolvedValue({
            data: { id: 10, name: "user", label: "User" },
            error: null,
        });

        maybeSingle.mockResolvedValue({
            data: { id: 42 },
            error: null,
        });

        insert.mockReturnValue({
            select: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: null, error: null }),
        });

        await recordAdminChange({
            entityType: "user",
            action: "create",
            entityName: "John",
        });

        expect(from).toHaveBeenCalledWith("entity_types");
        expect(from).toHaveBeenCalledWith("admin_changes");
        expect(from).toHaveBeenCalledWith("admin_change_items");

        expect(insert).toHaveBeenCalledWith({
            admin_change_id: 42,
            entity_name: "John",
        });
    });

    it("crée un admin_changes si aucun n'existe", async () => {
        const { select, single, maybeSingle, insertSingle } = mockSupabase();

        select.mockReturnThis();
        single.mockResolvedValue({
            data: { id: 10, name: "user", label: "User" },
            error: null,
        });

        maybeSingle.mockResolvedValue({
            data: null,
            error: null,
        });

        // création admin_changes
        insertSingle.mockResolvedValueOnce({
            data: { id: 99 },
            error: null,
        });

        // insertion item (pas de .single() ici)
        insertSingle.mockResolvedValueOnce({
            data: null,
            error: null,
        });

        await recordAdminChange({
            entityType: "user",
            action: "delete",
            entityName: "John",
        });

        expect(insertSingle).toHaveBeenCalledTimes(1);
    });

    it("throw si la création de admin_changes échoue", async () => {
        const { select, single, maybeSingle, insertSingle } = mockSupabase();

        select.mockReturnThis();
        single.mockResolvedValue({
            data: { id: 10 },
            error: null,
        });

        maybeSingle.mockResolvedValue({
            data: null,
            error: null,
        });

        insertSingle.mockResolvedValueOnce({
            data: null,
            error: new Error("DB create error"),
        });

        await expect(
            recordAdminChange({
                entityType: "user",
                action: "update",
                entityName: "John",
            })
        ).rejects.toThrow("DB create error");
    });

    it("throw si l’insertion de l’item échoue", async () => {
        const { select, single, maybeSingle, insert } = mockSupabase();

        select.mockReturnThis();
        single.mockResolvedValue({
            data: { id: 10 },
            error: null,
        });

        maybeSingle.mockResolvedValue({
            data: { id: 42 },
            error: null,
        });

        // erreur sur l’insertion de l’item
        insert.mockReturnValueOnce({
            select: vi.fn(),
            single: vi.fn(),
            error: new Error("Item error"),
        });

        await expect(
            recordAdminChange({
                entityType: "user",
                action: "create",
                entityName: "John",
            })
        ).rejects.toThrow("Item error");
    });
});