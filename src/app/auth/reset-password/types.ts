import type { ResetPasswordSchema } from "@/domain/auth/schema/reset-password";

export type ResetPasswordFormState = {
    success: boolean;
    errors: Partial<Record<keyof ResetPasswordSchema, string[]>>;
    message?: string;
    redirect?: boolean;
};

export const initialResetPasswordState: ResetPasswordFormState = {
    success: true,
    errors: {},
    redirect: false,
};