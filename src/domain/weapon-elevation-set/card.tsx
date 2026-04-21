import { DeleteAction } from "../shared/base-item/types";
import BaseSetCard from "../shared/base-set/card";
import { WeaponElevationSet } from "./types";

type Props = {
    set: WeaponElevationSet;
    onDelete: DeleteAction;
}

export default function WeaponElevationSetCard({ set, onDelete }: Props) {
    return (
        <BaseSetCard
            name={set.name}
            id={set.id}
            altPrefix="Drop"
            images={[
                { rarity: 2, url: set.rarity2Url },
                { rarity: 3, url: set.rarity3Url },
                { rarity: 4, url: set.rarity4Url },
                { rarity: 5, url: set.rarity5Url }
            ]}
            editHref={`/admin/weapon-elevation-sets/${set.id}/edit`}
            onDelete={onDelete}
        />
    );
}