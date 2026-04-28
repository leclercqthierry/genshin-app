import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { createUserContext } from "./helpers/create-user-context";

let page: Page;
let cleanup: () => Promise<void>;
let markUserDeleted: () => void;

test.beforeAll(async () => {
    const ctx = await createUserContext();
    page = ctx.page;
    cleanup = ctx.cleanup;
    markUserDeleted = ctx.markUserDeleted;
});

test.afterAll(async () => {
    await cleanup();
});

test("L'utilisateur peut supprimer son compte", async () => {

    await page.goto("/my-account");
    await page.getByRole("button", { name: /supprimer mon compte/i }).click();
    await expect(page).toHaveURL("/delete-account-success");
    await expect(page.getByText(/Votre compte a été supprimé avec succès./i)).toBeVisible();

    // IMPORTANT : empêcher cleanup() de supprimer un user déjà supprimé
    markUserDeleted();
});
