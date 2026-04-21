export const dynamic = "force-dynamic";

import { requireAdmin } from "@/services/auth/require-admin";
import { makeLocalMaterialAdminService } from "@/services/supabase/local-material";
import { deleteLocalMaterialAction } from "@/domain/local-material/actions/delete";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import LocalMaterialCard from "@/domain/local-material/card";

export default async function LocalMaterialsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const localMaterialAdminService = await makeLocalMaterialAdminService();
    const localMaterials = await localMaterialAdminService.getAll();
    const numberOfLocalMaterials = localMaterials.length;

    return (
        <AdminResourcePage
            title="Gestion des ressources locales"
            description="Ces ressources locales seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfLocalMaterials} ressource${numberOfLocalMaterials > 1 ? "s" : ""} locale${numberOfLocalMaterials > 1 ? "s" : ""} dans l'application.`}
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