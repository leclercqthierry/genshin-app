export type MobDropSetRow = {
    id: number;
    name: string;
    rarity1_url: string;
    rarity2_url: string;
    rarity3_url: string;
    created_at: string;
};

export type MobDropSetCreateRow = Omit<MobDropSetRow, "id" | "created_at">;
export type MobDropSetUpdateRow = Partial<MobDropSetCreateRow>;