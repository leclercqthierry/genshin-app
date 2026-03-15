import { mapRowToBaseItem, mapBaseItemToRow } from "./mapper";

describe("BaseItem mapper", () => {
    it("mapRowToBaseItem transforme correctement une ligne DB en domaine", () => {
        const row = {
            id: 1,
            name: "Item",
            icon_url: "/icons/item.png",
            created_at: "2024-01-01T00:00:00Z",
        };

        const result = mapRowToBaseItem(row);

        expect(result).toEqual({
            id: 1,
            name: "Item",
            iconUrl: "/icons/item.png",
            createdAt: "2024-01-01T00:00:00Z",
        });
    });

    it("mapBaseItemToRow transforme correctement un domaine en ligne DB", () => {
        const bossDrop = {
            id: 1,
            name: "Item",
            iconUrl: "/icons/item.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        const result = mapBaseItemToRow(bossDrop);

        expect(result).toEqual({
            id: 1,
            name: "Item",
            icon_url: "/icons/item.png",
            created_at: "2024-01-01T00:00:00Z",
        });
    });
});