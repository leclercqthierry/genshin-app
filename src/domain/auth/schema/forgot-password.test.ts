import { forgotPasswordSchema } from "./forgot-password";
import { describe, it, expect } from "vitest";
import { zodFieldErrorsSimple } from "@/lib/utils/zod-field-errors-simple";

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
            const errors = zodFieldErrorsSimple(result.error);
            expect(errors.email?.[0]).toBe("L'email est obligatoire");
        }
    });

    it("refuse un email invalide", () => {
        const result = forgotPasswordSchema.safeParse({
            email: "not-an-email",
        });

        expect(result.success).toBe(false);

        if (!result.success) {
            const errors = zodFieldErrorsSimple(result.error);
            expect(errors.email?.[0]).toBe("Email invalide");
        }
    });
});
