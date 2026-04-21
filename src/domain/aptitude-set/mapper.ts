import { mapRowToBaseSet, mapBaseSetToRow } from "@/domain/shared/base-set/mapper";
import type { AptitudeSet } from "./types";
import type { AptitudeSetRow } from "./db";

export const mapRowToAptitudeSet = (row: AptitudeSetRow): AptitudeSet =>
    mapRowToBaseSet(row);

export const mapAptitudeSetToRow = (entity: AptitudeSet): AptitudeSetRow =>
    mapBaseSetToRow(entity);