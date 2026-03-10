import { WorldBossDropSchema } from "@/domain/world-boss-drop/schema";

export type WorldBossDropFormState = {
    success: boolean;
    errors?: Partial<Record<keyof WorldBossDropSchema, string[]>>;
    message?: string;
};