// Le composant est en fait le même pour AptitudeDungeonDropSet et CharJewelSet

"use client";

import Image from "next/image";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppUploader from "@/components/ui/upload/app-uploader";

type Props = {
    label: string;
    alt: string;
    name: string;
    value: string | undefined;
    error?: string;
    onUpload: (url: string) => void;
    rarity?: number;
};

export default function BaseItemUploaderField({
    label,
    alt,
    name,
    value,
    error,
    onUpload,
    rarity,
}: Props) {
    return (
        <AppFieldBase label={label} name={name} required error={error}>
            <div>
                {value && (
                    <div className="flex mx-auto justify-center mb-3 w-20 h-20">
                        <Image
                            src={value}
                            alt={alt}
                            height={80}
                            width={80}
                            className={`rounded border object-contain bg-rarity-${rarity}`}
                        />
                    </div>
                )}

                <AppUploader onUpload={onUpload} />
            </div>
        </AppFieldBase>
    );
}