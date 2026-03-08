import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",

        include: [
            "src/**/*.{test,spec}.{ts,tsx}",
            "tests/**/*.{test,spec}.{ts,tsx}",
        ],

        // ⬇️ Empêche Vitest de toucher aux tests Playwright
        exclude: ["tests/e2e/**"],

        setupFiles: [
            "./tests/setup/setup-react.ts",
            "./tests/setup/setup-msw.ts",
        ],

        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
        },
    },

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});