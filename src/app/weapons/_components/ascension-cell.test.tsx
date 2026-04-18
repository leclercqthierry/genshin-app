import { render, screen } from "@testing-library/react";
import AscensionCell from "./ascension-cell";

describe("AscensionCell", () => {
    it("affiche l'image, la classe de rareté et le count", () => {
        render(<table><tbody>
            <AscensionCell src="/test.png" count={5} rarity={3} setType="de mobs" />
        </tbody></table>);

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("alt", "Item de drop de mobs de rareté 3");
        expect(img).toHaveClass("bg-rarity-3");
        expect(screen.getByText("5")).toBeInTheDocument();

    });
});
