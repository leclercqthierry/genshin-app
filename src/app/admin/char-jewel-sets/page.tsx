export const dynamic = "force-dynamic";

import Redirecting from "@/components/ui/feedback/redirecting";
import AdminResourcePage from "@/components/admin/layout/resource-page";
import CharJewelSetCard from "@/domain/char-jewel-set/card";

import { requireAdmin } from "@/services/auth/require-admin";
import { getCharJewelSets } from "@/services/supabase/char-jewel-set";
import { getElements } from "@/services/supabase/element";
import { deleteCharJewelSetAction } from "@/domain/char-jewel-set/actions/delete";

export default async function CharJewelSetsPage() {
    const { redirect } = await requireAdmin();
    if (redirect) return <Redirecting />;

    const [charJewelSets, elements] = await Promise.all([
        getCharJewelSets(),
        getElements(),
    ]);

    // Map optimisée : elementId → élément
    const elementsMap = Object.fromEntries(
        elements.map((el) => [el.id, el])
    );

    const numberOfCharJewelSets = charJewelSets.length;

    return (
        <AdminResourcePage
            title="Gestion des sets de joyaux de personnage"
            description="Ces sets de joyaux de personnages seront utilisés pour les personnages. Il faut donc les créer AVANT ces derniers !"
            count={`Il y a actuellement ${numberOfCharJewelSets} set${numberOfCharJewelSets > 1 ? "s" : ""} de joyaux de personnage dans l'application.`}
            createHref="/admin/char-jewel-sets/new"
            items={charJewelSets}
            renderItem={(set) => (
                <CharJewelSetCard
                    key={set.id}
                    set={set}
                    elementIconUrl={elementsMap[set.elementId].iconUrl}
                    onDelete={deleteCharJewelSetAction}
                />
            )}
        />
    );
}