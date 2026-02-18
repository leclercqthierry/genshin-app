import type { ElementSchema } from "@/domain/element/schema";

export type ElementFormState = {
    success: boolean;
    errors?: Partial<Record<keyof ElementSchema, string[]>>;
    message?: string;
};