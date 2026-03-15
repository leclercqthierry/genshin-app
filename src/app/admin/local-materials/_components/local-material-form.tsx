import BaseItemForm from "../../_shared/_components/base-item-form";
import type { LocalMaterialFormState } from "./types";
import type { LocalMaterialSchema } from "@/domain/local-material/schema";

type Props = {
    action: (
        prev: LocalMaterialFormState,
        formData: FormData
    ) => Promise<LocalMaterialFormState>;
    submitLabel: string;
    defaultValues?: Partial<LocalMaterialSchema>;
};

export default function LocalMaterialForm(props: Props) {
    return (
        <BaseItemForm
            {...props}
            path="/admin/local-materials"
            itemLabel="Nom de la ressource locale"
            rarity={1}
        />
    );
}