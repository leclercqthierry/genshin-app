import { expect } from "@playwright/test";
import { test } from "../base";

test.beforeEach(async ({ context }) => {
    await context.clearCookies();
});

test("la page account-confirmed affiche 'Votre compte a été activé avec succès.'", async ({ page }) => {
    await page.goto("/auth/account-confirmed");
    await expect(page.getByText(/Votre compte a été activé avec succès./i)).toBeVisible();
});