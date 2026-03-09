export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { getLocalMaterials } from "@/services/supabase/local-material";
import { deleteLocalMaterialAction } from "@/domain/local-material/actions/delete";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import LocalMaterialCard from "@/domain/local-material/card";

export default async function LocalMaterialsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const localMaterials = await getLocalMaterials();

    return (
        <AdminResourcePage
            title="Gestion des ressources locales"
            description="Ces ressources locales seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            createHref="/admin/local-materials/new"
            items={localMaterials}
            variant={"compact"}
            renderItem={(localMaterial) => (
                <LocalMaterialCard
                    key={localMaterial.id}
                    localMaterial={localMaterial}
                    onDelete={deleteLocalMaterialAction}
                />
            )}
        />
    );
}