import { describe, it, expect, vi, beforeEach } from "vitest";
import { logFailedFileDeletion } from "@/lib/utils/supabase/failed-file-deletions";
import { createSupabaseServiceClient } from "@/lib/utils/supabase/service";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";

vi.mock("@/lib/utils/supabase/service");
vi.mock("@/lib/utils/extract-error-message");

describe("logFailedFileDeletion", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("insère une ligne dans failed_file_deletions avec le bon message", async () => {
        const insert = vi.fn().mockResolvedValue({ data: null, error: null });
        const from = vi.fn().mockReturnValue({ insert });

        (createSupabaseServiceClient as unknown as { mockResolvedValue: (v: unknown) => unknown })
            .mockResolvedValue({ from });

        (extractErrorMessage as unknown as { mockReturnValue: (v: unknown) => unknown })
            .mockReturnValue("Erreur X");

        await logFailedFileDeletion("file.jpg", new Error("Boom"));

        expect(from).toHaveBeenCalledWith("failed_file_deletions");
        expect(insert).toHaveBeenCalledWith({
            file_url: "file.jpg",
            error_message: "Erreur X",
        });
    });

    it("laisse remonter l’erreur si Supabase échoue", async () => {
        const insert = vi.fn().mockRejectedValue(new Error("DB error"));
        const from = vi.fn().mockReturnValue({ insert });

        (createSupabaseServiceClient as unknown as { mockResolvedValue: (v: unknown) => unknown })
            .mockResolvedValue({ from });

        await expect(
            logFailedFileDeletion("file.jpg", new Error("Boom"))
        ).rejects.toThrow("DB error");
    });
});