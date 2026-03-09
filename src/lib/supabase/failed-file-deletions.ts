import { SupabaseClient } from "@supabase/supabase-js";
import { extractErrorMessage } from "@/lib/utils/extract-error-message";

export async function logFailedFileDeletion(
    supabase: SupabaseClient,
    fileUrl: string,
    error: unknown
) {
    await supabase.from("failed_file_deletions").insert({
        file_url: fileUrl,
        error_message: extractErrorMessage(error),
    });
}