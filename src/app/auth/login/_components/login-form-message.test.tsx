import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        useActionState: () => [
            {
                success: false,
                errors: {},
                message: "Compte désactivé",
                role: null,
            },
            vi.fn(),
        ],
    };
});

import { render, screen } from "@testing-library/react";

import LoginForm from "./login-form";

describe("LoginForm – message serveur", () => {

    it("affiche le message serveur", () => {
        render(<LoginForm />);
        expect(screen.getByText(/compte désactivé/i)).toBeInTheDocument();
    });
});