import { mapRowToBaseSet, mapBaseSetToRow } from "./mapper";
import type { BaseSetRow } from "./db";
import type { BaseSet } from "./types";

describe("mapRowToBaseSet et mapBaseSetToRow", () => {
    const row: BaseSetRow = {
        id: 42,
        name: "Test Set",
        rarity2_url: "https://example.com/r2.png",
        rarity3_url: "https://example.com/r3.png",
        rarity4_url: "https://example.com/r4.png",
        created_at: "2024-01-01T00:00:00Z",
    };

    it("mappe correctement le tronc commun sans extra", () => {
        const result = mapRowToBaseSet(row);

        const expected: BaseSet = {
            id: 42,
            name: "Test Set",
            rarity2Url: "https://example.com/r2.png",
            rarity3Url: "https://example.com/r3.png",
            rarity4Url: "https://example.com/r4.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        expect(result).toEqual(expected);
    });

    it("fusionne correctement les champs supplémentaires via extra()", () => {
        const result = mapRowToBaseSet(row, (r) => ({
            rarity5Url: "https://example.com/r5.png",
            elementId: 7,
        }));

        expect(result).toEqual({
            id: 42,
            name: "Test Set",
            rarity2Url: "https://example.com/r2.png",
            rarity3Url: "https://example.com/r3.png",
            rarity4Url: "https://example.com/r4.png",
            createdAt: "2024-01-01T00:00:00Z",
            rarity5Url: "https://example.com/r5.png",
            elementId: 7,
        });
    });

    const entity: BaseSet = {
        id: 42,
        name: "Test Set",
        rarity2Url: "https://example.com/r2.png",
        rarity3Url: "https://example.com/r3.png",
        rarity4Url: "https://example.com/r4.png",
        createdAt: "2024-01-01T00:00:00Z",
    };

    it("mappe correctement le tronc commun sans extra", () => {
        const result = mapBaseSetToRow(entity);

        const expected: BaseSetRow = {
            id: 42,
            name: "Test Set",
            rarity2_url: "https://example.com/r2.png",
            rarity3_url: "https://example.com/r3.png",
            rarity4_url: "https://example.com/r4.png",
            created_at: "2024-01-01T00:00:00Z",
        };

        expect(result).toEqual(expected);
    });

    it("fusionne correctement les champs supplémentaires via extra()", () => {
        const result = mapBaseSetToRow(entity, (e) => ({
            rarity5_url: "https://example.com/r5.png",
            element_id: 7,
        }));

        expect(result).toEqual({
            id: 42,
            name: "Test Set",
            rarity2_url: "https://example.com/r2.png",
            rarity3_url: "https://example.com/r3.png",
            rarity4_url: "https://example.com/r4.png",
            created_at: "2024-01-01T00:00:00Z",
            rarity5_url: "https://example.com/r5.png",
            element_id: 7,
        });
    });
});