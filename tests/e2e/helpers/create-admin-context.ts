import { chromium } from "@playwright/test";
import type { BrowserContext, Page } from "@playwright/test";
import fs from "fs";
import { adminLogin } from "./admin-login";

export interface AdminTestContext {
    context: BrowserContext;
    page: Page;
    cleanup: () => Promise<void>;
}

export async function createAdminContext(): Promise<AdminTestContext> {
    const storageDir = "playwright/.auth";

    const context: BrowserContext = await chromium.launchPersistentContext(
        storageDir,
        { headless: true }
    );

    const page: Page = await context.newPage();

    await adminLogin(page);

    async function cleanup(): Promise<void> {
        await context.close();
        fs.rmSync(storageDir, { recursive: true, force: true });
    }

    return { context, page, cleanup };
}