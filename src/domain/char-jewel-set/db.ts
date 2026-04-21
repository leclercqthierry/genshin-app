import { BaseSetRow, BaseSetCreateRow } from "../shared/base-set/db";

export type CharJewelSetRow = BaseSetRow & {
    rarity5_url: string;
    element_id: number;
};

export type CharJewelSetCreateRow = BaseSetCreateRow & {
    rarity5_url: string;
    element_id: number;
};

export type CharJewelSetUpdateRow = Partial<CharJewelSetCreateRow>;