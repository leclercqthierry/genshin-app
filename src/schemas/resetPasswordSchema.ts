import { z } from "zod";

/**
 * Schéma de validation pour la réinitialisation de mot de passe.
 */
export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, "Le mot de passe doit contenir au moins 6 caractères."),

        password2: z.string(),
    })
    .refine((data) => data.password === data.password2, {
        message: "Les mots de passe ne correspondent pas.",
        path: ["password2"],
    });

/**
 * Type dérivé automatiquement du schéma.
 */
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;