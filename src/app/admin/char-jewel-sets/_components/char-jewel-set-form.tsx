"use client";

import { useActionState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppSection from "@/components/ui/layout/app-section";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import AppSelect from "@/components/ui/form/app-select";
import BaseItemUploaderField from "../../_shared/_components/base-item-uploader-field";

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
            rarity2Url: defaultValues?.rarity2Url ?? "",
            rarity3Url: defaultValues?.rarity3Url ?? "",
            rarity4Url: defaultValues?.rarity4Url ?? "",
            rarity5Url: defaultValues?.rarity5Url ?? "",
            elementId: defaultValues?.elementId ?? 1,
        },
    });

    useEffect(() => {
        if (state.success) {
            router.push("/admin/char-jewel-sets");
        }
    }, [state.success, router]);

    const rarityValues = {
        rarity2Url: useWatch({ control, name: "rarity2Url" }),
        rarity3Url: useWatch({ control, name: "rarity3Url" }),
        rarity4Url: useWatch({ control, name: "rarity4Url" }),
        rarity5Url: useWatch({ control, name: "rarity5Url" }),
    };

    const rarityFields = [
        { name: "rarity2Url", label: "Joyau ⭐⭐", rarity: 2 },
        { name: "rarity3Url", label: "Joyau ⭐⭐⭐", rarity: 3 },
        { name: "rarity4Url", label: "Joyau ⭐⭐⭐⭐", rarity: 4 },
        { name: "rarity5Url", label: "Joyau ⭐⭐⭐⭐⭐", rarity: 5 },
    ] as const;

    return (
        <AppFormWrapper action={formAction} size="md" className="mx-auto">
            <AppSection variant="ghost">
                {/* Nom */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <AppFieldBase
                        label="Nom du set"
                        name="name"
                        required
                        error={errors.name?.message || state.errors?.name?.[0]}
                    >
                        <AppInput
                            className="h-9"
                            placeholder="Ex: Set du Voyageur" {...register("name")}
                        />
                    </AppFieldBase>

                    <AppFieldBase
                        label="Élément associé"
                        name="elementId"
                        required
                    >
                        <AppSelect
                            error={errors.elementId?.message || state.errors?.elementId?.[0]}
                            {...register("elementId", { valueAsNumber: true })}
                            options={elements.map((el) => ({
                                value: el.id.toString(),
                                label: el.name,
                            }))}
                        />
                    </AppFieldBase>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-evenly items-center gap-3">

                    {rarityFields.map(({ name, label, rarity }) => (
                        <div className="w-full sm:w-auto" key={name}>
                            <BaseItemUploaderField
                                label={label}
                                name={name}
                                rarity={rarity}
                                value={rarityValues[name]}
                                error={errors[name]?.message || state.errors?.[name]?.[0]}
                                onUpload={(url) =>
                                    setValue(name, url, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                                alt={`Image du ${label}`}
                            />

                            <input type="hidden" {...register(name)} />
                        </div>
                    ))}

                    {state.message && (
                        <p className="text-red-500 text-sm">{state.message}</p>
                    )}
                </div>
            </AppSection>

            <div className="flex justify-center">
                <AppButton type="submit" disabled={!isValid || !isDirty}>
                    {submitLabel}
                </AppButton>
            </div>
        </AppFormWrapper>
    );
}