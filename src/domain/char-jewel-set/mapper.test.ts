import { mapRowToCharJewelSet, mapCharJewelSetToRow } from "./mapper";
import type { CharJewelSetRow } from "./db";
import type { CharJewelSet } from "./types";

describe("mapRowToCharJewelSet et mapCharJewelSetToRow", () => {
    const row: CharJewelSetRow = {
        id: 1,
        name: "Test Jewel",
        rarity2_url: "https://example.com/r2.png",
        rarity3_url: "https://example.com/r3.png",
        rarity4_url: "https://example.com/r4.png",
        created_at: "2024-01-01T00:00:00Z",
        rarity5_url: "https://example.com/r5.png",
        element_id: 7,
    };

    it("mappe correctement les champs spécifiques", () => {
        const result = mapRowToCharJewelSet(row);

        const expected: CharJewelSet = {
            id: 1,
            name: "Test Jewel",
            rarity2Url: "https://example.com/r2.png",
            rarity3Url: "https://example.com/r3.png",
            rarity4Url: "https://example.com/r4.png",
            createdAt: "2024-01-01T00:00:00Z",
            rarity5Url: "https://example.com/r5.png",
            elementId: 7,
        };

        expect(result).toEqual(expected);
    });

    const entity: CharJewelSet = {
        id: 1,
        name: "Test Jewel",
        rarity2Url: "https://example.com/r2.png",
        rarity3Url: "https://example.com/r3.png",
        rarity4Url: "https://example.com/r4.png",
        createdAt: "2024-01-01T00:00:00Z",
        rarity5Url: "https://example.com/r5.png",
        elementId: 7,
    };

    it("mappe correctement les champs spécifiques vers la DB", () => {
        const result = mapCharJewelSetToRow(entity);

        const expected: CharJewelSetRow = {
            id: 1,
            name: "Test Jewel",
            rarity2_url: "https://example.com/r2.png",
            rarity3_url: "https://example.com/r3.png",
            rarity4_url: "https://example.com/r4.png",
            created_at: "2024-01-01T00:00:00Z",
            rarity5_url: "https://example.com/r5.png",
            element_id: 7,
        };

        expect(result).toEqual(expected);
    });
});