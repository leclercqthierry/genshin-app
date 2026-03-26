import { mapRowToMobDropSet, mapMobDropSetToRow } from "./mapper";
import type { MobDropSetRow } from "./db";
import type { MobDropSet } from "./types";

describe("mapRowToMobDropSet et mapMobDropSetToRow", () => {
    const row: MobDropSetRow = {
        id: 42,
        name: "Test Set",
        rarity1_url: "https://example.com/r1.png",
        rarity2_url: "https://example.com/r2.png",
        rarity3_url: "https://example.com/r3.png",
        created_at: "2024-01-01T00:00:00Z",
    };

    it("mapRowToMobDropSet", () => {
        const result = mapRowToMobDropSet(row);

        const expected: MobDropSet = {
            id: 42,
            name: "Test Set",
            rarity1Url: "https://example.com/r1.png",
            rarity2Url: "https://example.com/r2.png",
            rarity3Url: "https://example.com/r3.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        expect(result).toEqual(expected);
    });

    const entity: MobDropSet = {
        id: 42,
        name: "Test Set",
        rarity1Url: "https://example.com/r1.png",
        rarity2Url: "https://example.com/r2.png",
        rarity3Url: "https://example.com/r3.png",
        createdAt: "2024-01-01T00:00:00Z",
    };

    it("mapMobDropSetToRow", () => {
        const result = mapMobDropSetToRow(entity);

        const expected: MobDropSetRow = {
            id: 42,
            name: "Test Set",
            rarity1_url: "https://example.com/r1.png",
            rarity2_url: "https://example.com/r2.png",
            rarity3_url: "https://example.com/r3.png",
            created_at: "2024-01-01T00:00:00Z",
        };

        expect(result).toEqual(expected);
    });
});