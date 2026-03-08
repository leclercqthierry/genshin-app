import type { ForgotPasswordSchema } from "@/domain/auth/schema/forgot-password";

export type ForgotPasswordFormState = {
    success: boolean;
    errors: Partial<Record<keyof ForgotPasswordSchema, string[]>>;
    message?: string;
};

export const initialForgotPasswordState: ForgotPasswordFormState = {
    success: false,
    errors: {},
};