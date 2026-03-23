import BaseItemForm from "../../_shared/_components/base-item-form";
import type { ElementFormState } from "./types";
import type { ElementSchema } from "@/domain/element/schema";

type Props = {
    action: (prev: ElementFormState, formData: FormData) => Promise<ElementFormState>;
    submitLabel: string;
    defaultValues?: Partial<ElementSchema>;
};

export default function ElementForm(props: Props) {
    return (
        <BaseItemForm
            {...props}
            path="/admin/elements"
            itemLabel="Nom de l'élément"
        />
    );
}