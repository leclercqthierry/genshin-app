import { bossDropSchema } from "@/domain/boss-drop/schema";
import { describe, it, expect } from "vitest";

describe("bossDropSchema", () => {
    const validData = {
        name: "Golem de pierre",
        icon_url: "https://example.com/icon.png",
    };

    it("valide un boss drop correct", () => {
        const result = bossDropSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it("refuse un nom vide", () => {
        const result = bossDropSchema.safeParse({
            ...validData,
            name: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.name?.[0])
                .toBe("Le nom est requis.");
        }
    });

    it("refuse un nom trop long", () => {
        const result = bossDropSchema.safeParse({
            ...validData,
            name: "a".repeat(101),
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.name?.[0])
                .toBe("Le nom ne peut pas dépasser 100 caractères.");
        }
    });

    it("refuse une URL invalide", () => {
        const result = bossDropSchema.safeParse({
            ...validData,
            icon_url: "not-a-url",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.icon_url?.[0])
                .toBe("URL d'image invalide.");
        }
    });
});