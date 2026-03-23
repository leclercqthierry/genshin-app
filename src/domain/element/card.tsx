import BaseItemCard from "../shared/base-item/card";
import type { Element } from "./types";
import { DeleteAction } from "../shared/base-item/types";

export default function ElementCard({ element, onDelete }: {
    element: Element;
    onDelete: DeleteAction;
}) {
    return (
        <BaseItemCard
            item={element}
            editHref={`/admin/elements/${element.id}/edit`}
            onDelete={onDelete}
        />
    );
}