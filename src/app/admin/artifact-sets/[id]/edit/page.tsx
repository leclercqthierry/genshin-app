export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import ArtifactSetForm from "../../_components/artifact-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/artifact-set/actions/update";
import { makeArtifactSetAdminService } from "@/services/supabase/artifact-set";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditArtifactSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const artifactSetAdminService = await makeArtifactSetAdminService();
    const artifactSet = await artifactSetAdminService.getOne(Number(id));

    if (!artifactSet) {
        return <p>Set d&apos;artéfacts introuvable</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le set d'artéfacts'">
            <ArtifactSetForm
                action={handleUpdate.bind(null, artifactSet.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: artifactSet.name,
                    iconFlowerUrl: artifactSet.iconFlowerUrl,
                    iconPlumeUrl: artifactSet.iconPlumeUrl,
                    iconCircletUrl: artifactSet.iconCircletUrl,
                    iconSandUrl: artifactSet.iconSandUrl,
                    iconGobletUrl: artifactSet.iconGobletUrl,
                    rarityMax: artifactSet.rarityMax,
                    bonus2P: artifactSet.bonus2P,
                    bonus4P: artifactSet.bonus4P,
                }}
            />
        </AdminResourceEditPage>
    );
}