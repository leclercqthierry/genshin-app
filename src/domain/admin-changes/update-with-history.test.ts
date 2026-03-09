import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

import { updateWithHistory } from "./update-with-history";

vi.mock("@/domain/admin-changes/record-admin-change");
vi.mock("@/services/files/replace-uploadthing-file");

import { recordAdminChange } from "@/domain/admin-changes/record-admin-change";
import { replaceUploadThingFile } from "@/services/files/replace-uploadthing-file";

describe("updateWithHistory", () => {
    const schema = z.object({
        name: z.string().min(1, "Requis"),
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("retourne une erreur si l'existant est introuvable", async () => {
        const getExisting = vi.fn().mockResolvedValue(null);

        const result = await updateWithHistory({
            id: 1,
            raw: { name: "X" },
            schema,
            getExisting,
            update: vi.fn(),
            entityType: "Test",
            entityName: () => "X",
        });

        expect(result.success).toBe(false);
        expect(result.errors).toEqual({ name: ["Test introuvable"] });
    });

    it("retourne des erreurs de validation si les données sont invalides", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });

        const result = await updateWithHistory({
            id: 1,
            raw: { name: "" }, // invalide
            schema,
            getExisting,
            update: vi.fn(),
            entityType: "Test",
            entityName: () => "X",
        });

        expect(result.success).toBe(false);
        expect(result.errors).toHaveProperty("name");
    });

    it("remplace les fichiers si replaceFiles est fourni", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });
        const update = vi.fn().mockResolvedValue(undefined);

        const replaceFiles = vi.fn().mockReturnValue([
            ["old1", "new1"],
            ["old2", "new2"],
        ]);

        (replaceUploadThingFile as unknown as {
            mockResolvedValue: (v: unknown) => unknown;
        }).mockResolvedValue(undefined);

        const result = await updateWithHistory({
            id: 1,
            raw: { name: "Test" },
            schema,
            getExisting,
            update,
            entityType: "Test",
            entityName: (d) => d.name,
            replaceFiles,
        });

        expect(replaceFiles).toHaveBeenCalledWith({ id: 1 }, { name: "Test" });
        expect(replaceUploadThingFile).toHaveBeenCalledTimes(2);
        expect(result.success).toBe(true);
    });

    it("retourne une erreur si replaceUploadThingFile échoue", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });
        const update = vi.fn();

        const replaceFiles = vi.fn().mockReturnValue([["old", "new"]]);

        (replaceUploadThingFile as unknown as {
            mockRejectedValue: (v: unknown) => unknown;
        }).mockRejectedValue(new Error("ReplaceFail"));

        const result = await updateWithHistory({
            id: 1,
            raw: { name: "Test" },
            schema,
            getExisting,
            update,
            entityType: "Test",
            entityName: (d) => d.name,
            replaceFiles,
        });

        expect(result.success).toBe(false);
        expect(result.message).toBe("ReplaceFail");
    });

    it("retourne une erreur si update() échoue", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });

        const update = vi.fn().mockRejectedValue(new Error("UpdateFail"));

        const result = await updateWithHistory({
            id: 1,
            raw: { name: "Test" },
            schema,
            getExisting,
            update,
            entityType: "Test",
            entityName: (d) => d.name,
        });

        expect(update).toHaveBeenCalledWith(1, { name: "Test" });
        expect(result.success).toBe(false);
        expect(result.message).toBe("UpdateFail");
    });

    it("ignore les erreurs de recordAdminChange", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });
        const update = vi.fn().mockResolvedValue(undefined);

        (recordAdminChange as unknown as {
            mockRejectedValue: (v: unknown) => unknown;
        }).mockRejectedValue(new Error("HistoryFail"));

        const result = await updateWithHistory({
            id: 1,
            raw: { name: "Test" },
            schema,
            getExisting,
            update,
            entityType: "Test",
            entityName: (d) => d.name,
        });

        expect(result.success).toBe(true);
    });

    it("retourne un succès complet", async () => {
        const getExisting = vi.fn().mockResolvedValue({ id: 1 });
        const update = vi.fn().mockResolvedValue(undefined);

        (recordAdminChange as unknown as {
            mockResolvedValue: (v: unknown) => unknown;
        }).mockResolvedValue(undefined);

        const result = await updateWithHistory({
            id: 1,
            raw: { name: "Test" },
            schema,
            getExisting,
            update,
            entityType: "Test",
            entityName: (d) => d.name,
        });

        expect(result.success).toBe(true);
        expect(result.errors).toEqual({});
    });
});