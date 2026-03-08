import type { RegisterSchema } from "@/domain/auth/schema/register";

export type RegisterFormState = {
    success: boolean;
    errors: Partial<Record<keyof RegisterSchema, string[]>>;
    message: string | null;
};

export const initialRegisterState: RegisterFormState = {
    success: false,
    errors: {},
    message: null,
};