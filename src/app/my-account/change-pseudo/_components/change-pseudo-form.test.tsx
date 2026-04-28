import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChangePseudoForm } from "./change-pseudo-form";
import { changePseudo } from "../actions/change-pseudo";

vi.mock("../actions/change-pseudo", () => ({
    changePseudo: vi.fn(),
}));

describe("ChangePseudoForm", () => {
    it("affiche le pseudo par défaut", () => {
        render(<ChangePseudoForm defaultPseudo="Toto" />);

        const input = screen.getByLabelText(/Nouveau pseudo/i);
        expect(input).toHaveValue("Toto");
    });

    it("désactive le bouton si pseudo identique", () => {
        render(<ChangePseudoForm defaultPseudo="Toto" />);

        const button = screen.getByRole("button", { name: "Enregistrer" });
        expect(button).toBeDisabled();
    });

    it("désactive le bouton si pseudo invalide", () => {
        render(<ChangePseudoForm defaultPseudo="Toto" />);

        const input = screen.getByLabelText(/Nouveau pseudo/i);
        fireEvent.change(input, { target: { value: "!!" } });

        const button = screen.getByRole("button", { name: "Enregistrer" });
        expect(button).toBeDisabled();

        expect(screen.getByText("Le pseudo doit contenir au moins 3 caractères."))
            .toBeInTheDocument();
    });

    it("active le bouton si pseudo valide et modifié", () => {
        render(<ChangePseudoForm defaultPseudo="Toto" />);

        const input = screen.getByLabelText(/Nouveau pseudo/i);
        fireEvent.change(input, { target: { value: "Toto123" } });

        const button = screen.getByRole("button", { name: "Enregistrer" });
        expect(button).not.toBeDisabled();
    });

    it("appelle changePseudo quand le formulaire est valide", () => {
        render(<ChangePseudoForm defaultPseudo="Toto" />);

        const input = screen.getByLabelText(/Nouveau pseudo/i);
        fireEvent.change(input, { target: { value: "Toto123" } });

        const form = document.querySelector("form"); // AppFormWrapper génère un <form>
        expect(form).not.toBeNull();

        fireEvent.submit(form!);

        expect(changePseudo).toHaveBeenCalled();
    });
});
