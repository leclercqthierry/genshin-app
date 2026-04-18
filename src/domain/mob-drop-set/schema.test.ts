import { mobDropSetSchema } from "./schema";
import { describe, it, expect } from "vitest";

describe("baseSetSchema", () => {
    const validData = {
        name: "Set",
        rarity1Url: "https://example.com/r1.png",
        rarity2Url: "https://example.com/r2.png",
        rarity3Url: "https://example.com/r3.png",
    };

    it("valide un set correct", () => {
        const result = mobDropSetSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it("refuse un nom vide", () => {
        const result = mobDropSetSchema.safeParse({
            ...validData,
            name: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.name?.[0])
                .toBe("Nom requis");
        }
    });

    it("refuse une URL invalide pour rarity1Url", () => {
        const result = mobDropSetSchema.safeParse({
            ...validData,
            rarity1Url: "not-a-url",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity1Url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity2Url", () => {
        const result = mobDropSetSchema.safeParse({
            ...validData,
            rarity2Url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity2Url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity3Url", () => {
        const result = mobDropSetSchema.safeParse({
            ...validData,
            rarity3Url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity3Url?.[0])
                .toBe("URL invalide");

        }
    });
});