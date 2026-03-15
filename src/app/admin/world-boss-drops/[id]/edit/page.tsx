export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import WorldBossDropForm from "../../_components/world-boss-drop-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/world-boss-drop/actions/update";
import { worldBossDropService } from "@/services/supabase/world-boss-drop";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditWorldBossDropPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const worldBossDrop = await worldBossDropService.getOne(Number(id));

    if (!worldBossDrop) {
        return <p>Drop de boss introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le drop de boss de monde">
            <WorldBossDropForm
                action={handleUpdate.bind(null, worldBossDrop.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: worldBossDrop.name,
                    icon_url: worldBossDrop.iconUrl,
                }}
            />
        </AdminResourceEditPage>
    );
}