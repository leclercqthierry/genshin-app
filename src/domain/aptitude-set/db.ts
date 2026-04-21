import { BaseSetRow, BaseSetCreateRow } from "../shared/base-set/db";

export type AptitudeSetRow = BaseSetRow;
export type AptitudeSetCreateRow = BaseSetCreateRow;
export type AptitudeSetUpdateRow = Partial<AptitudeSetCreateRow>;