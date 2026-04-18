import { render, fireEvent } from "@testing-library/react";
import GalleryControls from "@/components/ui/gallery-controls";

describe("GalleryControls", () => {
    it("affiche les options de tri et de filtres et déclenche les callbacks", () => {
        const onSortChange = vi.fn();
        const onRarityChange = vi.fn();

        const { getByText, getAllByRole } = render(
            <GalleryControls
                sortBy="name"
                onSortChange={onSortChange}
                sortOptions={[
                    { value: "name", label: "Trier par nom" },
                    { value: "rarity", label: "Trier par rareté" },
                ]}
                filters={[
                    {
                        key: "rarity",
                        value: "all",
                        onChange: onRarityChange,
                        options: [
                            { value: "all", rawValue: "all", label: "Toutes les raretés" },
                            { value: "3", rawValue: 3, label: "⭐⭐⭐" },
                            { value: "4", rawValue: 4, label: "⭐⭐⭐⭐" },
                        ],
                    },
                ]}
            />
        );

        // Vérifie l'affichage des options
        expect(getByText("Trier par nom")).toBeInTheDocument();
        expect(getByText("Trier par rareté")).toBeInTheDocument();
        expect(getByText("⭐⭐⭐")).toBeInTheDocument();

        // Simule un changement de filtre
        const selects = getAllByRole("combobox");
        fireEvent.change(selects[1], { target: { value: "3" } });

        // Vérifie que rawValue est bien envoyé
        expect(onRarityChange).toHaveBeenCalledWith(3);
    });
});
