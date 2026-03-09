import { createProfile, getProfile, deleteProfile, deleteUser } from "@/services/supabase/user";
import type { ClientWrite, ClientService } from "@/lib/supabase/ports";

describe("User createProfile, getProfile, deleteProfile et deleteUser", () => {
    it("insère un profil", async () => {
        const insert = vi.fn().mockResolvedValue({ error: null });
        const from = vi.fn().mockReturnValue({ insert });

        const client = { from } as never;

        await createProfile(client, "123", "toto");

        expect(from).toHaveBeenCalledWith("profiles");
        expect(insert).toHaveBeenCalledWith({
            id: "123",
            role: "user",
            pseudo: "toto",
        });
    });

    it("throw si erreur", async () => {
        const insert = vi.fn().mockResolvedValue({ error: { message: "fail" } });
        const from = vi.fn().mockReturnValue({ insert });

        const client = { from } as never;

        await expect(createProfile(client, "123", "toto")).rejects.toThrow();
    });

    it("retourne un profil", async () => {
        const single = vi.fn().mockResolvedValue({
            data: { id: "123", pseudo: "toto" },
            error: null,
        });

        const select = vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ single }) });
        const from = vi.fn().mockReturnValue({ select });

        const client = { from } as never;

        const profile = await getProfile(client, "123");

        expect(profile).toEqual({ id: "123", pseudo: "toto" });
    });

    it("supprime un profil", async () => {
        const eq = vi.fn().mockResolvedValue({ error: null });
        const del = vi.fn().mockReturnValue({ eq });
        const from = vi.fn().mockReturnValue({ delete: del });

        const client: ClientWrite = {
            from,
        };

        await deleteProfile(client, "123");

        expect(from).toHaveBeenCalledWith("profiles");
        expect(del).toHaveBeenCalled();
        expect(eq).toHaveBeenCalledWith("id", "123");
    });

    it("throw si erreur", async () => {
        const eq = vi.fn().mockResolvedValue({ error: { message: "fail" } });
        const del = vi.fn().mockReturnValue({ eq });
        const from = vi.fn().mockReturnValue({ delete: del });

        const client: ClientWrite = {
            from,
        };

        await expect(deleteProfile(client, "123")).rejects.toThrow();
    });

    it("supprime un utilisateur", async () => {
        const deleteUserFn = vi.fn().mockResolvedValue({ error: null });

        const client: ClientService = {
            auth: {
                admin: {
                    deleteUser: deleteUserFn,
                },
            },
        };

        await deleteUser(client, "123");

        expect(deleteUserFn).toHaveBeenCalledWith("123");
    });

    it("throw si erreur", async () => {
        const deleteUserFn = vi.fn().mockResolvedValue({
            error: { message: "fail" },
        });

        const client: ClientService = {
            auth: {
                admin: {
                    deleteUser: deleteUserFn,
                },
            },
        };

        await expect(deleteUser(client, "123")).rejects.toThrow();
    });

});