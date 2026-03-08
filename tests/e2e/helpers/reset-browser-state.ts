// tests/helpers/reset-browser-state.ts
import type { BrowserContext, Page } from "@playwright/test";

export async function resetBrowserState(
    context: BrowserContext,
    page: Page
): Promise<void> {
    // Toujours aller sur une page HTTP(S) avant de nettoyer
    if (page.url() === "about:blank") {
        await page.goto("/");
    }

    // 1) Cookies
    await context.clearCookies();

    // 2) LocalStorage + sessionStorage
    await page.addInitScript(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    // 3) IndexedDB + Service Workers + Cache Storage
    await page.evaluate(async () => {
        // Service workers
        if ("serviceWorker" in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const reg of registrations) {
                await reg.unregister();
            }
        }

        // Cache Storage
        if ("caches" in window) {
            const keys = await caches.keys();
            for (const key of keys) {
                await caches.delete(key);
            }
        }

        // IndexedDB
        if ("indexedDB" in window && indexedDB.databases) {
            const databases = await indexedDB.databases();
            for (const db of databases) {
                if (db.name) indexedDB.deleteDatabase(db.name);
            }
        }
    });
}