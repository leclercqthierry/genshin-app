import BaseItemForm from "../../_shared/_components/base-item-form";
import type { BossDropFormState } from "./types";
import type { BossDropSchema } from "@/domain/boss-drop/schema";

type Props = {
    action: (prev: BossDropFormState, formData: FormData) => Promise<BossDropFormState>;
    submitLabel: string;
    defaultValues?: Partial<BossDropSchema>;
};

export default function BossDropForm(props: Props) {
    return (
        <BaseItemForm
            {...props}
            path="/admin/boss-drops"
            itemLabel="Nom du drop de boss"
            rarity={4}
        />
    );
}