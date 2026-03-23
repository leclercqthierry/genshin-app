import { chromium } from "@playwright/test";
import type { BrowserContext, Page } from "@playwright/test";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { adminLogin } from "./admin-login";

export interface AdminTestContext {
    context: BrowserContext;
    page: Page;
    cleanup: () => Promise<void>;
}

export async function createAdminContext(): Promise<AdminTestContext> {
    // dossier unique par test
    const storageDir = path.join(
        process.cwd(),
        "playwright/.auth",
        crypto.randomUUID()
    );

    const context: BrowserContext = await chromium.launchPersistentContext(
        storageDir,
        { headless: true }
    );

    const page: Page = await context.newPage();

    await adminLogin(page);

    async function cleanup(): Promise<void> {
        await context.close();

        // suppression safe
        try {
            fs.rmSync(storageDir, { recursive: true, force: true });
        } catch {
            // Windows peut garder un fichier ouvert quelques ms
            await new Promise((r) => setTimeout(r, 200));
            fs.rmSync(storageDir, { recursive: true, force: true });
        }
    }

    return { context, page, cleanup };
}