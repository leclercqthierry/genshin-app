export type ArtifactSetRow = {
    id: number;
    name: string;
    icon_flower_url: string;
    icon_plume_url: string;
    icon_circlet_url: string;
    icon_sand_url: string;
    icon_goblet_url: string;
    rarity_max: number;
    bonus_2P: string;
    bonus_4P: string;
    created_at: string;
};

export type ArtifactSetCreateRow = Omit<ArtifactSetRow, "id" | "created_at">;
export type ArtifactSetUpdateRow = Partial<ArtifactSetCreateRow>;