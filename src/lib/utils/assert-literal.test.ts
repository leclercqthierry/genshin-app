import { assertLiteral } from "@/lib/utils/assert-literal";

describe("assertLiteral", () => {
    const ALLOWED = ["Épée", "Arc", "Claymore"] as const;

    it("retourne la valeur si elle est autorisée", () => {
        const result = assertLiteral("Arc", ALLOWED);
        expect(result).toBe("Arc");
    });

    it("lance une erreur si la valeur n'est pas autorisée", () => {
        expect(() => assertLiteral("Bâton", ALLOWED)).toThrow(
            "Valeur littérale invalide: Bâton"
        );
    });

    it("lance une erreur avec un message explicite", () => {
        try {
            assertLiteral("Truc", ALLOWED);
        } catch (e: unknown) {
            if (e instanceof Error) {
                expect(e.message).toContain("Truc");
                expect(e.message).toContain("Valeur littérale invalide");
            } else {
                throw new Error("Erreur inattendue");
            }
        }
    });
});
