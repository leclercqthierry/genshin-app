"use client";

import { useActionState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { baseItemSchema, type BaseItemSchema } from "@/domain/shared/base-item/schema";
import type { BaseItemFormState } from "../types";

import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppSection from "@/components/ui/layout/app-section";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppInput from "@/components/ui/form/app-input";
import AppButton from "@/components/ui/button/app-button";
import AppUploader from "@/components/ui/upload/app-uploader";
import Image from "next/image";

const initialState: BaseItemFormState = {
    success: false,
    errors: {},
};

type Props = {
    action: (
        prev: BaseItemFormState,
        formData: FormData
    ) => Promise<BaseItemFormState>;
    submitLabel: string;
    defaultValues?: Partial<BaseItemSchema>
    path: string;
    itemLabel: string;
    rarity?: number;
};

export default function BaseItemForm({ action, submitLabel, defaultValues, path, itemLabel, rarity }: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(action, initialState);

    const {
        register,
        setValue,
        control,
        formState: { errors, isValid, isDirty },
    } = useForm<BaseItemSchema>({
        resolver: zodResolver(baseItemSchema),
        mode: "onChange",
        defaultValues: {
            name: defaultValues?.name ?? "",
            iconUrl: defaultValues?.iconUrl ?? "",
        },
    });

    const iconUrl = useWatch({ control, name: "iconUrl" });

    // Redirection après succès
    useEffect(() => {
        if (state.success) {
            router.push(path); // ex:"/admin/boss-drops"
        }
    }, [state.success, router, path]);

    return (
        <AppFormWrapper
            action={formAction}
            size="md"
            className="max-w-md mx-auto"
        >
            <AppSection variant="ghost">
                {/* Nom */}
                <AppFieldBase
                    label={itemLabel}// ex: "Nom du drop de boss"
                    name="name"
                    required
                    error={errors.name?.message || state.errors?.name?.[0]}
                >
                    <AppInput
                        placeholder="Item"
                        {...register("name")}
                    />
                </AppFieldBase>

                {/* Icône */}
                <AppFieldBase
                    label="Icône"
                    name="iconUrl"
                    required
                    error={
                        errors.iconUrl?.message ||
                        state.errors?.iconUrl?.[0]
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
                                    className={`rounded border object-contain bg-rarity-${rarity}`}
                                />
                            </div>
                        )}

                        <AppUploader
                            onUpload={(url) =>
                                setValue("iconUrl", url, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        />
                    </div>
                </AppFieldBase>

                {/* Champ caché pour RHF → FormData */}
                <input type="hidden" {...register("iconUrl")} />

                {state.message && (
                    <p className="text-red-500 text-sm">{state.message}</p>
                )}
            </AppSection>

            <div className="flex justify-center">
                <AppButton type="submit" disabled={!isValid || !isDirty}>
                    {submitLabel}
                </AppButton>
            </div>

        </AppFormWrapper>
    );
}