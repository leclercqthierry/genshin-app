export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import ArtifactSetForm from "../../_components/artifact-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/artifact-set/actions/update";
import { artifactSetService } from "@/services/supabase/artifact-set";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditArtifactSetPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const artifactSet = await artifactSetService().getOne(Number(id));

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
                    icon_flower_url: artifactSet.iconFlowerUrl,
                    icon_plume_url: artifactSet.iconPlumeUrl,
                    icon_circlet_url: artifactSet.iconCircletUrl,
                    icon_sand_url: artifactSet.iconSandUrl,
                    icon_goblet_url: artifactSet.iconGobletUrl,
                    rarity_max: artifactSet.rarityMax,
                    bonus_2P: artifactSet.bonus2P,
                    bonus_4P: artifactSet.bonus4P,
                }}
            />
        </AdminResourceEditPage>
    );
}