import { render, screen } from "@testing-library/react";
import NavLink from "@/components/ui/navigation/nav-link";
import { usePathname } from "next/navigation";

vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
}));

describe("NavLink", () => {
    it("ajoute aria-current='page' quand le lien est actif", () => {
        vi.mocked(usePathname).mockReturnValue("/dashboard");

        render(<NavLink href="/dashboard">Dashboard</NavLink>);

        expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
    });

    it("n'ajoute pas aria-current quand le lien n'est pas actif", () => {
        vi.mocked(usePathname).mockReturnValue("/settings");

        render(<NavLink href="/dashboard">Dashboard</NavLink>);

        expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
    });
});