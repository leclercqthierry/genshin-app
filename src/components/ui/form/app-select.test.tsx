import { render, screen } from "@testing-library/react";
import AppSelect from "./app-select";

import { fireEvent } from "@testing-library/react";

describe("AppSelect", () => {
    test("rend les options et change de valeur", () => {
        render(
            <AppSelect
                defaultValue="3"
                options={[
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                ]}
            />
        );

        const select = screen.getByRole("combobox");

        expect(select).toHaveValue("3");

        fireEvent.change(select, { target: { value: "4" } });

        expect(select).toHaveValue("4");
    });

});