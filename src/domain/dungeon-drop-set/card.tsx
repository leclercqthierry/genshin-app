import { DeleteAction } from "../shared/base-item/types";
import BaseSetCard from "../shared/base-set/card";
import { DungeonDropSet } from "./types";

type Props = {
    set: DungeonDropSet;
    onDelete: DeleteAction;
}

export default function DungeonDropSetCard({ set, onDelete }: Props) {
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
            editHref={`/admin/dungeon-drop-sets/${set.id}/edit`}
            onDelete={onDelete}
        />
    );
}