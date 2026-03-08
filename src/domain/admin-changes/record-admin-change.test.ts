import { vi, type Mock } from "vitest";
import { recordAdminChange } from "./record-admin-change";
import { createSupabaseServiceClient } from "@/lib/utils/supabase/service";

// --- Types stricts, sans any/unknown/never ---

type BuilderResult = {
    data: object | null;
    error: object | null;
};

type Builder = {
    select: (...args: string[]) => Builder;
    eq: (...args: (string | number)[]) => Builder;
    single: () => Promise<BuilderResult>;
    maybeSingle: () => Promise<BuilderResult>;
    insert: (values: object) => Builder;
};

type SupabaseMock = {
    from: Mock<(table: string) => Builder>;
};

// --- Builder strict qui remonte correctement les erreurs ---
function createBuilder(result: BuilderResult): Builder {
    const builder: Builder = {
        select: () => builder,
        eq: () => builder,

        insert: () => {
            // Supabase renvoie directement { data, error } après insert()
            return {
                select: () => builder,
                eq: () => builder,
                insert: () => builder,
                single: () => Promise.resolve(result),
                maybeSingle: () => Promise.resolve(result),

                // ⬇️ C’est ici que Supabase renvoie l’erreur directement
                ...result,
            } as Builder;
        },

        single: () => Promise.resolve(result),
        maybeSingle: () => Promise.resolve(result),
    };

    return builder;
}

// --- Mock strict du module Supabase service ---

vi.mock("@/lib/utils/supabase/service", () => ({
    createSupabaseServiceClient: vi.fn<() => Promise<SupabaseMock>>(),
}));

// On retape la fonction mockée pour que TS arrête de croire qu’elle retourne un SupabaseClient
const typedCreateSupabaseServiceClient =
    createSupabaseServiceClient as unknown as () => Promise<SupabaseMock>;

describe("recordAdminChange", () => {
    let mockClient: SupabaseMock;

    beforeEach(() => {
        mockClient = {
            from: vi.fn<(table: string) => Builder>(),
        };

        vi.mocked(typedCreateSupabaseServiceClient).mockResolvedValue(mockClient);
    });

    it("throw si entityType est inconnu", async () => {
        mockClient.from.mockImplementation((table: string): Builder => {
            if (table === "entity_types") {
                return createBuilder({ data: null, error: { message: "not found" } });
            }
            throw new Error("Unexpected table");
        });

        await expect(
            recordAdminChange({
                entityType: "ghost",
                action: "create",
                entityName: "X",
            })
        ).rejects.toThrow("Unknown entity type");
    });

    it("ne crée pas admin_changes si un enregistrement existe déjà", async () => {
        mockClient.from.mockImplementation((table: string): Builder => {
            if (table === "entity_types") {
                return createBuilder({ data: { id: 1 }, error: null });
            }
            if (table === "admin_changes") {
                return createBuilder({ data: { id: 123 }, error: null });
            }
            if (table === "admin_change_items") {
                return createBuilder({ data: null, error: null });
            }
            throw new Error("Unexpected table");
        });

        await recordAdminChange({
            entityType: "user",
            action: "create",
            entityName: "Bob",
        });

        expect(mockClient.from).toHaveBeenCalledWith("admin_changes");
    });

    it("crée admin_changes si aucun n'existe", async () => {
        mockClient.from.mockImplementation((table: string): Builder => {
            if (table === "entity_types") {
                return createBuilder({ data: { id: 1 }, error: null });
            }
            if (table === "admin_changes") {
                // IMPORTANT : ici il faut renvoyer un id
                return createBuilder({ data: { id: 999 }, error: null });
            }
            if (table === "admin_change_items") {
                return createBuilder({ data: null, error: null });
            }
            throw new Error("Unexpected table");
        });

        await recordAdminChange({
            entityType: "user",
            action: "create",
            entityName: "Bob",
        });

        expect(mockClient.from).toHaveBeenCalledWith("admin_changes");
    });

    it("throw si la création admin_changes échoue", async () => {
        mockClient.from.mockImplementation((table: string): Builder => {
            if (table === "entity_types") {
                return createBuilder({ data: { id: 1 }, error: null });
            }
            if (table === "admin_changes") {
                return createBuilder({
                    data: null,
                    error: { message: "insert error" },
                });
            }
            throw new Error("Unexpected table");
        });

        await expect(
            recordAdminChange({
                entityType: "user",
                action: "create",
                entityName: "Bob",
            })
        ).rejects.toThrow();
    });

    it("throw si l'insertion de l'item échoue", async () => {
        mockClient.from.mockImplementation((table: string): Builder => {
            if (table === "entity_types") {
                return createBuilder({ data: { id: 1 }, error: null });
            }
            if (table === "admin_changes") {
                return createBuilder({ data: { id: 123 }, error: null });
            }
            if (table === "admin_change_items") {
                // IMPORTANT : ici l’erreur doit remonter
                return createBuilder({
                    data: null,
                    error: { message: "item error" },
                });
            }
            throw new Error("Unexpected table");
        });

        await expect(
            recordAdminChange({
                entityType: "user",
                action: "create",
                entityName: "Bob",
            })
        ).rejects.toThrow();
    });
});