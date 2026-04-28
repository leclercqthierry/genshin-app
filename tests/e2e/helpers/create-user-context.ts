import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createTestUser } from "./create-test-user";
import { deleteTestUser } from "./delete-test-user";
import { userLogin } from "./user-login";

export async function createUserContext() {
    const storageDir = path.join(
        process.cwd(),
        "playwright/.auth-user",
        crypto.randomUUID()
    );

    const context = await chromium.launchPersistentContext(storageDir, {
        headless: true,
    });

    const page = await context.newPage();

    // 1. Créer un user unique
    const user = await createTestUser();

    // 2. Login via UI
    await userLogin(page, user.email, user.password);

    // Flag pour savoir si le test a déjà supprimé le user
    let userDeleted = false;

    function markUserDeleted() {
        userDeleted = true;
    }

    async function cleanup() {
        await context.close();

        // 3. Supprimer l’utilisateur seulement s’il existe encore
        if (!userDeleted) {
            try {
                await deleteTestUser(user.id);
            } catch (e) {
                // Si le user n'existe plus, on ignore
                if (!String(e).includes("User not found")) {
                    throw e;
                }
            }
        }

        // 4. Supprimer le storageDir
        try {
            fs.rmSync(storageDir, { recursive: true, force: true });
        } catch {
            await new Promise((r) => setTimeout(r, 200));
            fs.rmSync(storageDir, { recursive: true, force: true });
        }
    }

    return { page, cleanup, markUserDeleted };
}
