import Image from "next/image";
import AppCard from "../../components/ui/card/app-card";
import CardActions from "../../components/ui/card/card-actions";
import type { LocalMaterial } from "@/domain/local-material/types";

interface LocalMaterialCardProps {
    localMaterial: LocalMaterial;
    onDelete: (formData: FormData) => Promise<{ success: boolean; message?: string }>
}

export default function LocalMaterialCard({ localMaterial, onDelete }: LocalMaterialCardProps) {
    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col justify-between items-center gap-3">
            <Image
                src={localMaterial.iconUrl}
                alt={localMaterial.name}
                width={64}
                height={64}
                className="rounded bg-rarity-1"
            />

            <h3 className="text-lg text-white font-semibold">
                {localMaterial.name}
            </h3>

            <CardActions
                editHref={`/admin/local-materials/${localMaterial.id}/edit`}
                deleteAction={onDelete}
                elementId={localMaterial.id}
                small
            />
        </AppCard>
    );
}