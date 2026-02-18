import type { Element } from "./types";
import type { ElementRow } from "./db";

/**
 * DB → Domaine
 */
export function mapRowToElement(row: ElementRow): Element {
    return {
        id: row.id,
        name: row.name,
        iconUrl: row.icon_url,
        createdAt: row.created_at,
    };
}

/**
 * Domaine → DB (pour insert/update)
 */
export function mapElementToRow(element: Element): ElementRow {
    return {
        id: element.id,
        name: element.name,
        icon_url: element.iconUrl,
        created_at: element.createdAt,
    };
}