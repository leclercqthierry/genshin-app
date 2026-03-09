import { LocalMaterialSchema } from "@/domain/local-material/schema";

export type LocalMaterialFormState = {
    success: boolean;
    errors?: Partial<Record<keyof LocalMaterialSchema, string[]>>;
    message?: string;
};