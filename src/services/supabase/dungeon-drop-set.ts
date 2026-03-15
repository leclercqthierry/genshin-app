import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToDungeonDropSet } from "@/domain/dungeon-drop-set/mapper";
import { DungeonDropSet } from "@/domain/dungeon-drop-set/types";
import { DungeonDropSetCreateRow, DungeonDropSetRow } from "@/domain/dungeon-drop-set/db";

export const dungeonDropSetService = createBaseSetCrud<
    DungeonDropSet,
    DungeonDropSetRow,
    DungeonDropSetCreateRow
>("dungeon_drop_sets", mapRowToDungeonDropSet);
