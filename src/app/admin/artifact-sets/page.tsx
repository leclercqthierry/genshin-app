export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { makeArtifactSetAdminService } from "@/services/supabase/artifact-set";
import { deleteArtifactSetAction } from "@/domain/artifact-set/actions/delete";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import ArtifactSetCard from "@/domain/artifact-set/card";

export default async function ArtifactSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const artifactSetAdminService = await makeArtifactSetAdminService();
    const artifactSets = await artifactSetAdminService.getAll();
    const numberOfArtifactSets = artifactSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets d'artéfacts"
            description="Ces sets d'artéfact seront utilisés par les teams. Il faut donc les créer AVANT ces dernières !"
            count={`Il y a actuellement ${numberOfArtifactSets} set${numberOfArtifactSets > 1 ? "s" : ""} d'artéfacts dans l'application.`}
            createHref="/admin/artifact-sets/new"
            items={artifactSets}
            variant={"default"}
            renderItem={(artifactSet) => (
                <ArtifactSetCard
                    key={artifactSet.id}
                    artifactSet={artifactSet}
                    onDelete={deleteArtifactSetAction}
                />
            )}
        />
    );
}