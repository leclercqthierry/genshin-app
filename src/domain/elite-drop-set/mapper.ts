import { mapRowToBaseSet, mapBaseSetToRow } from "@/domain/shared/base-set/mapper";
import type { EliteDropSet } from "./types";
import type { EliteDropSetRow } from "./db";

export const mapRowToEliteDropSet = (row: EliteDropSetRow): EliteDropSet =>
    mapRowToBaseSet(row);

export const mapEliteDropSetToRow = (entity: EliteDropSet): EliteDropSetRow =>
    mapBaseSetToRow(entity);