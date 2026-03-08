import { render, screen } from "@testing-library/react";
import AppFormSection from "./app-form-section";

describe("AppFormSection", () => {
    it("affiche le titre si fourni", () => {
        render(<AppFormSection title="Infos">Contenu</AppFormSection>);
        expect(screen.getByText("Infos")).toBeInTheDocument();
    });

    it("n'affiche pas de titre si non fourni", () => {
        render(<AppFormSection>Contenu</AppFormSection>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

});