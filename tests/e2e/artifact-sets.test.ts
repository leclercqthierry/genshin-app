import { test, expect } from "@playwright/test";

test.describe("Artifact Sets – Galerie → Détail", () => {
    test("un clic sur un set ouvre la page détail correspondante", async ({ page }) => {
        // 1) Aller sur la galerie
        await page.goto("/artifact-sets");

        // Vérifier le titre
        await expect(
            page.getByRole("heading", { name: /Gallerie de sets d'artéfacts/i })
        ).toBeVisible();

        // cibler uniquement les liens de sets
        const firstCard = page.locator('a[href^="/artifact-sets/"]').first();

        // récupérer l'URL exacte du set
        const setUrl = (await firstCard.getAttribute("href"))!;

        // récupérer le nom du set dans la carte
        const setName = await firstCard.locator("h2, h3, p").first().innerText();

        // clic
        await firstCard.click();
        await page.waitForURL(setUrl);

        // vérifier que le Hero affiche le bon nom
        await expect(
            page.getByRole("heading", { name: new RegExp(setName, "i") })
        ).toBeVisible();

        // vérifier les bonus
        await expect(page.getByText(/2 pièces/i)).toBeVisible();
        await expect(page.getByText(/4 pièces/i)).toBeVisible();

        // vérifier qu'au moins une image est visible
        await expect(page.getByRole("img").first()).toBeVisible();
    });
});