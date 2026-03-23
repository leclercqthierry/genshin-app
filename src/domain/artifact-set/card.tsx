import AppCard from "@/components/ui/card/app-card";
import Image from "next/image";
import CardActions from "@/components/ui/card/card-actions";
import { ArtifactSet } from "./types";

interface ArtifactCardProps {
    artifactSet: ArtifactSet;
    onDelete?: (formData: FormData) => Promise<{ success: boolean; message?: string }>
    showActions?: boolean;
}

export default function ArtifactSetCard({ artifactSet, onDelete, showActions = true, }: ArtifactCardProps) {

    const artifacts = [
        { url: artifactSet.iconFlowerUrl, alt: "fleur" },
        { url: artifactSet.iconPlumeUrl, alt: "plume" },
        { url: artifactSet.iconCircletUrl, alt: "coiffe" },
        { url: artifactSet.iconSandUrl, alt: "sablier" },
        { url: artifactSet.iconGobletUrl, alt: "coupe" },
    ];

    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col items-center gap-4">

            {/* Header */}
            <div className="flex flex-col items-center">
                <Image
                    src={artifactSet.iconFlowerUrl}
                    alt={artifactSet.name}
                    width={64}
                    height={64}
                    className="rounded"
                />

                <h3 className="text-lg text-white font-semibold">
                    {artifactSet.name}
                </h3>
            </div>

            {/* Artéfacts */}
            <div className="grid gap-3 w-full grid-cols-5">
                {artifacts.map(({ url, alt }) => (
                    <div
                        key={url}
                        className={`rounded-md p-1 flex items-center justify-center bg-rarity-${artifactSet.rarityMax}`}
                    >
                        <Image
                            src={url}
                            alt={alt}
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Actions (optionnelles) */}
            {showActions && onDelete && (
                <CardActions
                    editHref={`/admin/artifact-sets/${artifactSet.id}/edit`}
                    deleteAction={onDelete}
                    elementId={artifactSet.id}
                    small
                />
            )}

        </AppCard>
    )
}