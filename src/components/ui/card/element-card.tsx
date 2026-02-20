import Image from "next/image";
import AppCard from "./app-card";
import CardActions from "./card-actions";
import type { Element } from "@/domain/element/types";

interface ElementCardProps {
    element: Element;
    onDelete: (formData: FormData) => Promise<{ success: boolean; message?: string }>
}

export default function ElementCard({ element, onDelete }: ElementCardProps) {
    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col items-center gap-3">
            <Image
                src={element.iconUrl}
                alt={element.name}
                width={64}
                height={64}
                className="rounded"
            />

            <h3 className="text-lg text-white font-semibold">
                {element.name}
            </h3>

            <CardActions
                editHref={`/admin/elements/${element.id}/edit`}
                deleteAction={onDelete}
                elementId={element.id}
                small
            />
        </AppCard>
    );
}