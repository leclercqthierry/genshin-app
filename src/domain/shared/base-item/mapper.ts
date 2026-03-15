import type { BaseItem } from "./types";
import type { BaseItemRow } from "./db";

export function mapRowToBaseItem(row: BaseItemRow): BaseItem {
    return {
        id: row.id,
        name: row.name,
        iconUrl: row.icon_url,
        createdAt: row.created_at,
    };
}

export function mapBaseItemToRow(entity: BaseItem): BaseItemRow {
    return {
        id: entity.id,
        name: entity.name,
        icon_url: entity.iconUrl,
        created_at: entity.createdAt,
    };
}