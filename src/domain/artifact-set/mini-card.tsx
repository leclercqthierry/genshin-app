import AppCard from "@/components/ui/card/app-card";
import Image from "next/image";
import { ArtifactSet } from "./types";

interface MiniArtifactCardProps {
    artifactSet: ArtifactSet;
    rarityBgClass?: string;
}

export default function MiniArtifactSetCard({ artifactSet, rarityBgClass, }: MiniArtifactCardProps) {

    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col justify-between items-center gap-3">
            <Image
                src={artifactSet.iconFlowerUrl}
                alt={artifactSet.name}
                width={64}
                height={64}
                className={`rounded ${rarityBgClass} object-contain h-16 w-auto`}
            />

            <h3 className="text-sm text-white font-semibold">
                {artifactSet.name}
            </h3>
        </AppCard>
    )
}