import { render } from "@testing-library/react";
import ArtifactSetDetail from "./detail";
import { ArtifactSet } from "@/domain/artifact-set/types";

describe("ArtifactSetDetail", () => {
    const artifactSet: ArtifactSet = {
        id: 1,
        name: "Set du Gladiateur",
        rarityMax: 5,
        iconFlowerUrl: "/flower.png",
        iconPlumeUrl: "/plume.png",
        iconSandUrl: "/sand.png",
        iconGobletUrl: "/goblet.png",
        iconCircletUrl: "/circlet.png",
        bonus2P: "ATQ +18%",
        bonus4P: "Bonus dégâts normaux +35%",
        createdAt: "2024-01-01T00:00:00Z",
    };

    it("affiche le nom du set", () => {
        const { getByText } = render(<ArtifactSetDetail artifactSet={artifactSet} />);
        expect(getByText("Set du Gladiateur")).toBeInTheDocument();
    });

    it("affiche la rareté max sous forme d'étoiles", () => {
        const { getByText } = render(<ArtifactSetDetail artifactSet={artifactSet} />);
        expect(getByText("⭐⭐⭐⭐⭐")).toBeInTheDocument();
    });

    it("affiche les 5 pièces avec les bonnes images", () => {
        const { getByAltText } = render(<ArtifactSetDetail artifactSet={artifactSet} />);

        // Ici ne pas oublier que Image transforme l'url donc on vérifie juste ceci
        expect(getByAltText("Set du Gladiateur – Fleur").getAttribute("src"))
            .toContain("flower.png");
        expect(getByAltText("Set du Gladiateur – Plume").getAttribute("src"))
            .toContain("plume.png");
        expect(getByAltText("Set du Gladiateur – Sablier").getAttribute("src"))
            .toContain("sand.png");
        expect(getByAltText("Set du Gladiateur – Coupe").getAttribute("src"))
            .toContain("goblet.png");
        expect(getByAltText("Set du Gladiateur – Couronne").getAttribute("src"))
            .toContain("circlet.png");
    });

    it("affiche les bonus 2P et 4P", () => {
        const { getByText } = render(<ArtifactSetDetail artifactSet={artifactSet} />);

        expect(getByText("2 pièces:")).toBeInTheDocument();
        expect(getByText("ATQ +18%")).toBeInTheDocument();

        expect(getByText("4 pièces:")).toBeInTheDocument();
        expect(getByText("Bonus dégâts normaux +35%")).toBeInTheDocument();
    });
});
