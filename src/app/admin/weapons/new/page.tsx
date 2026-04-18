export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceCreatePage from "@/components/admin/layout/resource-create-page";
import WeaponForm from "../_components/weapon-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleCreate } from "@/domain/weapon/actions/create";
import { mobDropSetService } from "@/services/supabase/mob-drop-set";
import { eliteDropSetService } from "@/services/supabase/elite-drop-set";
import { weaponElevationDungeonDropSetService } from '@/services/supabase/weapon-elevation-dungeon-drop-set';

export default async function NewWeaponPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const mobDropSets = await mobDropSetService.getAll();
    const eliteDropSets = await eliteDropSetService.getAll();
    const weaponElevationDungeonDropSets = await weaponElevationDungeonDropSetService.getAll();

    return (
        <AdminResourceCreatePage title="Nouvelle arme">
            <WeaponForm
                action={handleCreate}
                submitLabel="Ajouter l'arme"
                mobDropSets={mobDropSets}
                eliteDropSets={eliteDropSets}
                weaponElevationDungeonDropSets={weaponElevationDungeonDropSets}
            />
        </AdminResourceCreatePage>
    );
}