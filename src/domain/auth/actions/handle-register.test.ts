// 🔥 On mocke ce qui doit l’être
vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

vi.mock("@/lib/supabase/service", () => ({
    createSupabaseServiceClient: vi.fn(),
}));

vi.mock("@/lib/supabase/client", () => ({
    createSupabaseClient: vi.fn(),
}));

vi.mock("@/domain/auth/logic/register-user", () => ({
    registerUser: vi.fn(),
}));
import { vi, describe, it, expect, Mock } from "vitest";
import { handleRegister } from "@/domain/auth/actions/handle-register";
import { registerUser } from "@/domain/auth/logic/register-user";
import { redirect } from "next/navigation";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClient } from "@/lib/supabase/client";

describe("handleRegister (integration)", () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("redirige en cas de succès", async () => {
        // Mock service client
        const serviceClient = {
            auth: {
                signUp: vi.fn().mockResolvedValue({
                    data: { user: { id: "123" } },
                    error: null,
                }),
            },
        };

        (createSupabaseServiceClient as unknown as Mock).mockResolvedValue(serviceClient);

        // Mock client public
        const writeClient = {
            from: vi.fn(),
        };

        (createSupabaseClient as unknown as Mock).mockResolvedValue(writeClient);

        // Mock registerUser → succès
        (registerUser as Mock).mockResolvedValue({
            success: true,
            errors: {},
            message: "ok",
        });

        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "Password123?");
        formData.append("password2", "Password123?");
        formData.append("pseudo", "toto");

        await handleRegister({ success: false, errors: {}, message: null }, formData);

        expect(registerUser).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith("/auth/email-sent");
    });

    it("retourne l’erreur si registerUser échoue", async () => {
        const serviceClient = {
            auth: {
                signUp: vi.fn().mockResolvedValue({
                    data: { user: { id: "123" } },
                    error: null,
                }),
            },
        };

        (createSupabaseServiceClient as unknown as Mock).mockResolvedValue(serviceClient);

        const writeClient = {
            from: vi.fn(),
        };

        (createSupabaseClient as unknown as Mock).mockResolvedValue(writeClient);

        // Mock registerUser → échec
        const errorResult = {
            success: false,
            errors: { email: ["déjà pris"] },
            message: "Impossible",
        };

        (registerUser as Mock).mockResolvedValue(errorResult);

        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "Password123?");
        formData.append("password2", "Password123?");
        formData.append("pseudo", "toto");

        const result = await handleRegister({ success: false, errors: {}, message: null }, formData);

        expect(result).toEqual(errorResult);
        expect(redirect).not.toHaveBeenCalled();
    });
});