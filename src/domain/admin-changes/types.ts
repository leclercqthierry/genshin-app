export type AdminChangeAction = "create" | "update" | "delete";

export interface AdminChangeItem {
    entityName: string;
}

export interface AdminChangeGroup {
    date: string;
    entityLabel: string;
    creates: string[];
    updates: string[];
    deletes: string[];
}