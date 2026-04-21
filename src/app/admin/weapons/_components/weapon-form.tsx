"use client";

import { useActionState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { weaponSchema, type WeaponSchema } from "@/domain/weapon/schema";
import type { WeaponFormState } from "./types";
import { RARITIES } from "@/constants/rarities";
import { WEAPON_TYPES } from "@/constants/weapon-types";
import { WEAPON_SUBSTATS } from "@/constants/weapon-substats";
import { SOURCES } from "@/constants/sources";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppSection from "@/components/ui/layout/app-section";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import AppSelect from "@/components/ui/form/app-select";
import BaseItemUploaderField from "../../_shared/_components/base-item-uploader-field";
import AppTextArea from "@/components/ui/form/app-textarea";
import { MobDropSet } from "@/domain/mob-drop-set/types";
import { EliteDropSet } from "@/domain/elite-drop-set/types";
import { WeaponElevationSet } from "@/domain/weapon-elevation-set/types";

const initialState: WeaponFormState = {
    success: false,
    errors: {},
};

const allowedRarities = RARITIES.slice(2, 5);

type Props = {
    action: (
        prev: WeaponFormState,
        formData: FormData
    ) => Promise<WeaponFormState>;
    submitLabel: string;
    defaultValues?: Partial<WeaponSchema>;
    mobDropSets: MobDropSet[];
    eliteDropSets: EliteDropSet[];
    weaponElevationSets: WeaponElevationSet[];
};

export default function WeaponForm({
    action,
    submitLabel,
    defaultValues,
    mobDropSets,
    eliteDropSets,
    weaponElevationSets,
}: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(action, initialState);

    const {
        register,
        setValue,
        control,
        formState: { errors, isValid, isDirty },
    } = useForm<WeaponSchema>({
        resolver: zodResolver(weaponSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            imageUrl: defaultValues?.imageUrl ?? "",
            miniUrl: defaultValues?.miniUrl ?? "",
            rarity: defaultValues?.rarity ?? 5,
            weaponType: defaultValues?.weaponType ?? WEAPON_TYPES[0],
            subStat: defaultValues?.subStat ?? WEAPON_SUBSTATS[0],
            source: defaultValues?.source ?? SOURCES[0],
            description: defaultValues?.description ?? "",
            mobDropSetId: defaultValues?.mobDropSetId ?? 1,
            eliteDropSetId: defaultValues?.eliteDropSetId ?? 1,
            weaponElevationSetId: defaultValues?.weaponElevationSetId ?? 1,
        },
    });

    useEffect(() => {
        if (state.success) {
            router.push("/admin/weapons");
        }
    }, [state.success, router]);

    const weaponValues = {
        imageUrl: useWatch({ control, name: "imageUrl" }),
        miniUrl: useWatch({ control, name: "miniUrl" }),
    };

    const rarity = useWatch({ control, name: "rarity" }) ?? defaultValues?.rarity ?? 5;


    const weaponFields = [
        { name: "imageUrl", label: "Arme" },
        { name: "miniUrl", label: "Miniature" },
    ] as const;

    return (
        <AppFormWrapper action={formAction} size="md" className="mx-auto">
            <AppSection variant="ghost">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <AppFieldBase
                            label="Nom de l'arme"
                            name="name"
                            error={errors.name?.message || state.errors?.name?.[0]}
                            required
                        >
                            <AppInput className="h-9" placeholder="Ex: Absolution" {...register("name")} />
                        </AppFieldBase>

                        <AppFieldBase
                            label="Rareté de l'arme"
                            name="rarity"
                            required
                        >
                            <AppSelect
                                {...register("rarity", { valueAsNumber: true })}
                                options={allowedRarities.map((rarity) => ({
                                    value: rarity.toString(),
                                    label: "⭐".repeat(rarity),
                                }))}
                            />
                        </AppFieldBase>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <AppFieldBase
                            label="Type de l'arme"
                            name="weapon_type"
                            required
                        >
                            <AppSelect
                                {...register("weaponType")}
                                options={WEAPON_TYPES.map((weapon_type) => ({
                                    value: weapon_type,
                                    label: weapon_type,
                                }))}
                            >
                            </AppSelect>
                        </AppFieldBase>

                        <AppFieldBase
                            label="Sous-stat de l'arme"
                            name="substat"
                            required
                        >
                            <AppSelect
                                {...register("subStat")}
                                options={WEAPON_SUBSTATS.map((substat) => ({
                                    value: substat,
                                    label: substat,
                                }))}
                            >
                            </AppSelect>
                        </AppFieldBase>

                        <AppFieldBase
                            label="Source de l'arme"
                            name="source"
                            required
                        >
                            <AppSelect
                                {...register("source")}
                                options={SOURCES.map((source) => ({
                                    value: source,
                                    label: source,
                                }))}
                            >
                            </AppSelect>
                        </AppFieldBase>

                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <AppFieldBase
                            label="set de drop de mobs associé"
                            name="mob_drop_set"
                            required
                        >
                            <AppSelect
                                {...register("mobDropSetId", { valueAsNumber: true })}
                                options={mobDropSets.map((mobDropSet) => ({
                                    value: mobDropSet.id.toString(),
                                    label: mobDropSet.name,
                                }))}
                            >
                            </AppSelect>
                        </AppFieldBase>

                        <AppFieldBase
                            label="set de drop élite associé"
                            name="elite_drop_set"
                            required
                        >
                            <AppSelect
                                {...register("eliteDropSetId", { valueAsNumber: true })}
                                options={eliteDropSets.map((eliteDropSet) => ({
                                    value: eliteDropSet.id.toString(),
                                    label: eliteDropSet.name,
                                }))}
                            >
                            </AppSelect>
                        </AppFieldBase>

                        <AppFieldBase
                            label="set de DJ d'élévation associé"
                            name="weapon_elevation_dungeon_drop_set"
                            required
                        >
                            <AppSelect
                                {...register("weaponElevationSetId", { valueAsNumber: true })}
                                options={weaponElevationSets.map((weaponElevationSet) => ({
                                    value: weaponElevationSet.id.toString(),
                                    label: weaponElevationSet.name,
                                }))}
                            >
                            </AppSelect>
                        </AppFieldBase>
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-evenly items-center gap-3">
                    {weaponFields.map(({ name, label }) => (
                        <div key={name}>
                            <BaseItemUploaderField
                                label={label}
                                alt={label}
                                name={name}
                                rarity={Number(rarity)}
                                value={weaponValues[name]}
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
                variant="ghost"
            >
                <AppFieldBase
                    label="Description"
                    name="description"
                    required
                >
                    <AppTextArea {...register("description")}></AppTextArea>
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