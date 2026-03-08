import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        useActionState: () => [
            {
                success: false,
                errors: {
                    email: ["Email inconnu"],
                    password: ["Mot de passe incorrect"],
                },
                message: null,
                role: null,
            },
            vi.fn(),
        ],
    };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./login-form";

describe("LoginForm cas indépendant + cas erreur serveur", () => {

    it("affiche les champs et le bouton désactivé", () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "Se connecter" })).toBeDisabled();
    });

    it("affiche les erreurs de validation client", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        await user.type(screen.getByLabelText(/email/i), "invalid");
        await user.click(screen.getByRole("button", { name: "Se connecter" }));

        expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
    });

    it("active le bouton quand le formulaire est valide", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        await user.type(screen.getByLabelText(/email/i), "thierry@example.com");
        await user.type(screen.getByLabelText(/mot de passe/i), "Password123?");

        expect(screen.getByRole("button", { name: "Se connecter" })).toBeEnabled();
    });

    it("affiche les erreurs serveur", () => {

        render(<LoginForm />);

        expect(screen.getByText("Email inconnu")).toBeInTheDocument();
        expect(screen.getByText("Mot de passe incorrect")).toBeInTheDocument();
    });
});

