import { render } from "@testing-library/react";
import GalleryControls from "@/components/ui/gallery-controls";

describe("WeaponsGalleryClient – GalleryControls", () => {
    it("affiche uniquement les raretés et types autorisés", () => {
        const { getByText, queryByText } = render(
            <GalleryControls
                sortBy="name"
                onSortChange={() => { }}
                sortOptions={[
                    { value: "name", label: "Trier par nom" },
                    { value: "rarity", label: "Trier par rareté" },
                    { value: "weaponType", label: "Trier par type d'arme" },
                ]}
                filters={[
                    {
                        key: "rarity",
                        value: "all",
                        onChange: () => { },
                        options: [
                            { value: "all", rawValue: "all", label: "Toutes les raretés" },
                            { value: "3", rawValue: 3, label: "⭐⭐⭐" },
                            { value: "4", rawValue: 4, label: "⭐⭐⭐⭐" },
                            { value: "5", rawValue: 5, label: "⭐⭐⭐⭐⭐" },
                        ],
                    },
                    {
                        key: "weaponType",
                        value: "all",
                        onChange: () => { },
                        options: [
                            { value: "all", rawValue: "all", label: "Tous les types" },
                            { value: "Épée", rawValue: "Épée", label: "Épée" },
                            { value: "Arc", rawValue: "Arc", label: "Arc" },
                            { value: "Claymore", rawValue: "Claymore", label: "Claymore" },
                            { value: "Catalyseur", rawValue: "Catalyseur", label: "Catalyseur" },
                            { value: "Arme d'hast", rawValue: "Arme d'hast", label: "Arme d'hast" },
                        ],
                    },
                ]}
            />
        );

        // Vérifie les raretés autorisées
        expect(getByText("⭐⭐⭐")).toBeInTheDocument();
        expect(getByText("⭐⭐⭐⭐")).toBeInTheDocument();
        expect(getByText("⭐⭐⭐⭐⭐")).toBeInTheDocument();

        // Vérifie les types d’armes autorisés
        expect(getByText("Épée")).toBeInTheDocument();
        expect(getByText("Arc")).toBeInTheDocument();
        expect(getByText("Claymore")).toBeInTheDocument();
        expect(getByText("Catalyseur")).toBeInTheDocument();
        expect(getByText("Arme d'hast")).toBeInTheDocument();

        // Vérifie que des valeurs non autorisées n’apparaissent pas
        expect(queryByText("1⭐")).toBeNull();
        expect(queryByText("2⭐")).toBeNull();
        expect(queryByText("Fusil")).toBeNull();
    });
});
