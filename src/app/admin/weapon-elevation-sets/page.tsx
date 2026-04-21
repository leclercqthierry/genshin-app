export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import WeaponElevationSetCard from "@/domain/weapon-elevation-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { deleteWeaponElevationSetAction } from "@/domain/weapon-elevation-set/actions/delete";
import { makeWeaponElevationSetAdminService } from "@/services/supabase/weapon-elevation-set";

export default async function WeaponElevationSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;
    const weaponElevationSetAdminService = await makeWeaponElevationSetAdminService();
    const weaponElevationSets = await weaponElevationSetAdminService.getAll();
    const numberOfWeaponElevationSets = weaponElevationSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de drops de donjon d'élévation d'arme"
            description="Ces sets de drops de donjon d'élévation d'arme seront utilisés pour les armes. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfWeaponElevationSets} set${numberOfWeaponElevationSets > 1 ? "s" : ""} de drops de donjon d'élévation d'arme dans l'application.`}
            createHref="/admin/weapon-elevation-dungeon-drop-sets/new"
            items={weaponElevationSets}
            renderItem={(set) => (
                <WeaponElevationSetCard
                    key={set.id}
                    set={set}
                    onDelete={deleteWeaponElevationSetAction}
                />
            )}
        />
    );
}