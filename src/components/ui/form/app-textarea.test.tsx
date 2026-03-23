import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";

import AppTextArea from "./app-textarea";

describe("AppTextArea", () => {
    it("renders a textarea", () => {
        render(<AppTextArea />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toBeInTheDocument();
    });

    it("applies size styles", () => {
        render(<AppTextArea size="lg" />);
        const textarea = screen.getByRole("textbox");

        // Vérifie que la classe de taille est bien appliquée
        expect(textarea.className).toContain("text-lg");
        expect(textarea.className).toContain("px-4");
        expect(textarea.className).toContain("py-3");
    });

    it("forwards props correctly", () => {
        render(<AppTextArea placeholder="Écris ici" />);
        expect(screen.getByPlaceholderText("Écris ici")).toBeInTheDocument();
    });

    it("calls onChange when typing", () => {
        const handleChange = vi.fn();
        render(<AppTextArea onChange={handleChange} />);

        const textarea = screen.getByRole("textbox");
        fireEvent.change(textarea, { target: { value: "Hello" } });

        expect(handleChange).toHaveBeenCalled();
    });

    it("forwards the ref", () => {
        const ref = createRef<HTMLTextAreaElement>();

        render(<AppTextArea ref={ref} />);

        expect(ref.current).not.toBeNull();
        expect(ref.current!.tagName).toBe("TEXTAREA");
    });
});