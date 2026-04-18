export const dynamic = "force-dynamic";

import { weaponService } from "@/services/supabase/weapon";
import WeaponGalleryClient from "./_components/gallery-client";

export default async function WeaponsGalleryPage() {
    const weapons = await weaponService.getAll();

    return (
        <WeaponGalleryClient weapons={weapons} />
    );
}