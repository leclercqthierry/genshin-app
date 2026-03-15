export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { bossDropService } from "@/services/supabase/boss-drop";
import { deleteBossDropAction } from "@/domain/boss-drop/actions/delete";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import BossDropCard from "@/domain/boss-drop/card";

export default async function BossDropsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const bossDrops = await bossDropService.getAll();
    const numberOfBossDrops = bossDrops.length;

    return (
        <AdminResourcePage
            title="Gestion des drops de boss"
            description="Ces drops de boss seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfBossDrops} drop${numberOfBossDrops > 1 ? "s" : ""} de boss dans l'application.`}
            createHref="/admin/boss-drops/new"
            items={bossDrops}
            variant={"compact"}
            renderItem={(bossDrop) => (
                <BossDropCard
                    key={bossDrop.id}
                    bossDrop={bossDrop}
                    onDelete={deleteBossDropAction}
                />
            )}
        />
    );
}