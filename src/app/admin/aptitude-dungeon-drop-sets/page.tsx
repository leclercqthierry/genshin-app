export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import AptitudeDungeonDropSetCard from "@/domain/aptitude-dungeon-drop-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { aptitudeDungeonDropSetService } from "@/services/supabase/aptitude-dungeon-drop-set";
import { deleteAptitudeDungeonDropSetAction } from "@/domain/aptitude-dungeon-drop-set/actions/delete";

export default async function AptitudeDungeonDropSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const aptitudeDungeonDropSets = await aptitudeDungeonDropSetService.getAll();
    const numberOfAptitudeDungeonDropSets = aptitudeDungeonDropSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de drop de donjon d'aptitude"
            description="Ces sets de drop de donjon d'aptitude seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfAptitudeDungeonDropSets} set${numberOfAptitudeDungeonDropSets > 1 ? "s" : ""} de drops de donjon d'aptitude dans l'application.`}
            createHref="/admin/aptitude-dungeon-drop-sets/new"
            items={aptitudeDungeonDropSets}
            renderItem={(set) => (
                <AptitudeDungeonDropSetCard
                    key={set.id}
                    set={set}
                    onDelete={deleteAptitudeDungeonDropSetAction}
                />
            )}
        />
    );
}