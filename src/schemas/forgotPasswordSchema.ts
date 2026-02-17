import { z } from "zod";

/**
 * Schéma de validation pour la demande de réinitialisation de mot de passe.
 */
export const forgotPasswordSchema = z.object({
    email: z
        .email("Email invalide")
        .min(1, "L'email est obligatoire"),
});

/**
 * Type dérivé automatiquement du schéma.
 */
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;