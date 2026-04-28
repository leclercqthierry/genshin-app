import { z } from "zod";

export const changePseudoSchema = z
    .string()
    .min(3, "Le pseudo doit contenir au moins 3 caractères.")
    .max(20, "Le pseudo ne peut pas dépasser 20 caractères.")
    .regex(
        /^[A-Za-z0-9]+$/,
        "Le pseudo ne peut contenir que des lettres et des chiffres."
    );

export type ChangePseudoSchema = z.infer<typeof changePseudoSchema>;