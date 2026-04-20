import { charJewelSetSchema } from "@/domain/char-jewel-set/schema";
import { describe, it, expect } from "vitest";
import { zodFieldErrorsSimple } from "@/lib/utils/zod-field-errors-simple";

describe("charJewelSetSchema", () => {
    const validData = {
        name: "Set",
        elementId: 1,
        rarity2Url: "https://example.com/r2.png",
        rarity3Url: "https://example.com/r3.png",
        rarity4Url: "https://example.com/r4.png",
        rarity5Url: "https://example.com/r5.png",
    };

    it("refuse un elementId non positif", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            elementId: 0,
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            const errors = zodFieldErrorsSimple(result.error);
            expect(errors.elementId?.[0]).toBe("Élément requis");
        }
    });

    it("refuse une URL invalide pour rarity5Url", () => {
        const result = charJewelSetSchema.safeParse({
            ...validData,
            rarity5Url: "invalid",
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            const errors = zodFieldErrorsSimple(result.error);
            expect(errors.rarity5Url?.[0]).toBe("URL invalide");
        }
    });
});
