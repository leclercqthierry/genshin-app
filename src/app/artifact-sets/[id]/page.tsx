export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { artifactSetService } from "@/services/supabase/artifact-set";
import ArtifactSetDetail from "../_components/detail";

export default async function ArtifactSetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resultId = (await params).id;
    const artifactSet = await artifactSetService.getOne(Number(resultId));

    if (!artifactSet) {
        notFound();
    }

    return <ArtifactSetDetail artifactSet={artifactSet} />;
}