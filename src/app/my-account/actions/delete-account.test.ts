import { describe, it, expect, vi, beforeEach } from "vitest";
import { Mock } from "vitest";

// Mocks
vi.mock("@/services/auth/require-user", () => ({
    requireUser: vi.fn(),
}));

vi.mock("@/lib/supabase/client", () => ({
    createSupabaseClient: vi.fn(),
}));

vi.mock("@/lib/supabase/service", () => ({
    createSupabaseServiceClient: vi.fn(),
}));

vi.mock("@/services/supabase/user", () => ({
    deleteProfile: vi.fn(),
    deleteUser: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

import { requireUser } from "@/services/auth/require-user";
import { createSupabaseClient } from "@/lib/supabase/client";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { deleteProfile, deleteUser } from "@/services/supabase/user";
import { redirect } from "next/navigation";
import { deleteAccount } from "./delete-account"

describe("deleteAccount", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("supprime le compte et redirige", async () => {
        // 1. Mock requireUser
        (requireUser as Mock).mockResolvedValue({
            user: { id: "123" },
            redirect: false,
        });

        // 2. Mock write client
        const signOut = vi.fn().mockResolvedValue(undefined);
        const from = vi.fn().mockReturnValue({
            delete: vi.fn(),
        });

        const writeClient = {
            from,
            auth: { signOut },
        };

        (createSupabaseClient as Mock).mockResolvedValue(writeClient);

        // 3. Mock service client
        const serviceClient = { from: vi.fn() };
        (createSupabaseServiceClient as Mock).mockResolvedValue(serviceClient);

        // 4. Exécuter l'action
        await deleteAccount();

        // 5. Vérifications
        expect(deleteProfile).toHaveBeenCalledWith(writeClient, "123");
        expect(deleteUser).toHaveBeenCalledWith(serviceClient, "123");
        expect(signOut).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith("/delete-account-success");
    });

    it("throw si utilisateur non authentifié", async () => {
        (requireUser as Mock).mockResolvedValue({
            user: undefined,
            redirect: false,
        });

        await expect(deleteAccount()).rejects.toThrow(
            "Utilisateur non authentifié"
        );
    });
});
