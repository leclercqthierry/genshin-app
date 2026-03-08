import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        useActionState: () => [
            {
                success: false,
                errors: {
                    email: ["Email déjà utilisé"],
                    password: ["Mot de passe trop faible"],
                },
                message: null,
            },
            vi.fn(),
        ],
    };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterForm from "./register-form";


describe("RegisterForm", () => {

    it("affiche les champs et le bouton désactivé", () => {
        render(<RegisterForm />);

        expect(screen.getByLabelText(/pseudo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^mot de passe\b/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/répéter le mot de passe/i)).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "S'inscrire" })).toBeDisabled();
    });

    it("affiche les erreurs de validation client", async () => {
        const user = userEvent.setup();
        render(<RegisterForm />);

        await user.type(screen.getByLabelText(/email/i), "invalid");
        await user.click(screen.getByRole("button", { name: "S'inscrire" }));

        expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
    });

    it("active le bouton quand le formulaire est valide", async () => {
        const user = userEvent.setup();
        render(<RegisterForm />);

        await user.type(screen.getByLabelText(/pseudo/i), "Thierry");
        await user.type(screen.getByLabelText(/email/i), "thierry@example.com");
        await user.type(screen.getByLabelText(/^mot de passe\b/i), "Password123?");
        await user.type(screen.getByLabelText(/répéter le mot de passe/i), "Password123?");

        expect(screen.getByRole("button", { name: "S'inscrire" })).toBeEnabled();
    });

    it("affiche les erreurs serveur", async () => {
        render(<RegisterForm />);

        expect(screen.getByText("Email déjà utilisé")).toBeInTheDocument();
        expect(screen.getByText("Mot de passe trop faible")).toBeInTheDocument();
    });
});