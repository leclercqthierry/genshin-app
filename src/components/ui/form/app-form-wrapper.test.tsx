import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppFormWrapper from "./app-form-wrapper";

describe("AppFormWrapper", () => {
    it("rend un formulaire", () => {
        const { container } = render(<AppFormWrapper>Contenu</AppFormWrapper>);
        const form = container.querySelector("form");
        expect(form).toBeInTheDocument();
    });

    it("appelle onSubmit", async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn((e) => e.preventDefault());

        render(
            <AppFormWrapper onSubmit={onSubmit}>
                <button type="submit">OK</button>
            </AppFormWrapper>
        );


        await user.click(screen.getByRole("button", { name: /ok/i }));

        expect(onSubmit).toHaveBeenCalled();
    });

});