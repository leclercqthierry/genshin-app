import BaseSetCard from "../shared/base-set/card";
import { CharJewelSet } from "./types";
import { DeleteAction } from "../shared/base-item/types";

type Props = {
    set: CharJewelSet;
    elementIconUrl: string;
    onDelete: DeleteAction;
}

export default function CharJewelSetCard({ set, elementIconUrl, onDelete }: Props) {
    return (
        <BaseSetCard
            name={set.name}
            id={set.id}
            iconUrl={elementIconUrl}
            altPrefix="Joyau"
            images={[
                { rarity: 2, url: set.rarity2Url },
                { rarity: 3, url: set.rarity3Url },
                { rarity: 4, url: set.rarity4Url },
                { rarity: 5, url: set.rarity5Url },
            ]}
            editHref={`/admin/char-jewel-sets/${set.id}/edit`}
            onDelete={onDelete}
        />
    );
}