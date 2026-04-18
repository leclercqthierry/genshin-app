export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import WeaponCard from "@/domain/weapon/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { weaponService } from "@/services/supabase/weapon";
import { deleteWeaponAction } from "@/domain/weapon/actions/delete";

export default async function WeaponsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const weapons = await weaponService.getAll();
    const numberOfWeapons = weapons.length;

    return (
        <AdminResourcePage
            title="Gestion des armes"
            description="Ces armes seront utilisés pour les teams. Il faut donc les créer AVANT ces dernières !"
            count={`Il y a actuellement ${numberOfWeapons} arme${numberOfWeapons > 1 ? "s" : ""} dans l'application.`}
            createHref="/admin/weapons/new"
            items={weapons}
            renderItem={(weapon) => (
                <WeaponCard
                    key={weapon.id}
                    weapon={weapon}
                    onDelete={deleteWeaponAction}
                    rarityBgClass={weapon.rarity.toString()}
                />
            )}
        />
    );
}