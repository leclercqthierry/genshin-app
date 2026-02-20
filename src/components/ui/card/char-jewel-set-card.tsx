"use client";

import Image from "next/image";
import AppCard from "@/components/ui/card/app-card";
import CardActions from "@/components/ui/card/card-actions";
import { JEWEL_RARITY_COLORS } from "@/domain/char-jewel-set/rarities";
import type { CharJewelSet } from "@/domain/char-jewel-set/types";

type Props = {
    set: CharJewelSet;
    elementIconUrl: string;
    onDelete: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
};

export default function CharJewelSetCard({ set, elementIconUrl, onDelete }: Props) {
    const jewels = [
        { rarity: 2 as const, url: set.rarity2Url },
        { rarity: 3 as const, url: set.rarity3Url },
        { rarity: 4 as const, url: set.rarity4Url },
        { rarity: 5 as const, url: set.rarity5Url },
    ];

    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col gap-4">
            {/* Header : icône élément + nom */}
            <div className="flex justify-center items-center">
                <Image
                    src={elementIconUrl}
                    alt={set.name}
                    width={40}
                    height={40}
                    className="object-contain"
                />
            </div>
            <div className="flex justify-center items-center">
                <h3 className="text-lg font-semibold text-white">{set.name}</h3>
            </div>

            {/* Joyaux */}
            <div className="grid grid-cols-4 gap-3 w-full">
                {jewels.map(({ rarity, url }) => (
                    <div
                        key={rarity}
                        className="rounded-md p-1 flex items-center justify-center"
                        style={{ backgroundColor: JEWEL_RARITY_COLORS[rarity] }}
                    >
                        <Image
                            src={url}
                            alt={`Joyau ★${rarity}`}
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Actions */}
            <CardActions
                editHref={`/admin/char-jewel-sets/${set.id}/edit`}
                deleteAction={onDelete}
                elementId={set.id}
                small
            />
        </AppCard>
    );
}