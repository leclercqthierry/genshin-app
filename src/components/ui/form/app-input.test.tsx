import { render, screen } from "@testing-library/react";
import AppInput from "./app-input";

describe("AppInput", () => {

    it("transmet les props natives", () => {
        render(<AppInput placeholder="Email" disabled />);
        const input = screen.getByPlaceholderText("Email");
        expect(input).toBeDisabled();
    });

});