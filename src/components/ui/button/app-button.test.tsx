import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppButton from "@/components/ui/button/app-button";

describe("AppButton", () => {
    it("rend un bouton par défaut", () => {
        render(<AppButton>Cliquer</AppButton>);
        const button = screen.getByRole("button", { name: "Cliquer" });
        expect(button).toBeInTheDocument();
    });

    it("appelle onClick quand il est cliquable", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(<AppButton onClick={onClick}>OK</AppButton>);

        await user.click(screen.getByRole("button", { name: "OK" }));

        expect(onClick).toHaveBeenCalled();
    });

    it("n'appelle pas onClick quand disabled", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(
            <AppButton disabled onClick={onClick}>
                OK
            </AppButton>
        );

        await user.click(screen.getByRole("button", { name: "OK" }));

        expect(onClick).not.toHaveBeenCalled();
    });

    it("affiche 'Chargement...' quand loading", () => {
        render(<AppButton loading>OK</AppButton>);
        expect(screen.getByRole("button")).toHaveTextContent("Chargement...");
    });

    it("rend un lien quand href est fourni", () => {
        render(<AppButton href="/test">Aller</AppButton>);
        const link = screen.getByRole("link", { name: "Aller" });
        expect(link).toBeInTheDocument();
    });

    it("n'appelle pas onClick sur un lien disabled", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(
            <AppButton href="/test" disabled onClick={onClick}>
                Aller
            </AppButton>
        );

        await user.click(screen.getByRole("link", { name: "Aller" }));

        expect(onClick).not.toHaveBeenCalled();
    });

    it("rend le lien disabled non focusable", () => {
        render(<AppButton href="/test" disabled>Aller</AppButton>);
        const link = screen.getByRole("link", { name: "Aller" });
        expect(link).toHaveAttribute("tabindex", "-1");
    });

    it("désactive le lien en loading", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(<AppButton href="/test" loading onClick={onClick}>Go</AppButton>);

        await user.click(screen.getByRole("link", { name: "Chargement..." }));

        expect(onClick).not.toHaveBeenCalled();
    });

    it("fusionne les classes personnalisées", () => {
        render(<AppButton className="custom">OK</AppButton>);
        expect(screen.getByRole("button")).toHaveClass("custom");
    });

    it("applique la taille md par défault", () => {
        render(
            <AppButton>OK</AppButton>
        );
        expect(screen.getByRole("button")).toHaveClass("text-base");
    });

    it("applique la taille sm", () => {
        render(
            <AppButton size="sm">OK</AppButton>
        );
        expect(screen.getByRole("button")).toHaveClass("text-sm");
    });

    it("applique la taille lg", () => {
        render(
            <AppButton size="lg">OK</AppButton>
        );
        expect(screen.getByRole("button")).toHaveClass("text-lg");
    });

    it("applique le variant primary par défaut", () => {
        render(
            <AppButton>OK</AppButton>
        );
        expect(screen.getByRole("button")).toHaveClass("bg-[var(--color-gold)]");
    });

    it("applique le variant secondary", () => {
        render(
            <AppButton variant="secondary">OK</AppButton>
        );
        expect(screen.getByRole("button")).toHaveClass("bg-blue-600");
    });

    it("applique le variant ghost", () => {
        render(
            <AppButton variant="ghost">OK</AppButton>
        );
        expect(screen.getByRole("button")).toHaveClass("bg-transparent");
    });

    it("applique le variant danger", () => {
        render(
            <AppButton variant="danger">OK</AppButton>
        );
        expect(screen.getByRole("button")).toHaveClass("bg-red-600");
    });

});