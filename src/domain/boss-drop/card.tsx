import BaseItemCard from "../shared/base-item/card";
import type { BossDrop } from "@/domain/boss-drop/types";
import { DeleteAction } from "../shared/base-item/types";

export default function BossDropCard({ bossDrop, onDelete }: {
    bossDrop: BossDrop;
    onDelete: DeleteAction;
}) {
    return (
        <BaseItemCard
            item={bossDrop}
            editHref={`/admin/boss-drops/${bossDrop.id}/edit`}
            onDelete={onDelete}
            rarityBgClass="bg-rarity-4"
        />
    );
}