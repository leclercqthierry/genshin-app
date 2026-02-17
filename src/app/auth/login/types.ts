import type { LoginSchema } from "@/schemas/loginSchema";

/**
 * État retourné par le formulaire de connexion.
 */
export type LoginFormState = {
    success: boolean;
    errors: Partial<Record<keyof LoginSchema, string[]>>;
    message?: string;
};

export const initialLoginState: LoginFormState = {
    success: false,
    errors: {},
};