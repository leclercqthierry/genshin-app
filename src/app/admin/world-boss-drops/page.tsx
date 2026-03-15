export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { worldBossDropService } from "@/services/supabase/world-boss-drop";
import { deleteWorldBossDropAction } from "@/domain/world-boss-drop/actions/delete";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import WorldBossDropCard from "@/domain/world-boss-drop/card";

export default async function WorldBossDropsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const worldBossDrops = await worldBossDropService.getAll();
    const numberOfWorldBossDrops = worldBossDrops.length;

    return (
        <AdminResourcePage
            title="Gestion des drops de boss de monde"
            description="Ces drops de boss de monde seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfWorldBossDrops} drop${numberOfWorldBossDrops > 1 ? "s" : ""} de boss de monde dans l'application.`}
            createHref="/admin/world-boss-drops/new"
            items={worldBossDrops}
            variant={"compact"}
            renderItem={(worldBossDrop) => (
                <WorldBossDropCard
                    key={worldBossDrop.id}
                    worldBossDrop={worldBossDrop}
                    onDelete={deleteWorldBossDropAction}
                />
            )}
        />
    );
}