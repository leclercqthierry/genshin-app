import { describe, it, expect, vi } from "vitest";
import { registerUser } from './register-user';

describe("registerUser", () => {
    it("retourne une erreur si signUp échoue", async () => {
        const deps = {
            signUp: vi.fn().mockResolvedValue({ userId: null, error: "Erreur Supabase" }),
            createProfile: vi.fn(),
            deleteUser: vi.fn(),
        };

        const result = await registerUser(deps, {
            email: "john@example.com",
            password: "abcdef",
            pseudo: "John",
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe("Erreur Supabase");
    });

    it("rollback si createProfile échoue", async () => {
        const deps = {
            signUp: vi.fn().mockResolvedValue({ userId: "123", error: null }),
            createProfile: vi.fn().mockResolvedValue("error"),
            deleteUser: vi.fn().mockResolvedValue(undefined),
        };

        const result = await registerUser(deps, {
            email: "john@example.com",
            password: "abcdef",
            pseudo: "John",
        });

        expect(deps.createProfile).toHaveBeenCalledWith("123", "John");
        expect(deps.deleteUser).toHaveBeenCalledWith("123");
        expect(result.success).toBe(false);
        expect(result.message).toBe("Impossible de créer le profil utilisateur");
    });

    it("retourne un succès complet", async () => {
        const deps = {
            signUp: vi.fn().mockResolvedValue({ userId: "123", error: null }),
            createProfile: vi.fn().mockResolvedValue("ok"),
            deleteUser: vi.fn(),
        };

        const result = await registerUser(deps, {
            email: "john@example.com",
            password: "abcdef",
            pseudo: "John",
        });

        expect(result.success).toBe(true);
        expect(result.errors).toEqual({});
    });
});