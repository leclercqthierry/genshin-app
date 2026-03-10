import Image from "next/image";
import AppCard from "../../components/ui/card/app-card";
import CardActions from "../../components/ui/card/card-actions";
import type { WorldBossDrop } from "@/domain/world-boss-drop/types";

interface WorldBossDropCardProps {
    worldBossDrop: WorldBossDrop;
    onDelete: (formData: FormData) => Promise<{ success: boolean; message?: string }>
}

export default function WorldBossDropCard({ worldBossDrop, onDelete }: WorldBossDropCardProps) {
    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col justify-between items-center gap-3">
            <Image
                src={worldBossDrop.iconUrl}
                alt={worldBossDrop.name}
                width={64}
                height={64}
                className="rounded bg-rarity-5"
            />

            <h3 className="text-lg text-white font-semibold">
                {worldBossDrop.name}
            </h3>

            <CardActions
                editHref={`/admin/boss-drops/${worldBossDrop.id}/edit`}
                deleteAction={onDelete}
                elementId={worldBossDrop.id}
                small
            />
        </AppCard>
    );
}