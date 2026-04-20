import { z } from "zod";

export function zodFieldErrorsSimple(
    error: z.ZodError<unknown>
): Record<string, string[]> {
    const fieldErrors: Record<string, string[]> = {};

    for (const issue of error.issues) {
        const path = issue.path;
        const message = issue.message;

        if (path.length === 0) {
            // Erreur globale
            if (!fieldErrors["_root"]) {
                fieldErrors["_root"] = [];
            }
            fieldErrors["_root"].push(message);
            continue;
        }

        const field = path[0];

        if (typeof field === "string") {
            if (!fieldErrors[field]) {
                fieldErrors[field] = [];
            }
            fieldErrors[field].push(message);
        }
    }

    return fieldErrors;
}
