import Image from "next/image";
import AppCard from "./app-card";
import CardActions from "./card-actions";
import type { BossDrop } from "@/domain/boss-drop/types";

interface BossDropCardProps {
    bossDrop: BossDrop;
    onDelete: (formData: FormData) => Promise<{ success: boolean; message?: string }>
}

export default function BossDropCard({ bossDrop, onDelete }: BossDropCardProps) {
    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col justify-between items-center gap-3">
            <Image
                src={bossDrop.iconUrl}
                alt={bossDrop.name}
                width={64}
                height={64}
                className="rounded bg-rarity-4"
            />

            <h3 className="text-lg text-white font-semibold">
                {bossDrop.name}
            </h3>

            <CardActions
                editHref={`/admin/boss-drops/${bossDrop.id}/edit`}
                deleteAction={onDelete}
                elementId={bossDrop.id}
                small
            />
        </AppCard>
    );
}