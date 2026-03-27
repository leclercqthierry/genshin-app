import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToEliteDropSet } from "@/domain/elite-drop-set/mapper";
import { EliteDropSet } from "@/domain/elite-drop-set/types";
import { EliteDropSetCreateRow, EliteDropSetRow } from "@/domain/elite-drop-set/db";

export const eliteDropSetService = createBaseSetCrud<
    EliteDropSet,
    EliteDropSetRow,
    EliteDropSetCreateRow
>("elite_drop_sets", mapRowToEliteDropSet);
