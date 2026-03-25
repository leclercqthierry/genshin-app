export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import WeaponElevationDungeonDropSetCard from "@/domain/weapon-elevation-dungeon-drop-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { weaponElevationDungeonDropSetService } from "@/services/supabase/weapon-elevation-dungeon-drop-set";
import { deleteWeaponElevationDungeonDropSetAction } from "@/domain/weapon-elevation-dungeon-drop-set/actions/delete";

export default async function WeaponElevationDungeonDropSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const weaponElevationDungeonDropSets = await weaponElevationDungeonDropSetService.getAll();
    const numberOfWeaponElevationDungeonDropSets = weaponElevationDungeonDropSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de drops de donjon d'élévation d'arme"
            description="Ces sets de drops de donjon d'élévation d'arme seront utilisés pour les armes. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfWeaponElevationDungeonDropSets} set${numberOfWeaponElevationDungeonDropSets > 1 ? "s" : ""} de drops de donjon d'élévation d'arme dans l'application.`}
            createHref="/admin/weapon-elevation-dungeon-drop-sets/new"
            items={weaponElevationDungeonDropSets}
            renderItem={(set) => (
                <WeaponElevationDungeonDropSetCard
                    key={set.id}
                    set={set}
                    onDelete={deleteWeaponElevationDungeonDropSetAction}
                />
            )}
        />
    );
}