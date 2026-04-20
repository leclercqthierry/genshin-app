import { describe, it, expect } from "vitest";
import { makeBaseItemSchema } from '@/lib/utils/make-base-item-schema';
import { zodFieldErrorsSimple } from "@/lib/utils/zod-field-errors-simple";

describe("makeBaseItemSchema", () => {
    it("valide un item correct", () => {
        const schema = makeBaseItemSchema(100);

        const result = schema.safeParse({
            name: "Pyro",
            iconUrl: "https://example.com/icon.png",
        });

        expect(result.success).toBe(true);
    });

    it("rejette un nom trop long selon maxNameLength", () => {
        const schema = makeBaseItemSchema(5);

        const result = schema.safeParse({
            name: "TropLong", // 8 caractères
            iconUrl: "https://example.com/icon.png",
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            const errors = zodFieldErrorsSimple(result.error);
            expect(errors.name?.[0])
                .toBe("Le nom ne peut pas dépasser 5 caractères.");
        }
    });

    it("rejette une URL invalide", () => {
        const schema = makeBaseItemSchema(50);

        const result = schema.safeParse({
            name: "Hydro",
            iconUrl: "not-an-url",
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            const errors = zodFieldErrorsSimple(result.error);
            expect(errors.iconUrl?.[0])
                .toBe("URL d'image invalide.");
        }
    });
});
