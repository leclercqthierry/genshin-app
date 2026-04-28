export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import WeaponForm from "../_components/weapon-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/weapon/actions/create";
import { makeMobDropSetAdminService } from "@/services/supabase/mob-drop-set";
import { makeEliteDropSetAdminService } from "@/services/supabase/elite-drop-set";
import { makeWeaponElevationSetAdminService } from '@/services/supabase/weapon-elevation-set';

export default async function NewWeaponPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const mobDropSetAdminService = await makeMobDropSetAdminService();
    const mobDropSets = await mobDropSetAdminService.getAll();

    const eliteDropSetAdminService = await makeEliteDropSetAdminService();
    const eliteDropSets = await eliteDropSetAdminService.getAll();

    const weaponElevationSetAdminService = await makeWeaponElevationSetAdminService();
    const weaponElevationDungeonDropSets = await weaponElevationSetAdminService.getAll();

    return (
        <AdminResourceCreatePage title="Nouvelle arme">
            <WeaponForm
                action={handleCreate}
                submitLabel="Ajouter l'arme"
                mobDropSets={mobDropSets}
                eliteDropSets={eliteDropSets}
                weaponElevationSets={weaponElevationDungeonDropSets}
            />
        </AdminResourceCreatePage>
    );
}