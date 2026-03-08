import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        useActionState: () => [
            {
                success: false,
                errors: {
                    email: ["Email invalide"],
                },
                message: null,
            },
            vi.fn(),
        ],
    };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ForgotPasswordForm from "./forgot-password-form";

describe("ForgotPasswordForm cas indépendant + cas erreur serveur", () => {

    it("affiche les champs et le bouton désactivé", () => {
        render(<ForgotPasswordForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Envoyer le lien" })).toBeDisabled();
    });

    it("affiche les erreurs de validation client", async () => {
        const user = userEvent.setup();
        render(<ForgotPasswordForm />);

        await user.type(screen.getByLabelText(/email/i), "invalid");
        await user.click(screen.getByRole("button", { name: "Envoyer le lien" }));

        expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
    });

    it("active le bouton quand le formulaire est valide", async () => {
        const user = userEvent.setup();
        render(<ForgotPasswordForm />);

        await user.type(screen.getByLabelText(/email/i), "test@live.fr");

        expect(screen.getByRole("button", { name: "Envoyer le lien" })).toBeEnabled();
    });

    it("affiche les erreurs serveur", async () => {
        render(<ForgotPasswordForm />);

        expect(screen.getByText("Email invalide")).toBeInTheDocument();
    });
});