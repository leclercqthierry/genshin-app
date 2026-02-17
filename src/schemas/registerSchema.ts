import { z } from "zod";

/**
 * Schéma de validation pour l'inscription d'un utilisateur.
 *
 * Champs :
 * - `pseudo` :
 *     - 3 à 20 caractères
 *     - uniquement lettres et chiffres
 *     - utilisé comme nom visible dans l'application
 *
 * - `email` :
 *     - doit être un email valide
 *     - limite de 254 caractères (standard RFC)
 *
 * - `password` :
 *     - minimum 12 caractères (recommandation CNIL)
 *     - maximum 128
 *     - doit contenir :
 *         - au moins une majuscule
 *         - au moins une minuscule
 *         - au moins un chiffre
 *         - au moins un caractère spécial
 *
 * - `password2` :
 *     - confirmation du mot de passe
 *
 * Règles supplémentaires :
 * - `.refine()` vérifie que `password` et `password2` sont identiques.
 *   En cas d’erreur, le message est attaché au champ `password2`.
 *
 * Notes :
 * - Ce schéma est idéal pour une Server Action Next.js ou un endpoint API.
 * - Zod garantit une validation robuste côté serveur, même si on valide aussi côté client.
 */
export const registerSchema = z
    .object({
        pseudo: z
            .string()
            .min(3, "Le pseudo doit contenir au moins 3 caractères.")
            .max(20, "Le pseudo ne peut pas dépasser 20 caractères.")
            .regex(
                /^[A-Za-z0-9]+$/,
                "Le pseudo ne peut contenir que des lettres et des chiffres."
            ),

        email: z
            .email("Format d'email invalide.")
            .max(254, "L'email est trop long."),

        password: z
            .string()
            .min(12, "Le mot de passe doit contenir au moins 12 caractères.")
            .max(128, "Le mot de passe ne peut pas dépasser 128 caractères.")
            .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
            .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule.")
            .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.")
            .regex(
                /[^A-Za-z0-9]/,
                "Le mot de passe doit contenir au moins un caractère spécial."
            ),

        password2: z.string().min(1, "Veuillez confirmer votre mot de passe."),
    })
    .refine((data) => data.password === data.password2, {
        message: "Les mots de passe ne correspondent pas.",
        path: ["password2"],
    });

/**
 * Type TypeScript dérivé automatiquement du schéma Zod.
 * Permet d'utiliser un typage strict et synchronisé avec la validation.
 */
export type RegisterSchema = z.infer<typeof registerSchema>;
