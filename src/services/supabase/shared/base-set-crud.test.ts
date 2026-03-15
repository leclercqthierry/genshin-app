import { describe, it, expect, vi, beforeEach, Mock } from "vitest";

// --- Mocks AVANT les imports du code testé ---
vi.mock("@/lib/supabase/client-read-only");
vi.mock("@/lib/supabase/service");
vi.mock("@/domain/shared/base-set/mapper");

// --- Imports du code testé ---
import { createBaseSetCrud } from "./base-set-crud";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { mapRowToBaseSet } from "@/domain/shared/base-set/mapper";

import type { BaseSetRow, BaseSetCreateRow } from "@/domain/shared/base-set/db";
import type { BaseSet } from "@/domain/shared/base-set/types";

// --- Types étendus pour tester les génériques ---
type ExtendedSet = BaseSet & {
    extraField: string;
};

type ExtendedSetRow = BaseSetRow & {
    extra_field: string;
};

type ExtendedSetCreateRow = BaseSetCreateRow & {
    extra_field: string;
};

// --- Mocks Supabase strictement typés ---
type SupabaseReadOnlyMock = {
    from: Mock;
    select: Mock;
    order: Mock;
    eq: Mock;
    single: Mock;
};

type SupabaseServiceMock = {
    from: Mock;
    insert: Mock;
    update: Mock;
    delete: Mock;
    select: Mock;
    eq: Mock;
    single: Mock;
};

let mockReadOnly: SupabaseReadOnlyMock;
let mockService: SupabaseServiceMock;

// --- beforeEach propre ---
beforeEach(() => {
    mockReadOnly = {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn(),
    };

    mockService = {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn(),
    };

    (createSupabaseClientReadOnly as Mock).mockResolvedValue(mockReadOnly);
    (createSupabaseServiceClient as Mock).mockResolvedValue(mockService);

    // Mapper étendu
    (mapRowToBaseSet as Mock).mockImplementation(
        (row: ExtendedSetRow): ExtendedSet => ({
            id: row.id,
            name: row.name,
            rarity2Url: row.rarity2_url,
            rarity3Url: row.rarity3_url,
            rarity4Url: row.rarity4_url,
            createdAt: row.created_at,
            extraField: row.extra_field,
        })
    );
});

// --- Tests ---

describe("createBaseSetCrud.getAll", () => {
    it("mappe correctement un type étendu", async () => {
        const rows: ExtendedSetRow[] = [
            {
                id: 1,
                name: "Set A",
                rarity2_url: "a2.png",
                rarity3_url: "a3.png",
                rarity4_url: "a4.png",
                created_at: "2024",
                extra_field: "X",
            },
        ];

        mockReadOnly.order.mockReturnValueOnce({
            data: rows,
            error: null,
        });

        const service = createBaseSetCrud<
            ExtendedSet,
            ExtendedSetRow,
            ExtendedSetCreateRow
        >("extended_sets", mapRowToBaseSet);

        const result = await service.getAll();

        expect(result).toHaveLength(1);
        expect(result[0].extraField).toBe("X");
        expect(mapRowToBaseSet).toHaveBeenCalledWith(rows[0]);
    });
});

describe("createBaseSetCrud.getOne", () => {
    it("retourne un set étendu mappé", async () => {
        const row: ExtendedSetRow = {
            id: 1,
            name: "Set A",
            rarity2_url: "a2.png",
            rarity3_url: "a3.png",
            rarity4_url: "a4.png",
            created_at: "2024",
            extra_field: "X",
        };

        mockReadOnly.single.mockReturnValueOnce({ data: row, error: null });

        const service = createBaseSetCrud<
            ExtendedSet,
            ExtendedSetRow,
            ExtendedSetCreateRow
        >("extended_sets", mapRowToBaseSet);

        const result = await service.getOne(1);

        expect(result?.extraField).toBe("X");
        expect(mapRowToBaseSet).toHaveBeenCalledWith(row);
    });

    it("retourne null si non trouvé", async () => {
        mockReadOnly.single.mockReturnValueOnce({ data: null, error: "not found" });

        const service = createBaseSetCrud<
            ExtendedSet,
            ExtendedSetRow,
            ExtendedSetCreateRow
        >("extended_sets", mapRowToBaseSet);

        const result = await service.getOne(999);

        expect(result).toBeNull();
    });
});

describe("createBaseSetCrud.create", () => {
    it("accepte un payload étendu et mappe la réponse", async () => {
        const payload: ExtendedSetCreateRow = {
            name: "Set A",
            rarity2_url: "a2.png",
            rarity3_url: "a3.png",
            rarity4_url: "a4.png",
            extra_field: "X",
        };

        const row: ExtendedSetRow = {
            id: 1,
            name: "Set A",
            rarity2_url: "a2.png",
            rarity3_url: "a3.png",
            rarity4_url: "a4.png",
            created_at: "2024",
            extra_field: "X",
        };

        mockService.single.mockReturnValueOnce({ data: row, error: null });

        const service = createBaseSetCrud<
            ExtendedSet,
            ExtendedSetRow,
            ExtendedSetCreateRow
        >("extended_sets", mapRowToBaseSet);

        const result = await service.create(payload);

        expect(mockService.insert).toHaveBeenCalledWith(payload);
        expect(result.extraField).toBe("X");
    });
});

describe("createBaseSetCrud.update", () => {
    it("met à jour un type étendu", async () => {
        const payload: Partial<ExtendedSetCreateRow> = {
            name: "Updated",
        };

        const row: ExtendedSetRow = {
            id: 1,
            name: "Updated",
            rarity2_url: "a2.png",
            rarity3_url: "a3.png",
            rarity4_url: "a4.png",
            created_at: "2024",
            extra_field: "X",
        };

        mockService.single.mockReturnValueOnce({ data: row, error: null });

        const service = createBaseSetCrud<
            ExtendedSet,
            ExtendedSetRow,
            ExtendedSetCreateRow
        >("extended_sets", mapRowToBaseSet);

        const result = await service.update(1, payload);

        expect(mockService.update).toHaveBeenCalledWith(payload);
        expect(mockService.eq).toHaveBeenCalledWith("id", 1);
        expect(result.name).toBe("Updated");
    });
});

describe("createBaseSetCrud.remove", () => {
    it("supprime un set étendu", async () => {
        mockService.eq.mockReturnValueOnce({ error: null });

        const service = createBaseSetCrud<
            ExtendedSet,
            ExtendedSetRow,
            ExtendedSetCreateRow
        >("extended_sets", mapRowToBaseSet);

        await service.remove(1);

        expect(mockService.delete).toHaveBeenCalled();
        expect(mockService.eq).toHaveBeenCalledWith("id", 1);
    });
});