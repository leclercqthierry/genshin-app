import { elementSchema } from "@/domain/element/schema";
import { describe, it, expect } from "vitest";

describe("elementSchema", () => {
    it("valide un élément correct", () => {
        const data = {
            name: "Pyro",
            icon_url: "https://example.com/icon.png",
        };

        const result = elementSchema.safeParse(data);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(data);
        }
    });

    it("refuse un nom vide", () => {
        const result = elementSchema.safeParse({
            name: "",
            icon_url: "https://example.com/icon.png",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.name?.[0])
                .toBe("Le nom est requis.");
        }
    });

    it("refuse un nom trop long", () => {
        const result = elementSchema.safeParse({
            name: "a".repeat(51),
            icon_url: "https://example.com/icon.png",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.name?.[0])
                .toBe("Le nom ne peut pas dépasser 50 caractères.");
        }
    });

    it("refuse une URL invalide", () => {
        const result = elementSchema.safeParse({
            name: "Pyro",
            icon_url: "not-a-url",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.icon_url?.[0])
                .toBe("URL d'image invalide.");
        }
    });
});