"use client";

import Image from "next/image";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppUploader from "@/components/ui/upload/app-uploader";

type Props = {
    label: string;
    name: string;
    value: string | undefined;
    error?: string;
    onUpload: (url: string) => void;
    rarity: number;
};

export default function JewelUploaderField({
    label,
    name,
    value,
    error,
    onUpload,
    rarity,
}: Props) {
    return (
        <AppFieldBase label={label} name={name} required error={error}>
            <>
                {value && (
                    <div className="flex justify-center mb-3">
                        <Image
                            src={value}
                            alt="Prévisualisation"
                            width={80}
                            height={80}
                            className={`rounded border object-contain bg-rarity-${rarity}`}
                        />
                    </div>
                )}

                <AppUploader onUpload={onUpload} />
            </>
        </AppFieldBase>
    );
}