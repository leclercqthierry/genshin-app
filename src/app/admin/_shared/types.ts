import type { BaseItemSchema } from "@/domain/shared/base-item/schema";

export type BaseItemFormState = {
    success: boolean;
    errors?: Partial<Record<keyof BaseItemSchema, string[]>>;
    message?: string;
};

export type BaseSetFormState = {
    success: boolean;
    errors: Record<string, string[]>;
    message?: string;
};