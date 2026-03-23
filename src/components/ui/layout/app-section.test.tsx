import { render, screen } from "@testing-library/react";
import AppSection from "./app-section";

describe("AppFormSection", () => {
    it("affiche le titre si fourni", () => {
        render(<AppSection title="Infos">Contenu</AppSection>);
        expect(screen.getByText("Infos")).toBeInTheDocument();
    });

    it("n'affiche pas de titre si non fourni", () => {
        render(<AppSection>Contenu</AppSection>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

});