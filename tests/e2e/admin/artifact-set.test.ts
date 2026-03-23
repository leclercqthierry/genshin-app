import { test, expect, Page } from "@playwright/test";
import { createAdminContext } from "../helpers/create-admin-context";

test.describe("Admin - ArtifactSetForm", () => {
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

    test("affiche correctement le formulaire de création de set d'artéfacts'", async () => {
        await page.goto("/admin/artifact-sets/new");

        await expect(page.getByRole("heading", { name: /Nouveau set d'artéfacts/i })).toBeVisible();

        await expect(page.getByLabel(/Nom du set/i)).toBeVisible();

        await expect(page.getByLabel(/Rareté maximale du set/i)).toBeVisible();


        const buttons = await page.getByRole("button", { name: "Importer une icône" }).all();
        expect(buttons.length).toBe(5);

        for (const button of buttons) {
            await expect(button).toBeVisible();
        }

        await expect(page.getByLabel(/2 pièces/i)).toBeVisible();
        await expect(page.getByLabel(/4 pièces/i)).toBeVisible();


        await expect(page.getByRole("button", { name: /Ajouter le set d'artéfacts/i })).toBeVisible();
    });
});