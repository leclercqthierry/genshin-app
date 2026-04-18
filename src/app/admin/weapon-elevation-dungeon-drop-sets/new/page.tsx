export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import WeaponElevationDungeonDropSetForm from "../_components/weapon-elevation-dungeon-drop-set-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/weapon-elevation-dungeon-drop-set/actions/create";
import { FARM_DAYS } from "@/constants/farm-days";

export default async function NewWeaponElevationDungeonDropSetPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    return (
        <AdminResourceCreatePage title="Nouveau set de drops de donjon d'élévation d'arme">
            <WeaponElevationDungeonDropSetForm
                action={handleCreate}
                submitLabel="Ajouter le set de drops de donjon d'élévation d'arme"
                farmDays={FARM_DAYS}
            />
        </AdminResourceCreatePage>
    );
}