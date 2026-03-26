import { DeleteAction } from "../shared/base-item/types";
import BaseSetCard from "../shared/base-set/card";
import { MobDropSet } from "./types";

type Props = {
    set: MobDropSet;
    onDelete: DeleteAction;
}

export default function MobDropSetCard({ set, onDelete }: Props) {
    return (
        <BaseSetCard
            name={set.name}
            id={set.id}
            altPrefix="Drop"
            images={[
                { rarity: 1, url: set.rarity1Url },
                { rarity: 2, url: set.rarity2Url },
                { rarity: 3, url: set.rarity3Url },
            ]}
            editHref={`/admin/mob-drop-sets/${set.id}/edit`}
            onDelete={onDelete}
        />
    );
}