import BaseItemCard from "../shared/base-item/card";
import type { LocalMaterial } from "@/domain/local-material/types";
import { DeleteAction } from "../shared/base-item/types";

export default function LocalMaterialCard({
    localMaterial,
    onDelete,
}: {
    localMaterial: LocalMaterial;
    onDelete: DeleteAction;
}) {
    return (
        <BaseItemCard
            item={localMaterial}
            editHref={`/admin/local-materials/${localMaterial.id}/edit`}
            onDelete={onDelete}
            rarityBgClass="bg-rarity-1"
        />
    );
}