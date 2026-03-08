import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

import { createWithHistory } from "./create-with-history";
import { recordAdminChange } from "@/domain/admin-changes/record-admin-change";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { logFailedFileDeletion } from "@/lib/utils/supabase/failed-file-deletions";

vi.mock("@/domain/admin-changes/record-admin-change");
vi.mock("@/services/files/delete-uploadthing-file");
vi.mock("@/lib/utils/supabase/failed-file-deletions");

describe("createWithHistory", () => {
    const schema = z.object({
        name: z.string().min(1, "Requis"),
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne des erreurs de validation si les données sont invalides", async () => {
        const result = await createWithHistory({
            raw: { name: "" }, // invalide pour le schema
            schema,
            create: vi.fn(),
            entityType: "test",
            entityName: () => "X",
        });

        expect(result.success).toBe(false);
        expect(result.errors).toHaveProperty("name");
    });

    it("retourne une erreur si create() échoue et exécute cleanupFiles", async () => {
        const create = vi.fn().mockRejectedValue(new Error("Boom"));
        const cleanupFiles = vi.fn().mockReturnValue(["url1", "url2"]);

        (deleteUploadThingFile as unknown as { mockResolvedValue: (v: unknown) => unknown })
            .mockResolvedValue(undefined);

        const result = await createWithHistory({
            raw: { name: "Test" }, // valide
            schema,
            create,
            entityType: "test",
            entityName: (d) => d.name,
            cleanupFiles,
        });

        expect(create).toHaveBeenCalledWith({ name: "Test" });
        expect(cleanupFiles).toHaveBeenCalledWith({ name: "Test" });
        expect(deleteUploadThingFile).toHaveBeenCalledTimes(2);
        expect(result.success).toBe(false);
        expect(result.message).toBe("Boom");
    });

    it("logFailedFileDeletion est appelé si deleteUploadThingFile échoue", async () => {
        const create = vi.fn().mockRejectedValue(new Error("Boom"));
        const cleanupFiles = vi.fn().mockReturnValue(["url1"]);

        (deleteUploadThingFile as unknown as { mockRejectedValue: (v: unknown) => unknown })
            .mockRejectedValue(new Error("DeleteFail"));

        (logFailedFileDeletion as unknown as { mockResolvedValue: (v: unknown) => unknown })
            .mockResolvedValue(undefined);

        const result = await createWithHistory({
            raw: { name: "Test" },
            schema,
            create,
            entityType: "test",
            entityName: (d) => d.name,
            cleanupFiles,
        });

        expect(logFailedFileDeletion).toHaveBeenCalledWith("url1", expect.any(Error));
        expect(result.success).toBe(false);
    });

    it("enregistre l'historique admin après un succès", async () => {
        const create = vi.fn().mockResolvedValue(undefined);

        (recordAdminChange as unknown as { mockResolvedValue: (v: unknown) => unknown })
            .mockResolvedValue(undefined);

        const result = await createWithHistory({
            raw: { name: "Test" },
            schema,
            create,
            entityType: "test",
            entityName: (d) => d.name,
        });

        expect(create).toHaveBeenCalledWith({ name: "Test" });
        expect(recordAdminChange).toHaveBeenCalledWith({
            entityType: "test",
            action: "create",
            entityName: "Test",
        });
        expect(result.success).toBe(true);
    });

    it("ignore les erreurs de recordAdminChange", async () => {
        const create = vi.fn().mockResolvedValue(undefined);

        (recordAdminChange as unknown as { mockRejectedValue: (v: unknown) => unknown })
            .mockRejectedValue(new Error("HistoryFail"));

        const result = await createWithHistory({
            raw: { name: "Test" },
            schema,
            create,
            entityType: "test",
            entityName: (d) => d.name,
        });

        expect(create).toHaveBeenCalledWith({ name: "Test" });
        expect(result.success).toBe(true);
    });
});