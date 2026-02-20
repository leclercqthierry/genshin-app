"use client";

import { useActionState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppFormSection from "@/components/ui/form/app-form-section";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import AppSelect from "@/components/ui/form/app-select";
import JewelUploaderField from './char-jewel-uploader-field'

import {
    charJewelSetSchema,
    type CharJewelSetSchema,
} from "@/domain/char-jewel-set/schema";

import type { CharJewelSetFormState } from "./types";

const initialState: CharJewelSetFormState = {
    success: false,
    errors: {},
};

type Props = {
    action: (
        prev: CharJewelSetFormState,
        formData: FormData
    ) => Promise<CharJewelSetFormState>;
    submitLabel: string;
    defaultValues?: Partial<CharJewelSetSchema>;
    elements: { id: number; name: string }[];
};

export default function CharJewelSetForm({
    action,
    submitLabel,
    defaultValues,
    elements,
}: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(action, initialState);

    const {
        register,
        setValue,
        control,
        formState: { errors, isValid, isDirty },
    } = useForm<CharJewelSetSchema>({
        resolver: zodResolver(charJewelSetSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            rarity2_url: defaultValues?.rarity2_url ?? "",
            rarity3_url: defaultValues?.rarity3_url ?? "",
            rarity4_url: defaultValues?.rarity4_url ?? "",
            rarity5_url: defaultValues?.rarity5_url ?? "",
            elementId: defaultValues?.elementId ?? 1,
        },
    });

    const rarity2 = useWatch({ control, name: "rarity2_url" });
    const rarity3 = useWatch({ control, name: "rarity3_url" });
    const rarity4 = useWatch({ control, name: "rarity4_url" });
    const rarity5 = useWatch({ control, name: "rarity5_url" });

    useEffect(() => {
        if (state.success) {
            router.push("/admin/char-jewel-sets");
        }
    }, [state.success, router]);

    return (
        <AppFormWrapper action={formAction} size="md" className="max-w-md mx-auto">
            <AppFormSection withBorder={false}>
                {/* Nom */}
                <AppFieldBase
                    label="Nom du set"
                    name="name"
                    required
                    error={errors.name?.message || state.errors?.name?.[0]}
                >
                    <AppInput placeholder="Ex: Set du Voyageur" {...register("name")} />
                </AppFieldBase>

                <AppSelect
                    label="Élément associé"
                    error={errors.elementId?.message || state.errors?.elementId?.[0]}
                    {...register("elementId", { valueAsNumber: true })}
                    options={elements.map((el) => ({
                        value: el.id.toString(),
                        label: el.name,
                    }))}
                />

                <JewelUploaderField
                    label="Joyau ★★"
                    name="rarity2_url"
                    value={rarity2}
                    error={errors.rarity2_url?.message || state.errors?.rarity2_url?.[0]}
                    onUpload={(url) =>
                        setValue("rarity2_url", url, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />

                <JewelUploaderField
                    label="Joyau ★★★"
                    name="rarity3_url"
                    value={rarity3}
                    error={errors.rarity3_url?.message || state.errors?.rarity3_url?.[0]}
                    onUpload={(url) =>
                        setValue("rarity3_url", url, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />

                <JewelUploaderField
                    label="Joyau ★★★★"
                    name="rarity4_url"
                    value={rarity4}
                    error={errors.rarity4_url?.message || state.errors?.rarity4_url?.[0]}
                    onUpload={(url) =>
                        setValue("rarity4_url", url, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />

                <JewelUploaderField
                    label="Joyau ★★★★★"
                    name="rarity5_url"
                    value={rarity5}
                    error={errors.rarity5_url?.message || state.errors?.rarity5_url?.[0]}
                    onUpload={(url) =>
                        setValue("rarity5_url", url, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />

                {/* Champs cachés */}
                <input type="hidden" {...register("rarity2_url")} />
                <input type="hidden" {...register("rarity3_url")} />
                <input type="hidden" {...register("rarity4_url")} />
                <input type="hidden" {...register("rarity5_url")} />

                {state.message && (
                    <p className="text-red-500 text-sm">{state.message}</p>
                )}
            </AppFormSection>

            <div className="flex justify-center">
                <AppButton type="submit" disabled={!isValid || !isDirty}>
                    {submitLabel}
                </AppButton>
            </div>
        </AppFormWrapper>
    );
}