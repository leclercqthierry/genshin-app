import type { ResetPasswordSchema } from "@/schemas/resetPasswordSchema";

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