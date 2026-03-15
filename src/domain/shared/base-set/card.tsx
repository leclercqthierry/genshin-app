"use client";

import Image from "next/image";
import AppCard from "@/components/ui/card/app-card";
import CardActions from "@/components/ui/card/card-actions";
import { DeleteAction } from "../base-item/types";

type RarityImage = {
    rarity: number;
    url: string;
};

type BaseSetCardProps = {
    name: string;
    id: number;
    images: RarityImage[];
    onDelete: DeleteAction;
    editHref: string;

    /** Optionnel : icône (CharJewelSet) */
    iconUrl?: string;

    /** Optionnel : préfixe pour l'alt (Livre, Joyau, etc.) */
    altPrefix?: string;
};

export default function BaseSetCard({
    name,
    id,
    images,
    onDelete,
    editHref,
    iconUrl,
    altPrefix = "Image",
}: BaseSetCardProps) {
    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col gap-4">
            {/* Header */}
            {iconUrl && (
                <div className="flex justify-center items-center">
                    <Image
                        src={iconUrl}
                        alt={name}
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>
            )}

            <div className="flex justify-center items-center">
                <h3 className="text-lg font-semibold text-white">{name}</h3>
            </div>

            {/* Images */}
            <div
                className={`grid gap-3 w-full ${images.length === 4 ? "grid-cols-4" : "grid-cols-3"
                    }`}
            >
                {images.map(({ rarity, url }) => (
                    <div
                        key={rarity}
                        className={`rounded-md p-1 flex items-center justify-center bg-rarity-${rarity}`}
                    >
                        <Image
                            src={url}
                            alt={`${altPrefix} ★${rarity}`}
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Actions */}
            <CardActions
                editHref={editHref}
                deleteAction={onDelete}
                elementId={id}
                small
            />
        </AppCard>
    );
}