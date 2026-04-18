import { baseSetSchema } from "./schema";
import { describe, it, expect } from "vitest";

describe("baseSetSchema", () => {
    const validData = {
        name: "Set",
        rarity2Url: "https://example.com/r2.png",
        rarity3Url: "https://example.com/r3.png",
        rarity4Url: "https://example.com/r4.png",
    };

    it("valide un set correct", () => {
        const result = baseSetSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it("refuse un nom vide", () => {
        const result = baseSetSchema.safeParse({
            ...validData,
            name: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.name?.[0])
                .toBe("Nom requis");
        }
    });

    it("refuse une URL invalide pour rarity2_url", () => {
        const result = baseSetSchema.safeParse({
            ...validData,
            rarity2Url: "not-a-url",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity2Url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity3_url", () => {
        const result = baseSetSchema.safeParse({
            ...validData,
            rarity3Url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity3Url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity4_url", () => {
        const result = baseSetSchema.safeParse({
            ...validData,
            rarity4Url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity4Url?.[0])
                .toBe("URL invalide");

        }
    });
});