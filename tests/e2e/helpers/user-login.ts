import type { Page } from "@playwright/test";

// NB: Est testé indirectement en E2E car utilisé (via createUserContext) dans le beforeAll
// l'éxécution du beforeAll valide la réussite de userLogin
export async function userLogin(page: Page, email: string, password: string) {

    await page.goto("/auth/login");

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);

    await page.click('button[type="submit"]');

    // L’utilisateur doit être redirigé vers /my-account
    await page.waitForURL("/my-account", { timeout: 10000 });

    const url = page.url();
    if (!url.startsWith("http://localhost:3000/my-account")) {
        throw new Error(`Connexion user échouée, redirigé vers : ${url}`);
    }
}
