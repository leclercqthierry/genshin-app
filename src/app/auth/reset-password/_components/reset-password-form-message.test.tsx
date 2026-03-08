import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        useActionState: () => [
            {
                success: true,
                errors: {},
                message: "Mot de passe mis à jour avec succès !",
            },
            vi.fn(),
        ],
    };
});

import { render, screen } from "@testing-library/react";

import ResetPasswordForm from "./reset-password-form";

describe("ResetPasswordForm cas message serveur", () => {

    it("affiche le message serveur en cas de succès", async () => {

        render(<ResetPasswordForm />);

        expect(
            screen.getByText(/mot de passe mis à jour avec succès !/i)
        ).toBeInTheDocument();
    });
});