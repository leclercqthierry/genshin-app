import { describe, it, expect } from "vitest";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";

describe("extractErrorMessage", () => {
    it("retourne le message d'une instance Error", () => {
        const err = new Error("Oups");
        expect(extractErrorMessage(err)).toBe("Oups");
    });

    it("retourne la string brute si l'erreur est une string", () => {
        expect(extractErrorMessage("Erreur simple")).toBe("Erreur simple");
    });

    it("retourne le message par défaut pour les valeurs non gérables", () => {
        const invalidValues: unknown[] = [null, undefined, 42, {}, [], true];

        for (const value of invalidValues) {
            expect(extractErrorMessage(value)).toBe("Une erreur inattendue est survenue.");
        }
    });
});