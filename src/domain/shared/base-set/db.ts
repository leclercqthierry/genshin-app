export type BaseSetRow = {
    id: number;
    name: string;
    rarity2_url: string;
    rarity3_url: string;
    rarity4_url: string;
    created_at: string;
};

export type BaseSetCreateRow = Omit<BaseSetRow, "id" | "created_at">;
export type BaseSetUpdateRow = Partial<BaseSetCreateRow>;