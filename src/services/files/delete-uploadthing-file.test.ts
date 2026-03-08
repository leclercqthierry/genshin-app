import { describe, it, expect, vi, type Mock } from "vitest";

// 1) Mock UTApi comme une CLASSE
const deleteFilesMock = vi.fn();

vi.mock("uploadthing/server", () => {
    return {
        UTApi: class {
            deleteFiles = deleteFilesMock;
        }
    };
});

// 2) Mock extractErrorMessage
vi.mock("@/lib/utils/extract-error-message", () => ({
    extractErrorMessage: vi.fn(),
}));

// 3) Import APRÈS les mocks
import { deleteUploadThingFile } from "./delete-uploadthing-file";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";

describe("deleteUploadThingFile", () => {
    beforeEach(() => {
        deleteFilesMock.mockReset();
    });

    it("ne fait rien si url est null", async () => {
        await deleteUploadThingFile(null);
        expect(deleteFilesMock).not.toHaveBeenCalled();
    });

    it("supprime le fichier avec la bonne clé", async () => {
        await deleteUploadThingFile("https://x/y/z/abc123");
        expect(deleteFilesMock).toHaveBeenCalledWith("abc123");
    });

    it("throw une erreur transformée si UploadThing échoue", async () => {
        const error = new Error("UT error");

        deleteFilesMock.mockRejectedValue(error);
        (extractErrorMessage as Mock).mockReturnValue("Erreur propre");

        await expect(
            deleteUploadThingFile("https://x/y/z/abc123")
        ).rejects.toThrow("Erreur propre");
    });
});