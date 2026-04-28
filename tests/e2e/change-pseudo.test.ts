import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { createUserContext } from "./helpers/create-user-context";

let page: Page;
let cleanup: () => Promise<void>;

test.beforeAll(async () => {
    const ctx = await createUserContext();
    page = ctx.page;
    cleanup = ctx.cleanup;
});

test.afterAll(async () => {
    await cleanup();
});

test("L'utilisateur peut changer son pseudo", async () => {

    await page.goto("/my-account");
    await page.getByRole("link", { name: /changer mon pseudo/i }).click();
    await expect(page).toHaveURL("/my-account/change-pseudo");

    const input = page.getByLabel("Nouveau pseudo");
    const newPseudo = `User${Date.now().toString().slice(-6)}`;

    await input.fill(newPseudo);
    await page.getByRole("button", { name: "Enregistrer" }).click();
    await expect(page).toHaveURL("/my-account");
    await expect(page.getByText(newPseudo)).toBeVisible();
});
