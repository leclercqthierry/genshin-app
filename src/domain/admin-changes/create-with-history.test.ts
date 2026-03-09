// TOUS LES MOCKS AVANT TOUT IMPORT
vi.mock("@/domain/admin-changes/record-admin-change", () => ({
    recordAdminChange: vi.fn(),
}));

vi.mock("@/services/files/delete-uploadthing-file", () => ({
    deleteUploadThingFile: vi.fn(),
}));

// Nouvelle signature : (supabase, url, error)
vi.mock("@/lib/supabase/failed-file-deletions", () => ({
    logFailedFileDeletion: vi.fn(),
}));

// On mocke aussi le client Supabase service
vi.mock("@/lib/supabase/service", () => ({
    createSupabaseServiceClient: vi.fn(() => ({
        from: vi.fn(() => ({
            insert: vi.fn(),
        })),
    })),
}));

import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";
import { createWithHistory } from "./create-with-history";
import { recordAdminChange } from "@/domain/admin-changes/record-admin-change";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { logFailedFileDeletion } from "@/lib/supabase/failed-file-deletions";

const mockedDeleteUploadThingFile = vi.mocked(deleteUploadThingFile);
const mockedLogFailedFileDeletion = vi.mocked(logFailedFileDeletion);
const mockedRecordAdminChange = vi.mocked(recordAdminChange);

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

        mockedDeleteUploadThingFile.mockResolvedValue(undefined);

        const result = await createWithHistory({
            raw: { name: "Test" },
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

        mockedDeleteUploadThingFile.mockRejectedValue(new Error("DeleteFail"));
        mockedLogFailedFileDeletion.mockResolvedValue(undefined);

        const result = await createWithHistory({
            raw: { name: "Test" },
            schema,
            create,
            entityType: "test",
            entityName: (d) => d.name,
            cleanupFiles,
        });

        const calls = mockedLogFailedFileDeletion.mock.calls;
        expect(calls.length).toBe(1);

        const [passedSupabase, passedUrl, passedError] = calls[0];

        expect(passedSupabase).toHaveProperty("from");
        expect(typeof passedSupabase.from).toBe("function");
        expect(passedUrl).toBe("url1");

        // Narrowing strict
        expect(passedError).toBeInstanceOf(Error);

        if (passedError instanceof Error) {
            expect(passedError.message).toBe("DeleteFail");
        }

        expect(result.success).toBe(false);
    });


    it("enregistre l'historique admin après un succès", async () => {
        const create = vi.fn().mockResolvedValue(undefined);

        mockedRecordAdminChange.mockResolvedValue(undefined);

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

        mockedRecordAdminChange.mockRejectedValue(new Error("HistoryFail"));

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