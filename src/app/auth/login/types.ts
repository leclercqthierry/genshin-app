import type { LoginSchema } from "@/domain/auth/schema/login";

export type LoginFormState = {
    success: boolean;
    errors: Partial<Record<keyof LoginSchema, string[]>>;
    message: string | null;
    role: "admin" | "user" | null;
};

export const initialLoginState: LoginFormState = {
    success: false,
    errors: {},
    message: null,
    role: null,
};