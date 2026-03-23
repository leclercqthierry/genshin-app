import { test, expect, Page } from "@playwright/test";
import { createAdminContext } from "../helpers/create-admin-context";

test.describe("Admin - ElementForm", () => {
    let page: Page;
    let cleanup: () => Promise<void>;

    test.beforeAll(async () => {
        const admin = await createAdminContext();
        page = admin.page;
        cleanup = admin.cleanup;
    });

    test.afterAll(async () => {
        await cleanup();
    });

    test("affiche correctement le formulaire de création d'élément", async () => {
        await page.goto("/admin/elements/new");

        await expect(page.getByRole("heading", { name: /Nouvel élément/i })).toBeVisible();

        await expect(page.getByLabel(/Nom de l'élément/i)).toBeVisible();

        await expect(page.getByRole("button", { name: /Importer une icône/i })).toBeVisible();

        await expect(page.getByRole("button", { name: /Ajouter l’élément/i })).toBeVisible();
    });
});