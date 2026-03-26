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

import {
    mobDropSetSchema,
    type MobDropSetSchema,
} from "@/domain/mob-drop-set/schema";

import type { MobDropSetFormState } from "./types";

const initialState: MobDropSetFormState = {
    success: false,
    errors: {},
};

type Props = {
    action: (
        prev: MobDropSetFormState,
        formData: FormData
    ) => Promise<MobDropSetFormState>;
    submitLabel: string;
    defaultValues?: Partial<MobDropSetSchema>;
};

export default function MobDropSetForm({
    action,
    submitLabel,
    defaultValues,
}: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(action, initialState);

    const {
        register,
        setValue,
        control,
        formState: { errors, isValid, isDirty },
    } = useForm<MobDropSetSchema>({
        resolver: zodResolver(mobDropSetSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            rarity1_url: defaultValues?.rarity1_url ?? "",
            rarity2_url: defaultValues?.rarity2_url ?? "",
            rarity3_url: defaultValues?.rarity3_url ?? "",
        },
    });

    useEffect(() => {
        if (state.success) {
            router.push("/admin/mob-drop-sets");
        }
    }, [state.success, router]);

    const rarityValues = {
        rarity1_url: useWatch({ control, name: "rarity1_url" }),
        rarity2_url: useWatch({ control, name: "rarity2_url" }),
        rarity3_url: useWatch({ control, name: "rarity3_url" }),
    };

    const rarityFields = [
        { name: "rarity1_url", label: "Drop ★", rarity: 1 },
        { name: "rarity2_url", label: "Drop ★★", rarity: 2 },
        { name: "rarity3_url", label: "Drop ★★★", rarity: 3 },
    ] as const;

    return (
        <AppFormWrapper action={formAction} size="md" className="mx-auto max-w-md lg:max-w-2xl">
            <AppSection variant="ghost">
                {/* Nom */}
                <div className="lg:max-w-1/2 max-w-md mx-auto">
                    <AppFieldBase
                        label="Nom du set"
                        name="name"

                        required
                        error={errors.name?.message || state.errors?.name?.[0]}
                    >
                        <AppInput placeholder="Ex: Blob" {...register("name")} />
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