export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import BossDropForm from "../../_components/boss-drop-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/boss-drop/actions/update";
import { bossDropService } from "@/services/supabase/boss-drop";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditBossDropPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const bossDrop = await bossDropService.getOne(Number(id));

    if (!bossDrop) {
        return <p>Drop de boss introuvable.</p>;
    }

    return (
        <AdminResourceEditPage title="Modifier le drop de boss">
            <BossDropForm
                action={handleUpdate.bind(null, bossDrop.id)}
                submitLabel="Mettre à jour"
                defaultValues={{
                    name: bossDrop.name,
                    iconUrl: bossDrop.iconUrl,
                }}
            />
        </AdminResourceEditPage>
    );
}