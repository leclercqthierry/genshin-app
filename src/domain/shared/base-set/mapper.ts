import type { BaseSet } from "./types";
import type { BaseSetRow } from "./db";

export function mapRowToBaseSet<
    TRow extends BaseSetRow,
    TExtra extends Record<string, unknown> = Record<string, never>
>(
    row: TRow,
    extra?: (row: TRow) => TExtra
): BaseSet & TExtra {
    const base: BaseSet = {
        id: row.id,
        name: row.name,
        rarity2Url: row.rarity2_url,
        rarity3Url: row.rarity3_url,
        rarity4Url: row.rarity4_url,
        createdAt: row.created_at,
    };

    return {
        ...base,
        ...(extra ? extra(row) : ({} as TExtra)),
    };
}

export function mapBaseSetToRow<
    TEntity extends BaseSet,
    TExtra extends Record<string, unknown> = Record<string, never>
>(
    entity: TEntity,
    extra?: (entity: TEntity) => TExtra
): BaseSetRow & TExtra {
    const base: BaseSetRow = {
        id: entity.id,
        name: entity.name,
        rarity2_url: entity.rarity2Url,
        rarity3_url: entity.rarity3Url,
        rarity4_url: entity.rarity4Url,
        created_at: entity.createdAt,
    };

    return {
        ...base,
        ...(extra ? extra(entity) : ({} as TExtra)),
    };
}