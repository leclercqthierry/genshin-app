"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { artifactSetSchema, type ArtifactSetSchema } from "@/domain/artifact-set/schema";
import type { ArtifactSetFormState } from "./types";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppSection from "@/components/ui/layout/app-section";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import AppSelect from "@/components/ui/form/app-select";
import BaseItemUploaderField from "../../_shared/_components/base-item-uploader-field";
import AppTextArea from "@/components/ui/form/app-textarea";

const initialState: ArtifactSetFormState = {
    success: false,
    errors: {},
};

type Props = {
    action: (
        prev: ArtifactSetFormState,
        formData: FormData
    ) => Promise<ArtifactSetFormState>;
    submitLabel: string;
    defaultValues?: Partial<ArtifactSetSchema>;
};

export default function ArtifactSetForm({
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
    } = useForm<ArtifactSetSchema>({
        resolver: zodResolver(artifactSetSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            iconFlowerUrl: defaultValues?.iconFlowerUrl ?? "",
            iconPlumeUrl: defaultValues?.iconPlumeUrl ?? "",
            iconCircletUrl: defaultValues?.iconCircletUrl ?? "",
            iconSandUrl: defaultValues?.iconSandUrl ?? "",
            iconGobletUrl: defaultValues?.iconGobletUrl ?? "",
            rarityMax: defaultValues?.rarityMax ?? 5,
            bonus2P: defaultValues?.bonus2P ?? "",
            bonus4P: defaultValues?.bonus4P ?? "",
        },
    });

    useEffect(() => {
        if (state.success) {
            router.push("/admin/artifact-sets");
        }
    }, [state.success, router]);

    const artifactValues = {
        iconFlowerUrl: useWatch({ control, name: "iconFlowerUrl" }),
        iconPlumeUrl: useWatch({ control, name: "iconPlumeUrl" }),
        iconCircletUrl: useWatch({ control, name: "iconCircletUrl" }),
        iconSandUrl: useWatch({ control, name: "iconSandUrl" }),
        iconGobletUrl: useWatch({ control, name: "iconGobletUrl" }),
    };


    const rarityMax = useWatch({ control, name: "rarityMax" }) ?? defaultValues?.rarityMax ?? 5;

    const artifactFields = [
        { name: "iconFlowerUrl", label: "Fleur" },
        { name: "iconPlumeUrl", label: "Plume" },
        { name: "iconCircletUrl", label: "Coiffe" },
        { name: "iconSandUrl", label: "Sablier" },
        { name: "iconGobletUrl", label: "Coupe" },
    ] as const;

    const allowedRarities = useMemo(() => [3, 4, 5], []);

    return (
        <AppFormWrapper action={formAction} size="md" className="mx-auto">
            <AppSection variant="ghost">
                <div className="flex flex-col sm:flex-row gap-3">
                    <AppFieldBase
                        label="Nom du set"
                        name="name"
                        error={errors.name?.message || state.errors?.name?.[0]}
                        required
                    >
                        <AppInput className="h-9" placeholder="Ex: Set du Voyageur" {...register("name")} />
                    </AppFieldBase>

                    <AppFieldBase
                        label="Rareté maximale du set"
                        name="rarityMax"
                        required
                    >
                        <AppSelect
                            {...register("rarityMax", { valueAsNumber: true })}
                            options={allowedRarities.map((rarity) => ({
                                value: rarity.toString(),
                                label: "⭐".repeat(rarity),
                            }))}
                        />
                    </AppFieldBase>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-evenly items-center gap-3">
                    {artifactFields.map(({ name, label }) => (
                        <div key={name}>
                            <BaseItemUploaderField
                                label={label}
                                alt={label}
                                name={name}
                                rarity={Number(rarityMax)}
                                value={artifactValues[name]}
                                error={errors[name]?.message || state.errors?.[name]?.[0]}
                                onUpload={(url) => {
                                    setValue(name, url, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }}
                            />

                            <input type="hidden" {...register(name)} />
                        </div>
                    ))}

                    {state.message && (
                        <p className="text-red-500 text-sm">{state.message}</p>
                    )}
                </div>
            </AppSection>

            <AppSection
                title="Bonus de set"
                variant="ghost"
            >
                <AppFieldBase
                    label="2 pièces:"
                    name="bonus_2P"
                    required
                >
                    <AppTextArea {...register("bonus2P")}></AppTextArea>
                </AppFieldBase>

                <AppFieldBase
                    label="4 pièces:"
                    name="bonus_4P"
                    required
                >
                    <AppTextArea {...register("bonus4P")}></AppTextArea>
                </AppFieldBase>
            </AppSection>

            <div className="flex justify-center">
                <AppButton type="submit" disabled={!isValid || !isDirty}>
                    {submitLabel}
                </AppButton>
            </div>
        </AppFormWrapper>
    );
}