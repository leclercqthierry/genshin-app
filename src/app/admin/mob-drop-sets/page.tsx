export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import MobDropSetCard from "@/domain/mob-drop-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { mobDropSetService } from "@/services/supabase/mob-drop-set";
import { deleteMobDropSetAction } from "@/domain/mob-drop-set/actions/delete";

export default async function MobDropSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const mobDropSets = await mobDropSetService.getAll();
    const numberOfMobDropSets = mobDropSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de drop de mobs"
            description="Ces sets de drop de mobs seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfMobDropSets} set${numberOfMobDropSets > 1 ? "s" : ""} de drops de mobs dans l'application.`}
            createHref="/admin/mob-drop-sets/new"
            items={mobDropSets}
            renderItem={(set) => (
                <MobDropSetCard
                    key={set.id}
                    set={set}
                    onDelete={deleteMobDropSetAction}
                />
            )}
        />
    );
}