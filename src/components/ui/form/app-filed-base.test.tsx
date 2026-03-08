import { render, screen } from "@testing-library/react";
import AppFieldBase from "./app-field-base";

describe("AppFieldBase", () => {
    it("associe le label et le champ via htmlFor et id", () => {
        render(
            <AppFieldBase label="Email" name="email">
                <input />
            </AppFieldBase>
        );

        const input = screen.getByRole("textbox");
        const label = screen.getByText("Email");

        expect(label).toHaveAttribute("for", "email");
        expect(input).toHaveAttribute("id", "email");
    });

    it("affiche la description et configure aria-describedby", () => {
        render(
            <AppFieldBase label="Email" name="email" description="Votre email">
                <input />
            </AppFieldBase>
        );

        const input = screen.getByRole("textbox");
        const description = screen.getByText("Votre email");

        expect(description).toHaveAttribute("id", "email-description");
        expect(input).toHaveAttribute("aria-describedby", "email-description");
    });

    it("affiche l’erreur et configure aria-invalid + aria-describedby", () => {
        render(
            <AppFieldBase label="Email" name="email" error="Invalide">
                <input />
            </AppFieldBase>
        );

        const input = screen.getByRole("textbox");
        const error = screen.getByText("Invalide");

        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-describedby", "email-error");
        expect(error).toHaveAttribute("id", "email-error");
    });

    it("priorise l’erreur sur la description", () => {
        render(
            <AppFieldBase
                label="Email"
                name="email"
                error="Invalide"
                description="Votre email"
            >
                <input />
            </AppFieldBase>
        );

        expect(screen.queryByText("Votre email")).not.toBeInTheDocument();
    });

    it("ne modifie pas un enfant non natif", () => {
        const Child = () => <div data-testid="child" />;

        render(
            <AppFieldBase label="Test" name="test">
                <Child />
            </AppFieldBase>
        );

        const child = screen.getByTestId("child");
        expect(child).not.toHaveAttribute("id");
        expect(child).not.toHaveAttribute("aria-invalid");
    });

});