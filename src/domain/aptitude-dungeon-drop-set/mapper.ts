import { mapRowToBaseSet, mapBaseSetToRow } from "@/domain/shared/base-set/mapper";
import type { AptitudeDungeonDropSet } from "./types";
import type { AptitudeDungeonDropSetRow } from "./db";

export const mapRowToAptitudeDungeonDropSet = (row: AptitudeDungeonDropSetRow): AptitudeDungeonDropSet =>
    mapRowToBaseSet(row);

export const mapAptitudeDungeonDropSetToRow = (entity: AptitudeDungeonDropSet): AptitudeDungeonDropSetRow =>
    mapBaseSetToRow(entity);