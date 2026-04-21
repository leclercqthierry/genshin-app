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
import BaseItemUploaderField from "../../_shared/_components/base-item-uploader-field";
import AppSelect from "@/components/ui/form/app-select";

import {
    weaponElevationSetSchema,
    type WeaponElevationSetSchema,
} from "@/domain/weapon-elevation-set/schema";

import type { WeaponElevationSetFormState } from "./types";

const initialState: WeaponElevationSetFormState = {
    success: false,
    errors: {},
};

type Props = {
    action: (
        prev: WeaponElevationSetFormState,
        formData: FormData
    ) => Promise<WeaponElevationSetFormState>;
    submitLabel: string;
    defaultValues?: Partial<WeaponElevationSetSchema>;
    farmDays: readonly string[];
};

export default function WeaponElevationSetForm({
    action,
    submitLabel,
    defaultValues,
    farmDays,
}: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(action, initialState);

    const {
        register,
        setValue,
        control,
        formState: { errors, isValid, isDirty },
    } = useForm<WeaponElevationSetSchema>({
        resolver: zodResolver(weaponElevationSetSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            rarity2Url: defaultValues?.rarity2Url ?? "",
            rarity3Url: defaultValues?.rarity3Url ?? "",
            rarity4Url: defaultValues?.rarity4Url ?? "",
            rarity5Url: defaultValues?.rarity5Url ?? "",
            farmDaysIndex: defaultValues?.farmDaysIndex ?? 0,
        },
    });

    useEffect(() => {
        if (state.success) {
            router.push("/admin/weapon-elevation-sets");
        }
    }, [state.success, router]);

    const rarityValues = {
        rarity2Url: useWatch({ control, name: "rarity2Url" }),
        rarity3Url: useWatch({ control, name: "rarity3Url" }),
        rarity4Url: useWatch({ control, name: "rarity4Url" }),
        rarity5Url: useWatch({ control, name: "rarity5Url" }),
    };

    const rarityFields = [
        { name: "rarity2Url", label: "Drop ⭐⭐", rarity: 2 },
        { name: "rarity3Url", label: "Drop ⭐⭐⭐", rarity: 3 },
        { name: "rarity4Url", label: "Drop ⭐⭐⭐⭐", rarity: 4 },
        { name: "rarity5Url", label: "Drop ⭐⭐⭐⭐⭐", rarity: 5 },
    ] as const;

    return (

        <AppFormWrapper action={formAction} size="md" className="mx-auto max-w-md lg:max-w-2xl">
            <AppSection variant="ghost">
                <div className="lg:max-w-1/2 max-w-md mx-auto">
                    {/* Nom */}
                    <AppFieldBase
                        label="Nom du set"
                        name="name"
                        required
                        error={errors.name?.message || state.errors?.name?.[0]}
                    >
                        <AppInput placeholder="Ex: Décarabian" {...register("name")} />
                    </AppFieldBase>

                    <AppFieldBase
                        label="Jours de farm"
                        name="farmDaysIndex"
                        required
                    >
                        <AppSelect
                            error={
                                errors.farmDaysIndex?.message || state.errors?.farmDaysIndex?.[0]
                            }
                            {...register("farmDaysIndex", { valueAsNumber: true })}
                            options={farmDays.map((farmDay, index) => ({
                                value: index.toString(),
                                label: farmDay,
                            }))}
                        />
                    </AppFieldBase>

                </div>

                <div className="flex flex-col lg:flex-row flex-wrap justify-evenly items-center gap-3">
                    {rarityFields.map(({ name, label, rarity }) => (
                        <div className="w-full lg:w-auto" key={name}>
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