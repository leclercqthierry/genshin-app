import { describe, it, expect, vi, beforeEach, Mock } from "vitest";

vi.mock("@/lib/supabase/client-read-only");
vi.mock("@/lib/supabase/service");
vi.mock("@/domain/shared/base-item/mapper");

import { createBaseItemCrud } from "./base-item-crud";
import { BaseItemRow } from "@/domain/shared/base-item/db";

type SupabaseReadOnlyMock = {
    from: Mock;
    select: Mock;
    order: Mock;
    eq: Mock;
    single: Mock;
};

type MockSupabaseService = {
    from: ReturnType<typeof vi.fn>;
    insert: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    select: ReturnType<typeof vi.fn>;
    eq: ReturnType<typeof vi.fn>;
    single: ReturnType<typeof vi.fn>;
};


let mockReadOnly: SupabaseReadOnlyMock;;
let mockService: MockSupabaseService;

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

    // mapper mocké
    (mapRowToBaseItem as Mock).mockImplementation((row: BaseItemRow) => ({
        id: row.id,
        name: row.name,
        iconUrl: row.icon_url,
        createdAt: row.created_at,
    }));
});

import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { mapRowToBaseItem } from "@/domain/shared/base-item/mapper";

describe("createBaseItemCrud.getAll", () => {
    it("retourne les items mappés", async () => {
        const rows: BaseItemRow[] = [
            { id: 1, name: "A", icon_url: "a.png", created_at: "2024" },
            { id: 2, name: "B", icon_url: "b.png", created_at: "2024" },
        ];

        // La réponse finale vient de .order()
        mockReadOnly.order.mockReturnValueOnce({
            data: rows,
            error: null,
        });

        const service = createBaseItemCrud("items");
        const result = await service.getAll();

        expect(result).toHaveLength(2);
        expect(result[0].name).toBe("A");
    });
});

describe("createBaseItemCrud.getOne", () => {
    it("retourne un item mappé", async () => {
        const row = { id: 1, name: "A", icon_url: "a.png", created_at: "2024" };

        mockReadOnly.single.mockReturnValueOnce({ data: row, error: null });

        const service = createBaseItemCrud("items");
        const result = await service.getOne(1);

        expect(result?.id).toBe(1);
        expect(mapRowToBaseItem).toHaveBeenCalledWith(row);
    });

    it("retourne null si non trouvé", async () => {
        mockReadOnly.single.mockReturnValueOnce({ data: null, error: "not found" });

        const service = createBaseItemCrud("items");
        const result = await service.getOne(999);

        expect(result).toBeNull();
    });
});

describe("createBaseItemCrud.create", () => {
    it("insère le payload et mappe la réponse", async () => {
        const payload = { name: "A", icon_url: "a.png" };

        const row = { id: 1, name: "A", icon_url: "a.png", created_at: "2024" };

        mockService.single.mockReturnValueOnce({ data: row, error: null });

        const service = createBaseItemCrud("items");
        const result = await service.create(payload);

        expect(mockService.insert).toHaveBeenCalledWith(payload);
        expect(result.id).toBe(1);
    });
});

describe("createBaseItemCrud.update", () => {
    it("met à jour et mappe la réponse", async () => {
        const payload = { name: "Updated" };

        const row = {
            id: 1,
            name: "Updated",
            icon_url: "a.png",
            created_at: "2024",
        };

        mockService.single.mockReturnValueOnce({ data: row, error: null });

        const service = createBaseItemCrud("items");
        const result = await service.update(1, payload);

        expect(mockService.update).toHaveBeenCalledWith(payload);
        expect(mockService.eq).toHaveBeenCalledWith("id", 1);
        expect(result.name).toBe("Updated");
    });
});

describe("createBaseItemCrud.remove", () => {
    it("supprime l'item", async () => {
        mockService.eq.mockReturnValueOnce({ error: null });

        const service = createBaseItemCrud("items");
        await service.remove(1);

        expect(mockService.delete).toHaveBeenCalled();
        expect(mockService.eq).toHaveBeenCalledWith("id", 1);
    });
});