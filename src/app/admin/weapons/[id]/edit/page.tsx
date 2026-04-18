export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourceEditPage from "@/components/admin/layout/resource-edit-page";
import WeaponForm from "../../_components/weapon-form";

import { requireAdmin } from "@/services/auth/require-admin";
import { handleUpdate } from "@/domain/weapon/actions/update";
import { weaponService } from "@/services/supabase/weapon";
import { mobDropSetService } from '@/services/supabase/mob-drop-set';
import { eliteDropSetService } from "@/services/supabase/elite-drop-set";
import { weaponElevationDungeonDropSetService } from "@/services/supabase/weapon-elevation-dungeon-drop-set";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditWeaponPage({ params }: Props) {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const { id } = await params;
    const weapon = await weaponService.getOne(Number(id));
    const mobDropSets = await mobDropSetService.getAll();
    const eliteDropSets = await eliteDropSetService.getAll();
    const weaponElevationDungeonDropSets = await weaponElevationDungeonDropSetService.getAll();

    if (!weapon) {
        return <p>Arme introuvable</p>;
    }

    console.log("mobDropSets =", mobDropSets);
    console.log("weapon.mobDropSetId =", weapon.mobDropSetId);
    console.log("mobDropSets IDs =", mobDropSets.map(s => s.id));



    return (
        <AdminResourceEditPage title="Modifier l'arme">
            <WeaponForm
                action={handleUpdate.bind(null, weapon.id)}
                submitLabel="Mettre à jour"
                mobDropSets={mobDropSets}
                eliteDropSets={eliteDropSets}
                weaponElevationDungeonDropSets={weaponElevationDungeonDropSets}
                defaultValues={{
                    name: weapon.name,
                    imageUrl: weapon.imageUrl,
                    miniUrl: weapon.miniUrl,
                    rarity: weapon.rarity,
                    weaponType: weapon.weaponType,
                    subStat: weapon.subStat,
                    source: weapon.source,
                    description: weapon.description,
                    mobDropSetId: weapon.mobDropSetId,
                    eliteDropSetId: weapon.eliteDropSetId,
                    weaponElevationDungeonDropSetId: weapon.weaponElevationDungeonDropSetId,
                }}
            />
        </AdminResourceEditPage>
    );
}