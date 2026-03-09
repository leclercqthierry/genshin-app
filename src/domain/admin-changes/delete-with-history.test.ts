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
import { deleteWithHistory } from "./delete-with-history";
import { recordAdminChange } from "@/domain/admin-changes/record-admin-change";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { logFailedFileDeletion } from "@/lib/supabase/failed-file-deletions";

const mockedDeleteUploadThingFile = vi.mocked(deleteUploadThingFile);
const mockedLogFailedFileDeletion = vi.mocked(logFailedFileDeletion);
const mockedRecordAdminChange = vi.mocked(recordAdminChange);

describe("deleteWithHistory", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne une erreur si l'existant est introuvable", async () => {
        const getExisting = vi.fn().mockResolvedValue(null);

        const result = await deleteWithHistory({
            id: 1,
            getExisting,
            deleteEntity: vi.fn(),
            entityType: "Test",
            entityName: () => "X",
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe("Test introuvable.");
    });

    it("retourne une erreur si deleteEntity échoue", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });

        const deleteEntity = vi.fn().mockRejectedValue(new Error("DeleteFail"));

        const result = await deleteWithHistory({
            id: 1,
            getExisting,
            deleteEntity,
            entityType: "Test",
            entityName: () => "X",
        });

        expect(deleteEntity).toHaveBeenCalledWith(1);
        expect(result.success).toBe(false);
        expect(result.message).toBe("DeleteFail");
    });

    it("ignore les erreurs de recordAdminChange", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });

        const deleteEntity = vi.fn().mockResolvedValue(undefined);

        mockedDeleteUploadThingFile.mockRejectedValue(new Error("HistoryFail"));

        const result = await deleteWithHistory({
            id: 1,
            getExisting,
            deleteEntity,
            entityType: "Test",
            entityName: () => "X",
        });

        expect(deleteEntity).toHaveBeenCalledWith(1);
        expect(result.success).toBe(true);
    });

    it("supprime les fichiers si deleteFiles est fourni", async () => {
        const existing = { id: 1, file: "url1" };

        const getExisting = vi.fn().mockResolvedValue(existing);
        const deleteEntity = vi.fn().mockResolvedValue(undefined);

        const deleteFiles = vi.fn().mockReturnValue(["url1", "url2"]);

        mockedDeleteUploadThingFile.mockResolvedValue(undefined);

        const result = await deleteWithHistory({
            id: 1,
            getExisting,
            deleteEntity,
            entityType: "Test",
            entityName: () => "X",
            deleteFiles,
        });

        expect(deleteFiles).toHaveBeenCalledWith(existing);
        expect(deleteUploadThingFile).toHaveBeenCalledTimes(2);
        expect(result.success).toBe(true);
    });

    it("logFailedFileDeletion est appelé si deleteUploadThingFile échoue", async () => {
        const existing = { id: 1 };

        const getExisting = vi.fn().mockResolvedValue(existing);
        const deleteEntity = vi.fn().mockResolvedValue(undefined);

        const deleteFiles = vi.fn().mockReturnValue(["url1"]);

        mockedDeleteUploadThingFile.mockRejectedValue(new Error("FileFail"));
        mockedLogFailedFileDeletion.mockResolvedValue(undefined);

        const result = await deleteWithHistory({
            id: 1,
            getExisting,
            deleteEntity,
            entityType: "Test",
            entityName: () => "X",
            deleteFiles,
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
            expect(passedError.message).toBe("FileFail");
        }

        expect(result.success).toBe(true);

    });

    it("retourne un succès complet", async () => {
        const existing = { id: 1 };

        const getExisting = vi.fn().mockResolvedValue(existing);
        const deleteEntity = vi.fn().mockResolvedValue(undefined);

        mockedRecordAdminChange.mockResolvedValue(undefined);

        const result = await deleteWithHistory({
            id: 1,
            getExisting,
            deleteEntity,
            entityType: "Test",
            entityName: () => "X",
        });

        expect(result.success).toBe(true);
    });
});