import Image from "next/image";
import type { ArtifactSet } from "@/domain/artifact-set/types";
import PageHero from "@/components/layout/page-hero";
import AppCard from "@/components/ui/card/app-card";
import AppFormSection from "@/components/ui/layout/app-section";

export default function ArtifactSetDetail({ artifactSet }: { artifactSet: ArtifactSet }) {

    const pieces = [
        { key: "iconFlowerUrl", label: "Fleur" },
        { key: "iconPlumeUrl", label: "Plume" },
        { key: "iconSandUrl", label: "Sablier" },
        { key: "iconGobletUrl", label: "Coupe" },
        { key: "iconCircletUrl", label: "Couronne" },
    ] as const;

    return (
        <div>
            <PageHero title={artifactSet.name}>

            </PageHero>

            <AppCard
                variant="default"
                size="lg"
                disableFloat={true}
                className="lg:w-1/2 w-9/10 mx-auto my-6"
            >

                <div className="flex items-center justify-center gap-4">

                    <p className="text-white text-xl">
                        Rareté max:{" "}
                        <span className="text-yellow-400">
                            {"⭐".repeat(artifactSet.rarityMax)}
                        </span>
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-4 justify-evenly mt-6">
                    {pieces.map(({ key, label }) => (
                        <div key={key} className="flex flex-col justify-between items-center h-28">
                            <Image
                                src={artifactSet[key]}
                                alt={`${artifactSet.name} – ${label}`}
                                height={80}
                                width={80}
                                className={`rounded bg-rarity-${artifactSet.rarityMax} flex-4/5`}
                            />
                            <p className="text-gray-300 text-sm mt-1">{label}</p>
                        </div>
                    ))}
                </div>

                <AppFormSection
                    title="Bonus"
                    variant="ghost"
                >
                    <h2 className="text-xl font-semibold text-white mb-2">2 pièces:</h2>
                    <p className="text-gray-300 whitespace-pre-line">
                        {artifactSet.bonus2P}
                    </p>
                    <h2 className="text-xl font-semibold text-white mb-2">4 pièces:</h2>
                    <p className="text-gray-300 whitespace-pre-line">
                        {artifactSet.bonus4P}
                    </p>
                </AppFormSection>
            </AppCard>
        </div>
    );
}