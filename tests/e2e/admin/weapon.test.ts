import { test, expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { createAdminContext } from "../helpers/create-admin-context";

test.describe("Admin - WeaponForm", async () => {

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

    test("un admin peut accéder à la page de création d'arme", async () => {

        await page.goto("/admin/weapons/new");

        await expect(
            page.getByRole("heading", { name: "Nouvelle arme" })
        ).toBeVisible();

        await cleanup();
    });

    test("un admin peut accéder à la page d'édition d'une arme", async () => {

        await page.goto("/admin/weapons/2/edit");

        await expect(
            page.getByRole("heading", { name: "Modifier l'arme" })
        ).toBeVisible();

        await cleanup();
    });


});