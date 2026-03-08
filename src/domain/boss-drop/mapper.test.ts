import { mapRowToBossDrop, mapBossDropToRow } from "./mapper";

describe("BossDrop mapper", () => {
    it("mapRowToBossDrop transforme correctement une ligne DB en domaine", () => {
        const row = {
            id: 1,
            name: "Dragon Claw",
            icon_url: "/icons/dragon.png",
            created_at: "2024-01-01T00:00:00Z",
        };

        const result = mapRowToBossDrop(row);

        expect(result).toEqual({
            id: 1,
            name: "Dragon Claw",
            iconUrl: "/icons/dragon.png",
            createdAt: "2024-01-01T00:00:00Z",
        });
    });

    it("mapBossDropToRow transforme correctement un domaine en ligne DB", () => {
        const bossDrop = {
            id: 1,
            name: "Dragon Claw",
            iconUrl: "/icons/dragon.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        const result = mapBossDropToRow(bossDrop);

        expect(result).toEqual({
            id: 1,
            name: "Dragon Claw",
            icon_url: "/icons/dragon.png",
            created_at: "2024-01-01T00:00:00Z",
        });
    });
});