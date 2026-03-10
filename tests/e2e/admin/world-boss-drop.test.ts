import { test, expect, Page } from "@playwright/test";
import { createAdminContext } from "../helpers/create-admin-context";

test.describe("Admin - WorldBossDropForm", () => {
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

    test("affiche correctement le formulaire de création de drop", async () => {
        await page.goto("/admin/world-boss-drops/new");

        await expect(page.getByRole("heading", { name: /Nouveau drop de boss de monde/i })).toBeVisible();

        await expect(page.getByLabel(/Nom du drop de boss de monde/i)).toBeVisible();

        await expect(page.getByRole("button", { name: /Importer une icône/i })).toBeVisible();

        await expect(page.getByRole("button", { name: /Ajouter le drop de boss de monde/i })).toBeVisible();
    });
});