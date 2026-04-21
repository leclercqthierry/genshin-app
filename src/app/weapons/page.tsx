export const dynamic = "force-dynamic";

import { type WeaponReadOnlyService, makeWeaponReadOnlyService } from "@/services/supabase/weapon";
import WeaponGalleryClient from "./_components/gallery-client";

export default async function WeaponsGalleryPage() {

    const weaponReadOnlyService: WeaponReadOnlyService = await makeWeaponReadOnlyService();
    const weapons = await weaponReadOnlyService.getAll();

    return (
        <WeaponGalleryClient weapons={weapons} />
    );
}