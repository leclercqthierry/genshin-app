import { expect } from "@playwright/test";
import { test } from "../base";

test.beforeEach(async ({ context }) => {
    await context.clearCookies();
});

test("la page reset-password affiche 'Réinitialiser le mot de passe'", async ({ page }) => {
    await page.goto("/auth/reset-password");
    await expect(page.getByText(/Réinitialiser le mot de passe/i)).toBeVisible();
});