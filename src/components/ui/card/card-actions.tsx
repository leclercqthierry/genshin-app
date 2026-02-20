"use client";

import { useRouter } from "next/navigation";
import AppButton from "../button/app-button";
import { useTransition } from "react";

interface CardActionsProps {
    editHref: string;
    deleteAction: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
    elementId: number;
    small?: boolean;
}

export default function CardActions({
    editHref,
    deleteAction,
    elementId,
    small,
}: CardActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function onDeleteClick() {
        if (!confirm("Supprimer cet élément ?")) return;

        const formData = new FormData();
        formData.append("id", String(elementId));

        startTransition(async () => {
            await deleteAction(formData);
            router.refresh();
        });
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            <AppButton
                href={editHref}
                variant="secondary"
                size={small ? "sm" : "md"}
            >
                Modifier
            </AppButton>

            <AppButton
                onClick={onDeleteClick}
                variant="danger"
                size={small ? "sm" : "md"}
                disabled={isPending}
            >
                {isPending ? "Suppression..." : "Supprimer"}
            </AppButton>
        </div>
    );
}