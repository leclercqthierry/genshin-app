import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleRegister } from "@/domain/auth/actions/handle-register";
import { createSupabaseServiceClient } from "@/lib/utils/supabase/service";
import { createProfile, deleteUser } from "@/services/supabase/user";

vi.mock("@/lib/utils/supabase/service");
vi.mock("@/services/supabase/user");

function makeFormData(data: Record<string, string>) {
    const fd = new FormData();
    for (const [k, v] of Object.entries(data)) fd.append(k, v);
    return fd;
}

describe("handleRegister (integration)", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne des erreurs de validation si les données sont invalides", async () => {
        const formData = makeFormData({
            pseudo: "",
            email: "invalid",
            password: "short",
            password2: "short",
        });

        const result = await handleRegister({ success: false, errors: {}, message: null }, formData);

        expect(result.success).toBe(false);
        expect(result.errors).toBeDefined();
    });

    it("retourne une erreur si Supabase signUp échoue", async () => {
        const signUp = vi.fn().mockResolvedValue({
            data: { user: null },
            error: { message: "Erreur Supabase" },
        });

        (createSupabaseServiceClient as unknown as {
            mockResolvedValue: (value: unknown) => unknown;
        }).mockResolvedValue({
            auth: { signUp },
        });

        const formData = makeFormData({
            pseudo: "John",
            email: "john@example.com",
            password: "Password123!",
            password2: "Password123!",
        });

        const result = await handleRegister({ success: false, errors: {}, message: null }, formData);

        expect(result.success).toBe(false);
        expect(result.message).toBe("Erreur Supabase");
        expect(signUp).toHaveBeenCalled();
    });

    it("rollback si createProfile échoue", async () => {
        const signUp = vi.fn().mockResolvedValue({
            data: { user: { id: "123" } },
            error: null,
        });

        (createSupabaseServiceClient as unknown as {
            mockResolvedValue: (value: unknown) => unknown;
        }).mockResolvedValue({
            auth: { signUp },
        });

        (createProfile as unknown as {
            mockRejectedValue: (value: unknown) => unknown;
        }).mockRejectedValue(new Error("Boom"));

        (deleteUser as unknown as {
            mockResolvedValue: (value: unknown) => unknown;
        }).mockResolvedValue(undefined);

        const formData = makeFormData({
            pseudo: "John",
            email: "john@example.com",
            password: "Password123!",
            password2: "Password123!",
        });

        const result = await handleRegister({ success: false, errors: {}, message: null }, formData);

        expect(createProfile).toHaveBeenCalledWith("123", "John");
        expect(deleteUser).toHaveBeenCalledWith("123");
        expect(result.success).toBe(false);
        expect(result.message).toBe("Impossible de créer le profil utilisateur");
    });

});