export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { getBossDrops } from "@/services/supabase/boss-drop";
import { deleteBossDropAction } from "@/domain/boss-drop/actions/delete";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import BossDropCard from "@/domain/boss-drop/card";

export default async function BossDropsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const bossDrops = await getBossDrops();

    return (
        <AdminResourcePage
            title="Gestion des drops de boss"
            description="Ces drops de boss seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
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