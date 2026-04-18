export type WeaponRow = {
    id: number;
    name: string;
    image_url: string;
    mini_url: string;
    rarity: number;
    weapon_type: string;
    sub_stat: string;
    source: string;
    description: string;
    elite_drop_set_id: number;
    mob_drop_set_id: number;
    weapon_elevation_dungeon_drop_set_id: number;
    created_at: string;
};

export type WeaponCreateRow = Omit<WeaponRow, "id" | "created_at">;
export type WeaponUpdateRow = Partial<WeaponCreateRow>;