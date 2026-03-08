import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        useActionState: () => [
            {
                success: false,
                errors: {},
                message: "Impossible d'envoyer l'email de réinitialisation.",
            },
            vi.fn(),
        ],
    };
});

import { render, screen } from "@testing-library/react";

import ForgotPasswordForm from "./forgot-password-form";

describe("ForgotPasswordForm cas message serveur", () => {

    it("affiche les erreurs serveur", async () => {
        render(<ForgotPasswordForm />);

        expect(screen.getByText("Impossible d'envoyer l'email de réinitialisation.")).toBeInTheDocument();
    });
});