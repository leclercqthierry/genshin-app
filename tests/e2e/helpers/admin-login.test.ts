import { test, expect, chromium } from "@playwright/test";
import type { BrowserContext, Page } from "@playwright/test";
import { adminLogin } from "./admin-login";

test.describe("Helper - loginAsAdmin", () => {
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async () => {
        context = await chromium.launchPersistentContext("", {
            headless: true,
        });

        page = await context.newPage();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test("connecte correctement un admin et redirige vers /admin", async () => {
        await adminLogin(page);

        // Vérifie la redirection réelle
        await expect(page).toHaveURL(/\/admin$/);

        // Vérifie qu’un élément propre à l’admin est visible
        await expect(page.getByText(/Espace Admin/i)).toBeVisible();
    });
});