import { test as base } from "@playwright/test";
import { resetBrowserState } from "./helpers/reset-browser-state";

export const test = base.extend({
    page: async ({ page, context }, run) => {
        await resetBrowserState(context, page);
        await run(page);
    },
});