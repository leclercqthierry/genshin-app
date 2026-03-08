import type { Page } from "@playwright/test";

export async function adminLogin(page: Page) {
    const email = process.env.ADMIN_TEST_MAIL;
    const password = process.env.ADMIN_TEST_PASSWORD;

    if (!email || !password) {
        throw new Error("ADMIN_TEST_MAIL ou ADMIN_TEST_PASSWORD manquant dans .env.local");
    }

    await page.goto("/auth/login");

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);

    await page.click('button[type="submit"]');

    await page.waitForURL("/admin");

    const url = page.url();
    if (!url.startsWith("http://localhost:3000/admin")) {
        throw new Error(`Connexion admin échouée, redirigé vers : ${url}`);
    }
}