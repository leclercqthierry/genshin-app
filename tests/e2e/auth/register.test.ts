import { expect } from "@playwright/test";
import { test } from "../base";
import { resetBrowserState } from "../helpers/reset-browser-state";

test.beforeEach(async ({ context, page }) => {
    await resetBrowserState(context, page);
});


test("la page register affiche 'Créer un compte'", async ({ page }) => {
    await page.goto("/auth/register");
    await expect(page.getByText(/Créer un compte/i)).toBeVisible();
});