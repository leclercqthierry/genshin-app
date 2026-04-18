export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { weaponService } from "@/services/supabase/weapon";
import WeaponDetail from "../_components/detail";

export default async function WeaponDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resultId = (await params).id;
    const weapon = await weaponService.getOne(Number(resultId));

    if (!weapon) {
        notFound();
    }

    return <WeaponDetail weapon={weapon} />;
}