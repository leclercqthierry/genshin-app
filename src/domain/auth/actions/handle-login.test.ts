import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";

// 🧨 TOUS LES MOCKS AVANT TOUT IMPORT
vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

const signInWithPassword = vi.fn();

vi.mock("@/lib/utils/supabase/service", () => ({
    createSupabaseServiceClient: vi.fn(() => ({
        auth: {
            signInWithPassword,
        },
    })),
}));

vi.mock("@/services/supabase/user", () => ({
    getProfile: vi.fn(),
}));

// Maintenant seulement on importe
import { handleLogin } from "./handle-login";
import { redirect } from "next/navigation";
import { createSupabaseServiceClient } from "@/lib/utils/supabase/service";
import { getProfile } from "@/services/supabase/user";

const mockedGetProfile = vi.mocked(getProfile);

describe("handleLogin", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne des erreurs de validation si le formulaire est invalide", async () => {
        const formData = new FormData();
        formData.append("email", "invalid");
        formData.append("password", "");

        const result = await handleLogin(
            { success: false, errors: {}, message: null, role: null },
            formData
        );

        expect(result.success).toBe(false);
        expect(result.errors.email).toBeDefined();
    });

    it("retourne une erreur si Supabase échoue", async () => {
        const supabase = await createSupabaseServiceClient();

        const signIn = supabase.auth
            .signInWithPassword as unknown as Mock;

        signIn.mockResolvedValue({
            data: { user: null },
            error: { message: "Identifiants incorrects" },
        });

        const formData = new FormData();
        formData.append("email", "test@example.com");
        formData.append("password", "wrong");

        const result = await handleLogin(
            { success: false, errors: {}, message: null, role: null },
            formData
        );

        expect(result.success).toBe(false);
        expect(result.message).toBe("Identifiants incorrects");
    });

    it("retourne une erreur si le profil est introuvable", async () => {
        const supabase = await createSupabaseServiceClient();

        const signIn = supabase.auth
            .signInWithPassword as unknown as Mock;

        signIn.mockResolvedValue({
            data: { user: { id: "123" } },
            error: null,
        });

        mockedGetProfile.mockResolvedValue(null);

        const formData = new FormData();
        formData.append("email", "test@example.com");
        formData.append("password", "Password123?");

        const result = await handleLogin(
            { success: false, errors: {}, message: null, role: null },
            formData
        );

        expect(result.success).toBe(false);
        expect(result.message).toBe("Profil utilisateur introuvable");
    });

    it("redirige vers /admin si l'utilisateur est admin", async () => {
        const supabase = await createSupabaseServiceClient();

        const signIn = supabase.auth
            .signInWithPassword as unknown as Mock;

        signIn.mockResolvedValue({
            data: { user: { id: "123" } },
            error: null,
        });

        mockedGetProfile.mockResolvedValue({
            id: "123",
            pseudo: "Thierry",
            role: "admin",
        });

        const formData = new FormData();
        formData.append("email", "admin@example.com");
        formData.append("password", "Password123?");

        await handleLogin(
            { success: true, errors: {}, message: null, role: "admin" },
            formData
        );

        expect(redirect).toHaveBeenCalledWith("/admin");
    });

    it("redirige vers /my-account si l'utilisateur est user", async () => {
        const supabase = await createSupabaseServiceClient();

        const signIn = supabase.auth
            .signInWithPassword as unknown as Mock;

        signIn.mockResolvedValue({
            data: { user: { id: "123" } },
            error: null,
        });

        mockedGetProfile.mockResolvedValue({
            id: "123",
            pseudo: "Thierry",
            role: "user",
        });

        const formData = new FormData();
        formData.append("email", "user@example.com");
        formData.append("password", "Password123?");

        await handleLogin(
            { success: true, errors: {}, message: null, role: "user" },
            formData
        );

        expect(redirect).toHaveBeenCalledWith("/my-account");
    });
});