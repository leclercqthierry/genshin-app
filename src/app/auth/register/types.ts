import type { RegisterSchema } from "@/schemas/registerSchema";

export type RegisterFormState = {
    success: boolean;
    errors: Partial<Record<keyof RegisterSchema, string[]>>;
    message?: string;
};

export const initialRegisterState: RegisterFormState = {
    success: false,
    errors: {},
    message: undefined,
};