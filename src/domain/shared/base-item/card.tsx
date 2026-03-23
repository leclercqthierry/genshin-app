import Image from "next/image";
import AppCard from "@/components/ui/card/app-card";
import CardActions from "@/components/ui/card/card-actions";
import type { BaseItem, DeleteAction } from "./types";

interface BaseItemCardProps {
    item: BaseItem;
    editHref?: string;          // optionnel
    onDelete?: DeleteAction;    // optionnel
    rarityBgClass?: string;
}

export default function BaseItemCard({
    item,
    editHref,
    onDelete,
    rarityBgClass,
}: BaseItemCardProps) {
    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col justify-between items-center gap-3">
            <Image
                src={item.iconUrl}
                alt={item.name}
                width={64}
                height={64}
                className={`rounded ${rarityBgClass}`}
            />

            <h3 className="text-lg text-white font-semibold">
                {item.name}
            </h3>

            {/* Affichage conditionnel */}
            {editHref && onDelete && (
                <CardActions
                    editHref={editHref}
                    deleteAction={onDelete}
                    elementId={item.id}
                    small
                />
            )}
        </AppCard>
    );
}