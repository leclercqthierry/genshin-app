import { test, expect, Page } from "@playwright/test";
import { createAdminContext } from "../helpers/create-admin-context";

test.describe("Admin - LocalMaterialForm", () => {
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

    test("affiche correctement le formulaire de création de ressource locale", async () => {
        await page.goto("/admin/local-materials/new");

        await expect(page.getByRole("heading", { name: /Nouvelle ressource locale/i })).toBeVisible();

        await expect(page.getByLabel(/Nom de la ressource locale/i)).toBeVisible();

        await expect(page.getByRole("button", { name: /Importer une icône/i })).toBeVisible();

        await expect(page.getByRole("button", { name: /Ajouter la ressource locale/i })).toBeVisible();
    });
});