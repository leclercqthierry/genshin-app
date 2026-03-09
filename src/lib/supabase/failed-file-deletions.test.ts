import { describe, it, expect, vi, Mock } from "vitest";
import { logFailedFileDeletion } from "./failed-file-deletions";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";

// Mock extractErrorMessage
vi.mock("@/lib/utils/extract-error-message", () => ({
    extractErrorMessage: vi.fn(),
}));

describe("logFailedFileDeletion", () => {
    it("insère correctement une entrée dans failed_file_deletions", async () => {
        // Arrange
        const insert = vi.fn().mockResolvedValue(undefined);
        const from = vi.fn(() => ({ insert }));
        const supabase = { from } as never;

        (extractErrorMessage as unknown as Mock).mockReturnValue("ERR");

        // Act
        await logFailedFileDeletion(supabase, "url1", new Error("Boom"));

        // Assert
        expect(from).toHaveBeenCalledWith("failed_file_deletions");
        expect(insert).toHaveBeenCalledWith({
            file_url: "url1",
            error_message: "ERR",
        });
    });
});