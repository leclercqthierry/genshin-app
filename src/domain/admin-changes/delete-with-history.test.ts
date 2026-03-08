import { describe, it, expect, vi, beforeEach } from "vitest";

import { deleteWithHistory } from "./delete-with-history";

import { recordAdminChange } from "@/domain/admin-changes/record-admin-change";
import { deleteUploadThingFile } from "@/services/files/delete-uploadthing-file";
import { logFailedFileDeletion } from "@/lib/utils/supabase/failed-file-deletions";

vi.mock("@/domain/admin-changes/record-admin-change");
vi.mock("@/services/files/delete-uploadthing-file");
vi.mock("@/lib/utils/supabase/failed-file-deletions");

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

        (recordAdminChange as unknown as {
            mockRejectedValue: (v: unknown) => unknown;
        }).mockRejectedValue(new Error("HistoryFail"));

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

        (deleteUploadThingFile as unknown as {
            mockResolvedValue: (v: unknown) => unknown;
        }).mockResolvedValue(undefined);

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

        (deleteUploadThingFile as unknown as {
            mockRejectedValue: (v: unknown) => unknown;
        }).mockRejectedValue(new Error("FileFail"));

        (logFailedFileDeletion as unknown as {
            mockResolvedValue: (v: unknown) => unknown;
        }).mockResolvedValue(undefined);

        const result = await deleteWithHistory({
            id: 1,
            getExisting,
            deleteEntity,
            entityType: "Test",
            entityName: () => "X",
            deleteFiles,
        });

        expect(logFailedFileDeletion).toHaveBeenCalledWith("url1", expect.any(Error));
        expect(result.success).toBe(true);
    });

    it("retourne un succès complet", async () => {
        const existing = { id: 1 };

        const getExisting = vi.fn().mockResolvedValue(existing);
        const deleteEntity = vi.fn().mockResolvedValue(undefined);

        (recordAdminChange as unknown as {
            mockResolvedValue: (v: unknown) => unknown;
        }).mockResolvedValue(undefined);

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