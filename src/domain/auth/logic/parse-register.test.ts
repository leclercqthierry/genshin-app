import { describe, it, expect } from "vitest";
import { parseRegisterForm } from "./parse-register";

function makeFormData(data: Record<string, string>) {
    const fd = new FormData();
    for (const [k, v] of Object.entries(data)) fd.append(k, v);
    return fd;
}

describe("parseRegisterForm", () => {
    it("retourne une erreur si les champs sont vides", () => {
        const formData = makeFormData({
            pseudo: "",
            email: "",
            password: "",
            password2: "",
        });

        const result = parseRegisterForm(formData);

        expect(result.success).toBe(false);
    });

    it("retourne un succès si les données sont valides", () => {
        const formData = makeFormData({
            pseudo: "John",
            email: "john@example.com",
            password: "Password123!",
            password2: "Password123!",
        });

        const result = parseRegisterForm(formData);

        expect(result.success).toBe(true);
        expect(result.data).toEqual({
            pseudo: "John",
            email: "john@example.com",
            password: "Password123!",
            password2: "Password123!",
        });
    });
});