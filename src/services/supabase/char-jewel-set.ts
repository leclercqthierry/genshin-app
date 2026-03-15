import { createBaseSetCrud } from "./shared/base-set-crud";
import { mapRowToCharJewelSet } from "@/domain/char-jewel-set/mapper";
import type { CharJewelSetRow, CharJewelSetCreateRow } from '@/domain/char-jewel-set/db';
import type { CharJewelSet } from "@/domain/char-jewel-set/types";

export const charJewelSetService = createBaseSetCrud<
    CharJewelSet,
    CharJewelSetRow,
    CharJewelSetCreateRow
>("char_jewel_sets", mapRowToCharJewelSet);
