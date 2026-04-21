import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { createSupabaseClientReadOnly } from "@/lib/supabase/client-read-only";
import type { ArtifactSet } from "@/domain/artifact-set/types";
import { mapRowToArtifactSet } from "@/domain/artifact-set/mapper";
import { ArtifactSetCreateRow, ArtifactSetRow, ArtifactSetUpdateRow } from "@/domain/artifact-set/db";
import { SupabaseClient } from '@supabase/supabase-js';

export function artifactSetCrud(supabase: SupabaseClient) {
    return {
        async getAll(): Promise<ArtifactSet[]> {
            const { data, error } = await supabase
                .from("artifact_sets")
                .select("*")
                .order("name", { ascending: true });

            if (error) {
                console.error("ERREUR LECTURE ARTIFACT SETS :", error);
                return [];
            }

            return (data ?? []).map(mapRowToArtifactSet);
        },

        async getOne(id: number): Promise<ArtifactSet | null> {

            const { data, error } = await supabase
                .from("artifact_sets")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) {
                console.error("ERREUR LECTURE ARTIFACT SET :", error);
                return null;
            }

            return mapRowToArtifactSet(data as ArtifactSetRow);
        },

        async create(payload: ArtifactSetCreateRow): Promise<ArtifactSet> {

            const { data, error } = await supabase
                .from("artifact_sets")
                .insert(payload)
                .select()
                .single();

            if (error) throw error;

            return mapRowToArtifactSet(data as ArtifactSetRow);
        },

        async update(id: number, payload: ArtifactSetUpdateRow): Promise<ArtifactSet> {

            const { data, error } = await supabase
                .from("artifact_sets")
                .update(payload)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            return mapRowToArtifactSet(data as ArtifactSetRow);
        },

        async remove(id: number): Promise<void> {

            const { error } = await supabase
                .from("artifact_sets")
                .delete()
                .eq("id", id);

            if (error) throw error;
        }
    }
}

export async function makeArtifactSetAdminService() {
    const supabase = await createSupabaseServiceClient();
    return artifactSetCrud(supabase);
};

export async function makeArtifactSetReadOnlyService() {
    const supabase = await createSupabaseClientReadOnly();
    return artifactSetCrud(supabase);
};