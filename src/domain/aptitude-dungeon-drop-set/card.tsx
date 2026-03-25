import { DeleteAction } from "../shared/base-item/types";
import BaseSetCard from "../shared/base-set/card";
import { AptitudeDungeonDropSet } from "./types";

type Props = {
    set: AptitudeDungeonDropSet;
    onDelete: DeleteAction;
}

export default function AptitudeDungeonDropSetCard({ set, onDelete }: Props) {
    return (
        <BaseSetCard
            name={set.name}
            id={set.id}
            altPrefix="Livre"
            images={[
                { rarity: 2, url: set.rarity2Url },
                { rarity: 3, url: set.rarity3Url },
                { rarity: 4, url: set.rarity4Url },
            ]}
            editHref={`/admin/aptitude-dungeon-drop-sets/${set.id}/edit`}
            onDelete={onDelete}
        />
    );
}