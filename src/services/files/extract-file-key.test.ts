import { describe, it, expect } from "vitest";
import { extractFileKey } from './extract-file-key';

describe("extractFileKey", () => {
    it("extrait la dernière partie d'une URL complète", () => {
        expect(
            extractFileKey("https://uploadthing.com/f/abc123")
        ).toBe("abc123");
    });

    it("extrait la dernière partie d'un chemin relatif", () => {
        expect(
            extractFileKey("/uploads/images/photo.png")
        ).toBe("photo.png");
    });

    it("retourne la chaîne telle quelle si aucun slash", () => {
        expect(extractFileKey("file.png")).toBe("file.png");
    });

    it("retourne une chaîne vide si l'URL finit par un slash", () => {
        expect(extractFileKey("https://x/y/z/")).toBe("");
    });
});