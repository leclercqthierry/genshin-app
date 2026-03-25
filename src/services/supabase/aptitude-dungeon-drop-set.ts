import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToAptitudeDungeonDropSet } from "@/domain/aptitude-dungeon-drop-set/mapper";
import { AptitudeDungeonDropSet } from "@/domain/aptitude-dungeon-drop-set/types";
import { AptitudeDungeonDropSetCreateRow, AptitudeDungeonDropSetRow } from "@/domain/aptitude-dungeon-drop-set/db";

export const aptitudeDungeonDropSetService = createBaseSetCrud<
    AptitudeDungeonDropSet,
    AptitudeDungeonDropSetRow,
    AptitudeDungeonDropSetCreateRow
>("aptitude_dungeon_drop_sets", mapRowToAptitudeDungeonDropSet);
