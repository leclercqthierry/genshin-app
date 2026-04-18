import { render, screen } from "@testing-library/react";
import { WeaponAscensionTable } from "./ascension-table";

// Mock Next/Image
vi.mock("next/image", () => ({
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    default: (props: Record<string, unknown>) => <img {...props} />,
}));


// Mock returnUrl
vi.mock("@/lib/utils/return-url", () => ({
    returnUrl: vi.fn(() => "/fake.png"),
}));

// Mock weapon ascension data
vi.mock("@/constants/weapon-ascension-data", () => ({
    getWeaponAscensionRows: vi.fn(() => [
        { level: 20, dungeonCount: 5, eliteCount: 5, mobCount: 3, mora: "10 000" },
    ]),
    itemRarityByLevel: {
        20: { dungeon: 2, elite: 3, mob: 1 },
    },
}));

describe("WeaponAscensionTable", () => {
    it("rend les lignes d'ascension et les en-têtes", () => {
        const elevationSet = {
            id: 3,
            name: "elevation test",
            rarity2Url: "http://www.example.elevation_r2.png",
            rarity3Url: "http://www.example.elevation_r3.png",
            rarity4Url: "http://www.example.elevation_r4.png",
            rarity5Url: "http://www.example.elevation_r5.png",
            farmDaysIndex: 1,
            createdAt: "2024-02-01T00:00:00Z",
        };

        const eliteSet = {
            id: 1,
            name: "elite test",
            rarity2Url: "http://www.example.elite_r2.png",
            rarity3Url: "http://www.example.elite_r3.png",
            rarity4Url: "http://www.example.elite_r4.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        const mobSet = {
            id: 5,
            name: "mob test",
            rarity1Url: "http://www.example.mob_r1.png",
            rarity2Url: "http://www.example.mob_r2.png",
            rarity3Url: "http://www.example.mob_r3.png",
            createdAt: "2024-01-01T00:00:00Z",
        };

        render(
            <WeaponAscensionTable
                weaponRarity={5}
                elevationSet={elevationSet}
                eliteSet={eliteSet}
                mobSet={mobSet}
            />
        );

        // En-têtes
        expect(screen.getByText("Seuil")).toBeInTheDocument();
        expect(screen.getByText("Donjon")).toBeInTheDocument();

        // Valeur de seuil
        expect(screen.getByText("20")).toBeInTheDocument();

        // Valeur de Mora
        expect(screen.getByText("10 000")).toBeInTheDocument();

        // 3 images (1 ligne * 3 colonnes)
        expect(screen.getAllByRole("img")).toHaveLength(3);
    });
});
