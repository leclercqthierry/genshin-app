import { describe, it, expect } from "vitest";
import { makeBaseItemSchema } from '@/lib/utils/make-base-item-schema';

describe("makeBaseItemSchema", () => {
    it("valide un item correct", () => {
        const schema = makeBaseItemSchema(100);

        const result = schema.safeParse({
            name: "Pyro",
            icon_url: "https://example.com/icon.png",
        });

        expect(result.success).toBe(true);
    });

    it("rejette un nom trop long selon maxNameLength", () => {
        const schema = makeBaseItemSchema(5);

        const result = schema.safeParse({
            name: "TropLong", // 8 caractères
            icon_url: "https://example.com/icon.png",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.name?.[0])
            .toBe("Le nom ne peut pas dépasser 5 caractères.");
    });

    it("rejette une URL invalide", () => {
        const schema = makeBaseItemSchema(50);

        const result = schema.safeParse({
            name: "Hydro",
            icon_url: "not-an-url",
        });

        expect(result.success).toBe(false);
        expect(result.error?.flatten().fieldErrors.icon_url?.[0])
            .toBe("URL d'image invalide.");
    });
});