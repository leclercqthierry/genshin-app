import { forgotPasswordSchema } from "./forgot-password";
import { describe, it, expect } from "vitest";

describe("forgotPasswordSchema", () => {
    const validData = {
        email: "test@example.com",
    };

    it("valide un email correct", () => {
        const result = forgotPasswordSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(validData);
        }
    });

    it("refuse un email vide", () => {
        const result = forgotPasswordSchema.safeParse({
            email: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email?.[0])
                .toBe("L'email est obligatoire");
        }
    });

    it("refuse un email invalide", () => {
        const result = forgotPasswordSchema.safeParse({
            email: "not-an-email",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.flatten().fieldErrors.email?.[0])
                .toBe("Email invalide");
        }
    });
});