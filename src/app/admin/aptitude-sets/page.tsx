export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import AptitudeSetCard from "@/domain/aptitude-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { makeAptitudeSetAdminService } from "@/services/supabase/aptitude-set";
import { deleteAptitudeSetAction } from "@/domain/aptitude-set/actions/delete";

export default async function AptitudeSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const aptitudeSetAdminService = await makeAptitudeSetAdminService();
    const aptitudeSets = await aptitudeSetAdminService.getAll();
    const numberOfAptitudeSets = aptitudeSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de drop de donjon d'aptitude"
            description="Ces sets de drop de donjon d'aptitude seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfAptitudeSets} set${numberOfAptitudeSets > 1 ? "s" : ""} de drops de donjon d'aptitude dans l'application.`}
            createHref="/admin/aptitude-dungeon-drop-sets/new"
            items={aptitudeSets}
            renderItem={(set) => (
                <AptitudeSetCard
                    key={set.id}
                    set={set}
                    onDelete={deleteAptitudeSetAction}
                />
            )}
        />
    );
}