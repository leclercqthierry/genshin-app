import { createSupabaseServiceClient } from "./service";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";

export async function logFailedFileDeletion(fileUrl: string, error: unknown) {
    const supabase = await createSupabaseServiceClient();

    await supabase.from("failed_file_deletions").insert({
        file_url: fileUrl,
        error_message: extractErrorMessage(error),
    });
}