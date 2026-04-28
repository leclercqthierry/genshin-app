import { describe, it, expect } from "vitest";
import { changePseudoSchema } from './schema';

describe("changePseudoSchema", () => {
    it("accepte un pseudo valide", () => {
        const result = changePseudoSchema.safeParse("Toto123");
        expect(result.success).toBe(true);
    });

    it("refuse un pseudo trop court", () => {
        const result = changePseudoSchema.safeParse("ab");
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message)
            .toBe("Le pseudo doit contenir au moins 3 caractères.");
    });

    it("refuse un pseudo trop long", () => {
        const result = changePseudoSchema.safeParse("A".repeat(21));
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message)
            .toBe("Le pseudo ne peut pas dépasser 20 caractères.");
    });

    it("refuse un pseudo avec caractères spéciaux", () => {
        const result = changePseudoSchema.safeParse("Toto!");
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message)
            .toBe("Le pseudo ne peut contenir que des lettres et des chiffres.");
    });
});
