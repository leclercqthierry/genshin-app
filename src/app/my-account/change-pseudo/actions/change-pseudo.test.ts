import { describe, it, expect, vi, beforeEach } from "vitest";
import { changePseudo } from "@/app/my-account/change-pseudo/actions/change-pseudo";
import { Mock } from "vitest";

// Mocks
vi.mock("@/services/auth/require-user", () => ({
    requireUser: vi.fn(),
}));

vi.mock("@/lib/supabase/client", () => ({
    createSupabaseClient: vi.fn(),
}));

vi.mock("@/services/supabase/user", () => ({
    updateProfilePseudo: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

import { requireUser } from "@/services/auth/require-user";
import { createSupabaseClient } from "@/lib/supabase/client";
import { updateProfilePseudo } from "@/services/supabase/user";
import { redirect } from "next/navigation";

describe("changePseudo", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("met à jour le pseudo et redirige", async () => {
        (requireUser as Mock).mockResolvedValue({
            user: { id: "123" },
            redirect: false,
        });

        const from = vi.fn().mockReturnValue({
            update: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({ error: null }),
            }),
        });

        (createSupabaseClient as Mock).mockResolvedValue({ from });

        const formData = new FormData();
        formData.set("pseudo", "Toto123");

        await changePseudo(formData);

        expect(updateProfilePseudo).toHaveBeenCalledWith(
            { from },
            "123",
            "Toto123"
        );

        expect(redirect).toHaveBeenCalledWith("/my-account");
    });

    it("retourne une erreur si pseudo vide", async () => {
        (requireUser as Mock).mockResolvedValue({
            user: { id: "123" },
            redirect: false,
        });

        const formData = new FormData();
        formData.set("pseudo", "");

        const result = await changePseudo(formData);

        expect(result).toEqual({
            success: false,
            error: "Pseudo invalide",
        });
    });

    it("throw si pseudo invalide (Zod)", async () => {
        (requireUser as Mock).mockResolvedValue({
            user: { id: "123" },
            redirect: false,
        });

        const formData = new FormData();
        formData.set("pseudo", "!!");

        await expect(changePseudo(formData)).rejects.toThrow(
            "Le pseudo doit contenir au moins 3 caractères."
        );
    });

    it("throw si utilisateur non authentifié", async () => {
        (requireUser as Mock).mockResolvedValue({
            user: undefined,
            redirect: false,
        });

        const formData = new FormData();
        formData.set("pseudo", "Toto123");

        await expect(changePseudo(formData)).rejects.toThrow(
            "Utilisateur non authentifié"
        );
    });
});
