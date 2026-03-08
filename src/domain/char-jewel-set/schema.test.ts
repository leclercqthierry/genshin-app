import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { describe, it, expect } from "vitest";

describe("charJewelSetSchema", () => {
    const validData = {
        name: "Set Pyro",
        elementId: 1,
        rarity2_url: "https://example.com/r2.png",
        rarity3_url: "https://example.com/r3.png",
        rarity4_url: "https://example.com/r4.png",
        rarity5_url: "https://example.com/r5.png",
    };

    it("valide un set correct", () => {
        const result = charJewelSetSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it("refuse un nom vide", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            name: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.name?.[0])
                .toBe("Nom requis");
        }
    });

    it("refuse un elementId non positif", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            elementId: 0,
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.elementId?.[0])
                .toBe("Élément requis");
        }
    });

    it("refuse une URL invalide pour rarity2_url", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            rarity2_url: "not-a-url",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity2_url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity3_url", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            rarity3_url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity3_url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity4_url", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            rarity4_url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity4_url?.[0])
                .toBe("URL invalide");

        }
    });

    it("refuse une URL invalide pour rarity5_url", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            rarity5_url: "invalid",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.rarity5_url?.[0])
                .toBe("URL invalide");

        }
    });
});