import type { ChangePseudoSchema } from "./schema";

export type ChangePseudoFormState = {
    success: boolean;
    errors: Partial<Record<keyof ChangePseudoSchema, string[]>>;
    message: string | null;
};

export const initialChangePseudoState: ChangePseudoFormState = {
    success: false,
    errors: {},
    message: null,
};