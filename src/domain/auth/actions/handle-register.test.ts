import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleRegister } from "./handle-register";
import { redirect } from "next/navigation";

// Mock redirect
vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

// Mock registerUser
vi.mock("../logic/register-user", () => ({
    registerUser: vi.fn(),
}));

// Mock Supabase service client
vi.mock("@/lib/utils/supabase/service", () => ({
    createSupabaseServiceClient: vi.fn(() => ({
        auth: {
            signUp: vi.fn(),
        },
    })),
}));

import { registerUser } from "../logic/register-user";

const mockedRegisterUser = vi.mocked(registerUser);

describe("handleRegister", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne des erreurs de validation si le formulaire est invalide", async () => {
        const formData = new FormData();
        formData.append("email", "invalid");
        formData.append("password", "short");
        formData.append("password2", "mismatch");
        formData.append("pseudo", "");

        const result = await handleRegister(
            { success: false, errors: {}, message: null },
            formData
        );

        expect(result.success).toBe(false);
        expect(result.errors.email).toBeDefined();
    });

    it("retourne une erreur si registerUser échoue", async () => {
        const formData = new FormData();
        formData.append("email", "test@example.com");
        formData.append("password", "Password123?");
        formData.append("password2", "Password123?");
        formData.append("pseudo", "Thierry");

        mockedRegisterUser.mockResolvedValue({
            success: false,
            errors: {},
            message: "Email déjà utilisé",
        });

        const result = await handleRegister(
            { success: false, errors: {}, message: null },
            formData
        );

        expect(result.success).toBe(false);
        expect(result.message).toBe("Email déjà utilisé");
    });

    it("redirige en cas de succès", async () => {
        const formData = new FormData();
        formData.append("email", "test@example.com");
        formData.append("password", "Password123?");
        formData.append("password2", "Password123?");
        formData.append("pseudo", "Thierry");

        mockedRegisterUser.mockResolvedValue({
            success: true,
            errors: {},
            message: null,
        });

        await handleRegister(
            { success: false, errors: {}, message: null },
            formData
        );

        expect(redirect).toHaveBeenCalledWith("/auth/email-sent");
    });
});