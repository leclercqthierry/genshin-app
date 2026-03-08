import { registerSchema } from "./register";
import { describe, it, expect } from "vitest";

describe("registerSchema", () => {
    const validData = {
        pseudo: "Thierry123",
        email: "test@example.com",
        password: "Password123!",
        password2: "Password123!",
    };

    it("valide un utilisateur correct", () => {
        const result = registerSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    // --- PSEUDO ---

    it("refuse un pseudo trop court", () => {
        const result = registerSchema.safeParse({
            ...validData,
            pseudo: "ab",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.pseudo?.[0])
                .toBe("Le pseudo doit contenir au moins 3 caractères.");
        }
    });

    it("refuse un pseudo trop long", () => {
        const result = registerSchema.safeParse({
            ...validData,
            pseudo: "a".repeat(21),
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.pseudo?.[0])
                .toBe("Le pseudo ne peut pas dépasser 20 caractères.");
        }
    });

    it("refuse un pseudo avec caractères spéciaux", () => {
        const result = registerSchema.safeParse({
            ...validData,
            pseudo: "Thierry!",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.pseudo?.[0])
                .toBe("Le pseudo ne peut contenir que des lettres et des chiffres.");
        }
    });

    // --- EMAIL ---

    it("refuse un email invalide", () => {
        const result = registerSchema.safeParse({
            ...validData,
            email: "not-an-email",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email?.[0])
                .toBe("Format d'email invalide.");
        }
    });

    it("refuse un email trop long", () => {
        const result = registerSchema.safeParse({
            ...validData,
            email: "a".repeat(255) + "@example.com",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email?.[0])
                .toBe("L'email est trop long.");
        }
    });

    // --- PASSWORD ---

    it("refuse un mot de passe trop court", () => {
        const result = registerSchema.safeParse({
            ...validData,
            password: "Short1!",
            password2: "Short1!",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password?.[0])
                .toBe("Le mot de passe doit contenir au moins 12 caractères.");
        }
    });

    it("refuse un mot de passe sans majuscule", () => {
        const result = registerSchema.safeParse({
            ...validData,
            password: "password123!",
            password2: "password123!",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password?.[0])
                .toBe("Le mot de passe doit contenir au moins une majuscule.");
        }
    });

    it("refuse un mot de passe sans minuscule", () => {
        const result = registerSchema.safeParse({
            ...validData,
            password: "PASSWORD123!",
            password2: "PASSWORD123!",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password?.[0])
                .toBe("Le mot de passe doit contenir au moins une minuscule.");
        }
    });

    it("refuse un mot de passe sans chiffre", () => {
        const result = registerSchema.safeParse({
            ...validData,
            password: "Password!!!!", // 12 caractères, maj, min, spécial, mais PAS de chiffre
            password2: "Password!!!!",
        });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password?.[0])
                .toBe("Le mot de passe doit contenir au moins un chiffre.");
        }
    });

    it("refuse un mot de passe sans caractère spécial", () => {
        const result = registerSchema.safeParse({
            ...validData,
            password: "Password1234", // 12 caractères, maj, min, chiffres, mais PAS de spécial
            password2: "Password1234",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password?.[0])
                .toBe("Le mot de passe doit contenir au moins un caractère spécial.");
        }
    });

    // --- CONFIRMATION ---

    it("refuse lorsque les mots de passe ne correspondent pas", () => {
        const result = registerSchema.safeParse({
            ...validData,
            password2: "Different123!",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.password2?.[0])
                .toBe("Les mots de passe ne correspondent pas.");
        }
    });
});