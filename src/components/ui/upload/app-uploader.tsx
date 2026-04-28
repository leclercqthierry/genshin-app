"use client";

import { useUploadThing } from "@/lib/utils/uploadthing";
import AppFileInput from "../file/app-file-input";

type Props = {
    onUpload: (url: string) => void;
};

export default function AppUploader({ onUpload }: Props) {
    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: (files) => {
            if (files && files.length > 0) {
                onUpload(files[0].url);
            }
        },
        onUploadError: (error) => {
            console.error("Erreur upload :", error);
        },
    });

    return (
        <AppFileInput
            label="Importer une icône"
            accept="image/*"
            onSelect={(files) => startUpload(files)}
        />
    );
}