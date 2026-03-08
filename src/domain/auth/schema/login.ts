import { z } from "zod";

/**
 * Schéma de validation pour la connexion utilisateur.
 *
 * Champs :
 * - `email` :
 *     - doit être une chaîne valide
 *     - format email obligatoire
 *     - ne peut pas être vide
 *
 * - `password` :
 *     - doit être une chaîne non vide
 *     - aucune contrainte supplémentaire ici, car la validation
 *       de complexité se fait uniquement à l'inscription
 *
 * Notes :
 * - Ce schéma est utilisé pour valider les données du formulaire
 *   de connexion avant d'appeler Supabase Auth.
 * - Il peut être utilisé dans une Server Action, une API Route,
 *   ou côté client avec React Hook Form + Zod Resolver.
 * - La validation reste volontairement simple : à la connexion,
 *   on ne vérifie pas la complexité du mot de passe, seulement
 *   que les champs sont remplis et valides.
 */
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est obligatoire")
        .pipe(z.email({ message: "Email invalide" })),

    password: z
        .string()
        .min(1, "Le mot de passe est obligatoire"),
});

/**
 * Type TypeScript dérivé automatiquement du schéma Zod.
 * Permet d'utiliser un typage strict et synchronisé avec la validation.
 */
export type LoginSchema = z.infer<typeof loginSchema>;
