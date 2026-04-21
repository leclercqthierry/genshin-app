export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import WeaponDetail from "../_components/detail";
import { WeaponReadOnlyService, makeWeaponReadOnlyService } from "@/services/supabase/weapon";

export default async function WeaponDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resultId = (await params).id;
    const weaponReadOnlyService: WeaponReadOnlyService = await makeWeaponReadOnlyService();
    const weapon = await weaponReadOnlyService.getOne(Number(resultId));

    if (!weapon) {
        notFound();
    }

    return <WeaponDetail weapon={weapon} />;
}