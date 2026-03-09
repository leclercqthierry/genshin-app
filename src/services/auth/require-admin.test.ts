import { describe, it, expect, vi, beforeEach } from "vitest";
import { requireAdmin } from "./require-admin";

vi.mock("@/lib/supabase/client-read-only");
vi.mock("@/services/supabase/user");

import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import { getProfile } from "@/services/supabase/user";

describe("requireAdmin", () => {
    const mockGetUser = vi.fn();
    const mockGetProfile = getProfile as unknown as {
        mockResolvedValue: (value: unknown) => unknown;
    };

    beforeEach(() => {
        vi.clearAllMocks();

        (createSupabaseClientReadOnly as unknown as {
            mockResolvedValue: (value: unknown) => unknown;
        }).mockResolvedValue({
            auth: { getUser: mockGetUser },
        });
    });

    it("redirect si erreur auth", async () => {
        mockGetUser.mockResolvedValue({
            data: { user: null },
            error: { message: "err" },
        });

        const result = await requireAdmin();
        expect(result).toEqual({ redirect: true });
    });

    it("redirect si pas d'utilisateur", async () => {
        mockGetUser.mockResolvedValue({
            data: { user: null },
            error: null,
        });

        const result = await requireAdmin();
        expect(result).toEqual({ redirect: true });
    });

    it("redirect si profil introuvable", async () => {
        mockGetUser.mockResolvedValue({
            data: { user: { id: "123" } },
            error: null,
        });

        mockGetProfile.mockResolvedValue(null);

        const result = await requireAdmin();
        expect(result).toEqual({ redirect: true });
    });

    it("redirect si rôle ≠ admin", async () => {
        mockGetUser.mockResolvedValue({
            data: { user: { id: "123" } },
            error: null,
        });

        mockGetProfile.mockResolvedValue({
            id: "p1",
            pseudo: "x",
            role: "user",
        });

        const result = await requireAdmin();
        expect(result).toEqual({ redirect: true });
    });

    it("retourne user + profile si admin", async () => {
        const user = { id: "123" };

        mockGetUser.mockResolvedValue({
            data: { user },
            error: null,
        });

        mockGetProfile.mockResolvedValue({
            id: "p1",
            pseudo: "x",
            role: "admin",
        });

        const result = await requireAdmin();
        expect(result).toEqual({
            user,
            profile: { id: "p1", pseudo: "x", role: "admin" },
        });
    });

    it("redirect si erreur inattendue", async () => {
        (createSupabaseClientReadOnly as unknown as {
            mockRejectedValue: (value: unknown) => unknown;
        }).mockRejectedValue(new Error("boom"));

        const result = await requireAdmin();
        expect(result).toEqual({ redirect: true });
    });
});