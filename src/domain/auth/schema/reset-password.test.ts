import { resetPasswordSchema } from "./reset-password";
import { describe, it, expect } from "vitest";

describe("resetPasswordSchema", () => {
    const validData = {
        password: "abcdef",
        password2: "abcdef",
    };

    it("valide un mot de passe correct et correspondant", () => {
        const result = resetPasswordSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it("refuse un mot de passe trop court", () => {
        const result = resetPasswordSchema.safeParse({
            password: "abc",
            password2: "abc",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password?.[0])
                .toBe("Le mot de passe doit contenir au moins 6 caractères.");
        }
    });

    it("refuse lorsque les mots de passe ne correspondent pas", () => {
        const result = resetPasswordSchema.safeParse({
            password: "abcdef",
            password2: "ghijkl",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password2?.[0])
                .toBe("Les mots de passe ne correspondent pas.");
        }
    });
});