import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppFileInput from "@/components/ui/file/app-file-input";

vi.mock("@/components/ui/button/app-button", () => ({
    default: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button onClick={props.onClick} type={props.type}>
            {props.children}
        </button>
    ),
}));

describe("AppFileInput", () => {
    it("déclenche onSelect quand un fichier est choisi", async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(<AppFileInput onSelect={onSelect} />);

        // 1. L’utilisateur clique sur le bouton
        await user.click(screen.getByRole("button"));

        // 2. On simule le changement de fichier (JSDOM ne le fait pas)
        const input = screen.getByTestId("file-input");
        const file = new File(["hello"], "test.png", { type: "image/png" });

        fireEvent.change(input, { target: { files: [file] } });

        expect(onSelect).toHaveBeenCalledWith([file]);
    });
});