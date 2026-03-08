import { describe, it, expect, vi, type Mock } from "vitest";
import { replaceUploadThingFile } from "./replace-uploadthing-file";

vi.mock("./delete-uploadthing-file", () => ({
    deleteUploadThingFile: vi.fn(),
}));

vi.mock("@/lib/utils/extract-error-message", () => ({
    extractErrorMessage: vi.fn(),
}));

import { deleteUploadThingFile } from "./delete-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";

describe("replaceUploadThingFile", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("ne fait rien si newUrl est null", async () => {
        await replaceUploadThingFile("old.png", null);
        expect(deleteUploadThingFile).not.toHaveBeenCalled();
    });

    it("ne fait rien si oldUrl === newUrl", async () => {
        await replaceUploadThingFile("same.png", "same.png");
        expect(deleteUploadThingFile).not.toHaveBeenCalled();
    });

    it("supprime l'ancien fichier si oldUrl existe et newUrl est différent", async () => {
        await replaceUploadThingFile("old.png", "new.png");
        expect(deleteUploadThingFile).toHaveBeenCalledWith("old.png");
    });

    it("throw une erreur transformée si deleteUploadThingFile échoue", async () => {
        (deleteUploadThingFile as Mock).mockRejectedValue(new Error("UT error"));
        (extractErrorMessage as Mock).mockReturnValue("Erreur propre");

        await expect(
            replaceUploadThingFile("old.png", "new.png")
        ).rejects.toThrow("Erreur propre");
    });

    it("throw une erreur transformée si une erreur inattendue survient", async () => {
        (deleteUploadThingFile as Mock).mockImplementation(() => {
            throw "weird error";
        });
        (extractErrorMessage as Mock).mockReturnValue("Erreur propre");

        await expect(
            replaceUploadThingFile("old.png", "new.png")
        ).rejects.toThrow("Erreur propre");
    });
});