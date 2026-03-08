import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    type Mock,
} from "vitest";

import { handleResetPassword } from "@/domain/auth/actions/reset-password";
import { createSupabaseServiceClient } from "@/lib/utils/supabase/service";
import type { ResetPasswordFormState } from "@/app/auth/reset-password/types";

vi.mock("@/lib/utils/supabase/service");

describe("handleResetPassword", () => {
    const prevState: ResetPasswordFormState = {
        success: false,
        errors: {},
        redirect: false,
    };

    const mockUpdateUser = vi.fn();

    type FakeAuthError = Partial<{
        message: string;
        code: string;
        status: number;
        name: string;
        __isAuthError: boolean;
    }>;

    function mockSupabase(error: FakeAuthError | null = null) {
        (createSupabaseServiceClient as Mock).mockResolvedValue({
            auth: {
                updateUser: mockUpdateUser.mockResolvedValue({ error }),
            },
        });
    }


    function makeFormData(data: Record<string, string>) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(data)) fd.append(k, v);
        return fd;
    }

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne une structure d'erreur si la validation échoue", async () => {
        const formData = makeFormData({
            password: "abc",
            password2: "abc",
        });

        const result = await handleResetPassword(prevState, formData);

        expect(result.success).toBe(false);
        expect(result.redirect).toBe(false);
        expect(result.errors).toBeDefined();
    });

    it("retourne une erreur si Supabase échoue", async () => {
        mockSupabase({ message: "Erreur Supabase" });

        const formData = makeFormData({
            password: "abcdef",
            password2: "abcdef",
        });

        const result = await handleResetPassword(prevState, formData);

        expect(result.success).toBe(false);
        expect(result.redirect).toBe(false);
        expect(result.message).toBe("Erreur Supabase");
    });

    it("met à jour le mot de passe en cas de succès", async () => {
        mockSupabase(null);

        const formData = makeFormData({
            password: "abcdef",
            password2: "abcdef",
        });

        const result = await handleResetPassword(prevState, formData);

        expect(mockUpdateUser).toHaveBeenCalledWith({
            password: "abcdef",
        });

        expect(result.success).toBe(true);
        expect(result.redirect).toBe(true);
        expect(result.message).toBe("Mot de passe mis à jour avec succès !");
    });

    it("gère les erreurs inattendues", async () => {
        (createSupabaseServiceClient as Mock).mockRejectedValue(
            new Error("Boom")
        );

        const formData = makeFormData({
            password: "abcdef",
            password2: "abcdef",
        });

        const result = await handleResetPassword(prevState, formData);

        expect(result.success).toBe(false);
        expect(result.message).toBe("Une erreur inattendue est survenue.");
    });
});