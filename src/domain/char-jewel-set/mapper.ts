import { CharJewelSet } from "./types";
import { CharJewelSetRow } from "./db";
import { mapBaseSetToRow, mapRowToBaseSet } from "../shared/base-set/mapper";

export const mapRowToCharJewelSet = (row: CharJewelSetRow): CharJewelSet =>
    mapRowToBaseSet(row, (r) => ({
        rarity5Url: r.rarity5_url,
        elementId: r.element_id,
    }));

export const mapCharJewelSetToRow = (entity: CharJewelSet): CharJewelSetRow =>
    mapBaseSetToRow(entity, (e) => ({
        rarity5_url: e.rarity5Url,
        element_id: e.elementId,
    }));

