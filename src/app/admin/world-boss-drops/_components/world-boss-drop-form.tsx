"use client";

import { useActionState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppFormSection from "@/components/ui/form/app-form-section";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";

import AppUploader from "@/components/ui/upload/app-uploader";

import {
    worldBossDropSchema,
    type WorldBossDropSchema,
} from "@/domain/world-boss-drop/schema";

import type { WorldBossDropFormState } from "./types";

const initialState: WorldBossDropFormState = {
    success: false,
    errors: {},
};

type Props = {
    action: (
        prev: WorldBossDropFormState,
        formData: FormData
    ) => Promise<WorldBossDropFormState>;
    submitLabel: string;
    defaultValues?: Partial<WorldBossDropSchema>;
};

export default function WorldBossDropForm({ action, submitLabel, defaultValues }: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(action, initialState);

    const {
        register,
        setValue,
        control,
        formState: { errors, isValid, isDirty },
    } = useForm<WorldBossDropSchema>({
        resolver: zodResolver(worldBossDropSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            icon_url: defaultValues?.icon_url ?? "",
        },
    });

    const iconUrl = useWatch({ control, name: "icon_url" });

    // Redirection après succès
    useEffect(() => {
        if (state.success) {
            router.push("/admin/world-boss-drops");
        }
    }, [state.success, router]);

    return (
        <AppFormWrapper
            action={formAction}
            size="md"
            className="max-w-md mx-auto"
        >
            <AppFormSection withBorder={false}>
                {/* Nom */}
                <AppFieldBase
                    label="Nom du drop de boss de monde"
                    name="name"
                    required
                    error={errors.name?.message || state.errors?.name?.[0]}
                >
                    <AppInput
                        placeholder="Bougie vacillante.."
                        {...register("name")}
                    />
                </AppFieldBase>

                {/* Icône */}
                <AppFieldBase
                    label="Icône"
                    name="icon_url"
                    required
                    error={
                        errors.icon_url?.message ||
                        state.errors?.icon_url?.[0]
                    }
                >
                    <div className="contents">
                        {iconUrl && (
                            <div className="flex justify-center mb-3">
                                <Image
                                    src={iconUrl}
                                    alt="Prévisualisation"
                                    width={80}
                                    height={80}
                                    className="rounded border object-contain bg-rarity-4"
                                />
                            </div>
                        )}

                        <AppUploader
                            onUpload={(url) =>
                                setValue("icon_url", url, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        />
                    </div>
                </AppFieldBase>

                {/* Champ caché pour RHF → FormData */}
                <input type="hidden" {...register("icon_url")} />

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