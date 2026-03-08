import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardActions from "./card-actions";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}));

// Mock de useTransition
vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");
    return {
        ...actual,
        useTransition: () => [false, (fn: () => void) => fn()],
    };
});

describe("CardActions", () => {
    const mockDelete = vi.fn();
    const mockRefresh = vi.fn();

    beforeEach(() => {
        mockDelete.mockReset();
        mockRefresh.mockReset();

        vi.mocked(useRouter).mockReturnValue({
            refresh: mockRefresh,
        } as never);

        vi.spyOn(window, "confirm").mockReturnValue(true);
    });

    it("n'appelle pas deleteAction si l'utilisateur annule la confirmation", async () => {
        vi.spyOn(window, "confirm").mockReturnValue(false);

        render(
            <CardActions
                editHref="/edit"
                deleteAction={mockDelete}
                elementId={42}
            />
        );

        await userEvent.click(screen.getByRole("button", { name: "Supprimer" }));

        expect(mockDelete).not.toHaveBeenCalled();
        expect(mockRefresh).not.toHaveBeenCalled();
    });

    it("appelle deleteAction avec un FormData contenant l'id", async () => {
        render(
            <CardActions
                editHref="/edit"
                deleteAction={mockDelete}
                elementId={42}
            />
        );

        await userEvent.click(screen.getByRole("button", { name: "Supprimer" }));

        expect(mockDelete).toHaveBeenCalledTimes(1);

        const formData = mockDelete.mock.calls[0][0] as FormData;
        expect(formData.get("id")).toBe("42");
    });

    it("appelle router.refresh après la suppression", async () => {
        render(
            <CardActions
                editHref="/edit"
                deleteAction={mockDelete}
                elementId={42}
            />
        );

        await userEvent.click(screen.getByRole("button", { name: "Supprimer" }));

        expect(mockRefresh).toHaveBeenCalled();
    });
});