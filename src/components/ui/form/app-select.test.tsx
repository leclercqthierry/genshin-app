import { render, screen } from "@testing-library/react";
import AppSelect from "./app-select";

describe("AppSelect", () => {
    it("rend un select avec les options", () => {
        render(
            <AppSelect
                label="Pays"
                name="country"
                options={[
                    { value: "fr", label: "France" },
                    { value: "be", label: "Belgique" },
                ]}
            />
        );

        const select = screen.getByRole("combobox", { name: "Pays" });
        expect(select).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "France" })).toBeInTheDocument();
    });

});