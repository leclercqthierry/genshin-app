import { mobDropSetSchema } from "./schema";
import { describe, it, expect } from "vitest";

describe("baseSetSchema", () => {
    const validData = {
        name: "Set",
        rarity1_url: "https://example.com/r1.png",
        rarity2_url: "https://example.com/r2.png",
        rarity3_url: "https://example.com/r3.png",
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

    it("refuse une URL invalide pour rarity1_url", () => {
        const result = mobDropSetSchema.safeParse({
            ...validData,
            rarity1_url: "not-a-url",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity1_url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity2_url", () => {
        const result = mobDropSetSchema.safeParse({
            ...validData,
            rarity2_url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity2_url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity3_url", () => {
        const result = mobDropSetSchema.safeParse({
            ...validData,
            rarity3_url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity3_url?.[0])
                .toBe("URL invalide");

        }
    });
});