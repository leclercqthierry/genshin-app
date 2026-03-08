import { render, screen } from "@testing-library/react";
import AppCard from "./app-card";

describe("AppCard", () => {
    it("rend un lien si href est fourni", () => {
        render(
            <AppCard href="/test">
                <span>Contenu</span>
            </AppCard>
        );

        expect(screen.getByRole("link")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
    });

    it("rend un div si href n'est pas fourni", () => {
        render(
            <AppCard>
                <span>Contenu</span>
            </AppCard>
        );

        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
});