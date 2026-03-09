import { mapRowToLocalMaterial, mapLocalMaterialToRow } from "./mapper";

describe("LocalMaterial mapper", () => {
    it("mapRowToLocalMaterial transforme correctement une ligne DB en domaine", () => {
        const row = {
            id: 1,
            name: "Dragon Claw",
            icon_url: "/icons/dragon.png",
            created_at: "2024-01-01T00:00:00Z",
        };

        const result = mapRowToLocalMaterial(row);

        expect(result).toEqual({
            id: 1,
            name: "Dragon Claw",
            iconUrl: "/icons/dragon.png",
            createdAt: "2024-01-01T00:00:00Z",
        });
    });

    it("mapLocalMaterialToRow transforme correctement un domaine en ligne DB", () => {
        const localMaterial = {
            id: 1,
            name: "Dragon Claw",
            iconUrl: "/icons/dragon.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        const result = mapLocalMaterialToRow(localMaterial);

        expect(result).toEqual({
            id: 1,
            name: "Dragon Claw",
            icon_url: "/icons/dragon.png",
            created_at: "2024-01-01T00:00:00Z",
        });
    });
});