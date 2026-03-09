import { vi } from "vitest";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

vi.mock("@/lib/supabase/service", () => ({
    createSupabaseServiceClient: vi.fn(),
}));

import { handleForgotPassword } from "./forgot-password";
import { ForgotPasswordFormState } from "@/app/auth/forgot-password/types";

describe("ForgotPassword", () => {

    it("retourne une erreur de validation si l'email est invalide", async () => {
        const formData = new FormData();
        formData.set("email", ""); // ou "invalid"

        const result = await handleForgotPassword({} as ForgotPasswordFormState, formData);

        expect(result.success).toBe(false);
        expect(result.errors.email).toBeDefined();
    });

    it("retourne une erreur métier si Supabase échoue", async () => {
        const mockClient = {
            auth: {
                resetPasswordForEmail: vi.fn().mockResolvedValue({
                    error: { message: "Erreur Supabase" },
                }),
            },
        } as Partial<ReturnType<typeof createSupabaseServiceClient>>;

        vi.mocked(createSupabaseServiceClient).mockResolvedValue(mockClient as never);

        const formData = new FormData();
        formData.set("email", "test@example.com");

        const result = await handleForgotPassword({} as ForgotPasswordFormState, formData);

        expect(result.success).toBe(false);
        expect(result.message).toContain("Erreur");
    });

    it("retourne success=true quand Supabase réussit", async () => {
        const mockClient = {
            auth: {
                resetPasswordForEmail: vi.fn().mockResolvedValue({ error: null }),
            },
        } as Partial<ReturnType<typeof createSupabaseServiceClient>>;

        vi.mocked(createSupabaseServiceClient).mockResolvedValue(mockClient as never);

        const formData = new FormData();
        formData.set("email", "test@example.com");

        const result = await handleForgotPassword({} as ForgotPasswordFormState, formData);

        expect(result.success).toBe(true);
        expect(result.message).toBeDefined();
    });

    it("retourne une erreur générique en cas d'exception", async () => {
        vi.mocked(createSupabaseServiceClient).mockRejectedValue(new Error("Boom"));

        const formData = new FormData();
        formData.set("email", "test@example.com");

        const result = await handleForgotPassword({} as ForgotPasswordFormState, formData);

        expect(result.success).toBe(false);
        expect(result.message).toContain("inattendue");
    });
});