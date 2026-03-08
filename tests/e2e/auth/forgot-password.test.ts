import { expect } from "@playwright/test";
import { test } from "../base";

test.beforeEach(async ({ context }) => {
    await context.clearCookies();

});

test("la page forgot-password affiche 'Envoyer le lien'", async ({ page }) => {
    await page.goto("/auth/forgot-password");
    await expect(page.getByText(/Envoyer le lien/i)).toBeVisible();
});