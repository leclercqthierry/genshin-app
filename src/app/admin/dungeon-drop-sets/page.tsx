export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import DungeonDropSetCard from "@/domain/dungeon-drop-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { dungeonDropSetService } from "@/services/supabase/dungeon-drop-set";
import { deleteDungeonDropSetAction } from "@/domain/dungeon-drop-set/actions/delete";

export default async function DungeonDropSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const dungeonDropSets = await dungeonDropSetService.getAll();
    const numberOfDungeonDropSets = dungeonDropSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de drop de donjon"
            description="Ces sets de drop de donjon seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfDungeonDropSets} set${numberOfDungeonDropSets > 1 ? "s" : ""} de drops de donjon dans l'application.`}
            createHref="/admin/dungeon-drop-sets/new"
            items={dungeonDropSets}
            renderItem={(set) => (
                <DungeonDropSetCard
                    key={set.id}
                    set={set}
                    onDelete={deleteDungeonDropSetAction}
                />
            )}
        />
    );
}