import { z } from "zod";

/**
 * Schéma de validation pour la demande de réinitialisation de mot de passe.
 */
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est obligatoire")
        .pipe(z.email({ message: "Email invalide" })),
});

/**
 * Type dérivé automatiquement du schéma.
 */
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;