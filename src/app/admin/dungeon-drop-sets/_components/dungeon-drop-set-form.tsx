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
import BaseItemUploaderField from "../../_shared/_components/base-item-uploader-field";

import {
    dungeonDropSetSchema,
    type DungeonDropSetSchema,
} from "@/domain/dungeon-drop-set/schema";

import type { DungeonDropSetFormState } from "./types";

const initialState: DungeonDropSetFormState = {
    success: false,
    errors: {},
};

type Props = {
    action: (
        prev: DungeonDropSetFormState,
        formData: FormData
    ) => Promise<DungeonDropSetFormState>;
    submitLabel: string;
    defaultValues?: Partial<DungeonDropSetSchema>;
};

export default function DungeonDropSetForm({
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
    } = useForm<DungeonDropSetSchema>({
        resolver: zodResolver(dungeonDropSetSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            rarity2_url: defaultValues?.rarity2_url ?? "",
            rarity3_url: defaultValues?.rarity3_url ?? "",
            rarity4_url: defaultValues?.rarity4_url ?? "",
        },
    });

    useEffect(() => {
        if (state.success) {
            router.push("/admin/dungeon-drop-sets");
        }
    }, [state.success, router]);

    const rarityValues = {
        rarity2_url: useWatch({ control, name: "rarity2_url" }),
        rarity3_url: useWatch({ control, name: "rarity3_url" }),
        rarity4_url: useWatch({ control, name: "rarity4_url" }),
    };

    const rarityFields = [
        { name: "rarity2_url", label: "Livre ★★", rarity: 2 },
        { name: "rarity3_url", label: "Livre ★★★", rarity: 3 },
        { name: "rarity4_url", label: "Livre ★★★★", rarity: 4 },
    ] as const;

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
                    <AppInput placeholder="Ex: Liberté" {...register("name")} />
                </AppFieldBase>

                {rarityFields.map(({ name, label, rarity }) => (
                    <div key={name}>
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
                        />

                        <input type="hidden" {...register(name)} />
                    </div>
                ))}

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