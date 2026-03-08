import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        useActionState: () => [
            {
                success: false,
                errors: {
                    password: ["Mot de passe trop faible"],
                    password2: ["Les mots de passe ne correspondent pas"]
                },
                message: null,
            },
            vi.fn(),
        ],
    };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResetPasswordForm from "./reset-password-form";

describe("ResetPasswordForm cas indépendant + cas erreur serveur", () => {

    it("affiche les champs et le bouton désactivé", () => {
        render(<ResetPasswordForm />);

        expect(screen.getByLabelText(/nouveau mot de passe/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/répéter le mot de passe/i)).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "Mettre à jour" })).toBeDisabled();
    });

    it("affiche les erreurs de validation client", async () => {
        const user = userEvent.setup();
        render(<ResetPasswordForm />);

        await user.type(screen.getByLabelText(/nouveau mot de passe/i), "invalid");
        await user.click(screen.getByRole("button", { name: "Mettre à jour" }));

        expect(screen.getByText(/mot de passe trop faible/i)).toBeInTheDocument();
    });

    it("active le bouton quand le formulaire est valide", async () => {
        const user = userEvent.setup();
        render(<ResetPasswordForm />);

        await user.type(screen.getByLabelText(/nouveau mot de passe/i), "Password123?");
        await user.type(screen.getByLabelText(/répéter le mot de passe/i), "Password123?");

        expect(screen.getByRole("button", { name: "Mettre à jour" })).toBeEnabled();
    });

    it("affiche les erreurs serveur", async () => {
        render(<ResetPasswordForm />);

        expect(screen.getByText("Mot de passe trop faible")).toBeInTheDocument();
        expect(screen.getByText("Les mots de passe ne correspondent pas")).toBeInTheDocument();
    });
});