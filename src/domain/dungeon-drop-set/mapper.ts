import { mapRowToBaseSet, mapBaseSetToRow } from "@/domain/shared/base-set/mapper";
import type { DungeonDropSet } from "./types";
import type { DungeonDropSetRow } from "./db";

export const mapRowToDungeonDropSet = (row: DungeonDropSetRow): DungeonDropSet =>
    mapRowToBaseSet(row);

export const mapDungeonDropSetToRow = (entity: DungeonDropSet): DungeonDropSetRow =>
    mapBaseSetToRow(entity);