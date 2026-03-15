import { DeleteAction } from "../shared/base-item/types";
import type { WorldBossDrop } from "@/domain/world-boss-drop/types";
import BaseItemCard from "../shared/base-item/card";

export default function WorldBossDropCard({
    worldBossDrop,
    onDelete,
}: {
    worldBossDrop: WorldBossDrop;
    onDelete: DeleteAction;
}) {
    return (
        <BaseItemCard
            item={worldBossDrop}
            editHref={`/admin/world-boss-drops/${worldBossDrop.id}/edit`}
            onDelete={onDelete}
            rarityBgClass="bg-rarity-5"
        />
    );
}