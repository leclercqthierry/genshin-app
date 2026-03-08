import { loginSchema } from "./login";
import { describe, it, expect } from "vitest";

describe("loginSchema", () => {
    const validData = {
        email: "test@example.com",
        password: "secret",
    };

    it("valide des identifiants corrects", () => {
        const result = loginSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    // --- EMAIL ---

    it("refuse un email invalide", () => {
        const result = loginSchema.safeParse({
            ...validData,
            email: "not-an-email",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email?.[0])
                .toBe("Email invalide");
        }
    });

    it("refuse un email vide", () => {
        const result = loginSchema.safeParse({
            ...validData,
            email: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email?.[0])
                .toBe("L'email est obligatoire");
        }
    });

    // --- PASSWORD ---

    it("refuse un mot de passe vide", () => {
        const result = loginSchema.safeParse({
            ...validData,
            password: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password?.[0])
                .toBe("Le mot de passe est obligatoire");
        }
    });
});