import { DeleteAction } from "../shared/base-item/types";
import BaseSetCard from "../shared/base-set/card";
import { EliteDropSet } from "./types";

type Props = {
    set: EliteDropSet;
    onDelete: DeleteAction;
}

export default function EliteDropSetCard({ set, onDelete }: Props) {
    return (
        <BaseSetCard
            name={set.name}
            id={set.id}
            altPrefix="Drop"
            images={[
                { rarity: 2, url: set.rarity2Url },
                { rarity: 3, url: set.rarity3Url },
                { rarity: 4, url: set.rarity4Url },
            ]}
            editHref={`/admin/elite-drop-sets/${set.id}/edit`}
            onDelete={onDelete}
        />
    );
}