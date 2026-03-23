import BaseItemForm from "../../_shared/_components/base-item-form";
import type { WorldBossDropFormState } from "./types";
import type { WorldBossDropSchema } from "@/domain/world-boss-drop/schema";

type Props = {
    action: (
        prev: WorldBossDropFormState,
        formData: FormData
    ) => Promise<WorldBossDropFormState>;
    submitLabel: string;
    defaultValues?: Partial<WorldBossDropSchema>;
};

export default function WorldBossDropForm(props: Props) {
    return (
        <BaseItemForm
            {...props}
            path="/admin/world-boss-drops"
            itemLabel="Nom du drop de boss de monde"
            rarity={5}
        />
    );
}