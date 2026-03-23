export const dynamic = "force-dynamic";

import { artifactSetService } from "@/services/supabase/artifact-set";
import ArtifactSetsGalleryClient from "./_components/gallery-client";

export default async function ArtifactSetsGalleryPage() {
    const artifactSets = await artifactSetService().getAll();

    return (
        <ArtifactSetsGalleryClient artifactSets={artifactSets} />
    );
}