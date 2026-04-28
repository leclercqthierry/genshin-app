import { test, expect } from "@playwright/test";
import { createUserContext } from "./create-user-context";
import { Page } from "@playwright/test";

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

test("L'utilisateur peut se connecter et accéder à son espace membre", async () => {
    await page.goto("/my-account");

    await expect(
        page.getByRole("heading", { name: "Espace Membre" })
    ).toBeVisible();
});
