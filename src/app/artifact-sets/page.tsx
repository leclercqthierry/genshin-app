export const dynamic = "force-dynamic";

import { makeArtifactSetReadOnlyService } from "@/services/supabase/artifact-set";
import ArtifactSetsGalleryClient from "./_components/gallery-client";

export default async function ArtifactSetsGalleryPage() {
    const artifactSetReadOnlyService = await makeArtifactSetReadOnlyService();
    const artifactSets = await artifactSetReadOnlyService.getAll();

    return (
        <ArtifactSetsGalleryClient artifactSets={artifactSets} />
    );
}