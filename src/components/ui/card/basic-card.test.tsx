import { render, screen } from "@testing-library/react";
import BasicCard from "./basic-card";

describe("BasicCard", () => {
    it("rend un lien si href est fourni", () => {
        render(<BasicCard title="Test" image="/img.png" href="/test" />);
        expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("rend un div si href n'est pas fourni", () => {
        render(<BasicCard title="Test" image="/img.png" />);
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
});