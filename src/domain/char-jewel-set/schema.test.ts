import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { describe, it, expect } from "vitest";

// Ici uniquement ce qui est spécifique à charJewelSet
describe("charJewelSetSchema", () => {
    const validData = {
        name: "Set",
        elementId: 1,
        rarity2_url: "https://example.com/r2.png",
        rarity3_url: "https://example.com/r3.png",
        rarity4_url: "https://example.com/r4.png",
        rarity5_url: "https://example.com/r5.png",
    };

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