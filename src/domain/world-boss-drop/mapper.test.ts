import { mapRowToWorldBossDrop, mapWorldBossDropToRow } from "./mapper";

describe("WorldBossDrop mapper", () => {
    it("mapRowToWorldBossDrop transforme correctement une ligne DB en domaine", () => {
        const row = {
            id: 1,
            name: "Dragon Claw",
            icon_url: "/icons/dragon.png",
            created_at: "2024-01-01T00:00:00Z",
        };

        const result = mapRowToWorldBossDrop(row);

        expect(result).toEqual({
            id: 1,
            name: "Dragon Claw",
            iconUrl: "/icons/dragon.png",
            createdAt: "2024-01-01T00:00:00Z",
        });
    });

    it("mapWorldBossDropToRow transforme correctement un domaine en ligne DB", () => {
        const worldBossDrop = {
            id: 1,
            name: "Dragon Claw",
            iconUrl: "/icons/dragon.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        const result = mapWorldBossDropToRow(worldBossDrop);

        expect(result).toEqual({
            id: 1,
            name: "Dragon Claw",
            icon_url: "/icons/dragon.png",
            created_at: "2024-01-01T00:00:00Z",
        });
    });
});