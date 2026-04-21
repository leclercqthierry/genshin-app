export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { makeArtifactSetReadOnlyService } from "@/services/supabase/artifact-set";
import ArtifactSetDetail from "../_components/detail";

export default async function ArtifactSetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resultId = (await params).id;
    const artifactSetReadOnlyService = await makeArtifactSetReadOnlyService();
    const artifactSet = await artifactSetReadOnlyService.getOne(Number(resultId));

    if (!artifactSet) {
        notFound();
    }

    return <ArtifactSetDetail artifactSet={artifactSet} />;
}