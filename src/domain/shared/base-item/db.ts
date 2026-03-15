export type BaseItemRow = {
    id: number;
    name: string;
    icon_url: string;
    created_at: string;
};

export type BaseItemCreateRow = Omit<BaseItemRow, "id" | "created_at">;
export type BaseItemUpdateRow = Partial<BaseItemCreateRow>;