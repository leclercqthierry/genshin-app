import { test, expect } from "@playwright/test";

test.describe("Weapons - Gallerie -> Détails", () => {

    test("la galerie d'armes s'affiche correctement", async ({ page }) => {
        await page.goto("/weapons");

        // La page charge
        await expect(page.getByRole("heading", { name: "Gallerie d'armes" })).toBeVisible();

        // Le select de tri est présent (option fiable)
        await expect(page.getByRole("option", { name: "Trier par nom" })).toBeVisible();

        // Au moins une carte ou l'état vide
        const cards = page.locator("a[href^='/weapons/']");
        const emptyState = page.getByText("Aucune arme ne correspond à vos filtres.");

        await expect(cards.or(emptyState)).toBeVisible();
    });

});