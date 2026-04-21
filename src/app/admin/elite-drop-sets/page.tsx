export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import EliteDropSetCard from "@/domain/elite-drop-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { makeEliteDropSetAdminService } from "@/services/supabase/elite-drop-set";
import { deleteEliteDropSetAction } from "@/domain/elite-drop-set/actions/delete";

export default async function EliteDropSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const eliteDropSetAdminService = await makeEliteDropSetAdminService();
    const eliteDropSets = await eliteDropSetAdminService.getAll();
    const numberOfEliteDropSets = eliteDropSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de drop de mobs élite."
            description="Ces sets de drop de mobs élite seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfEliteDropSets} set${numberOfEliteDropSets > 1 ? "s" : ""} de drops de mobs élite dans l'application.`}
            createHref="/admin/elite-drop-sets/new"
            items={eliteDropSets}
            renderItem={(set) => (
                <EliteDropSetCard
                    key={set.id}
                    set={set}
                    onDelete={deleteEliteDropSetAction}
                />
            )}
        />
    );
}