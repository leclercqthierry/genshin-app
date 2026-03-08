import { defineConfig, devices } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",

    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        // 👇 ceci est CRUCIAL
        testIdAttribute: "data-testid",
        // 👇 et surtout ceci :
        launchOptions: {},
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],

    webServer: {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: true
    },
    // 👇 ceci force Playwright à utiliser le bon tsconfig
    metadata: {
        tsconfig: path.join(__dirname, "tests/e2e/tsconfig.json")
    },

});