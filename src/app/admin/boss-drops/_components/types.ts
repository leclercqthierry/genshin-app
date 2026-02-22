import { BossDropSchema } from "@/domain/boss-drop/schema";

export type BossDropFormState = {
    success: boolean;
    errors?: Partial<Record<keyof BossDropSchema, string[]>>;
    message?: string;
};