import GalleryControls from "@/components/ui/gallery-controls";
import { render } from "@testing-library/react";

describe("GalleryControls", () => {
    it("affiche uniquement les raretés autorisées", () => {
        const { getByText, queryByText } = render(
            <GalleryControls
                sortBy="name"
                onSortChange={() => { }}
                sortOptions={[
                    { value: "name", label: "Trier par nom" },
                    { value: "rarity", label: "Trier par rareté" },
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
                ]}
            />
        );

        expect(getByText("⭐⭐⭐")).toBeInTheDocument();
        expect(getByText("⭐⭐⭐⭐")).toBeInTheDocument();
        expect(getByText("⭐⭐⭐⭐⭐")).toBeInTheDocument();

        expect(queryByText("⭐")).toBeNull();
        expect(queryByText("⭐⭐")).toBeNull();
    });
});
