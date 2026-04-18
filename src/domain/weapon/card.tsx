import AppCard from "@/components/ui/card/app-card";
import Image from "next/image";
import CardActions from "@/components/ui/card/card-actions";
import { Weapon } from "./types";

interface WeaponCardProps {
    weapon: Weapon;
    onDelete?: (formData: FormData) => Promise<{ success: boolean; message?: string }>
    showActions?: boolean;
    rarityBgClass?: string;
}

export default function WeaponCard({ weapon, onDelete, showActions = true, rarityBgClass, }: WeaponCardProps) {

    return (
        <AppCard className="card-base card-hover max-w-sm mx-auto flex flex-col justify-between items-center gap-3">
            <div className="flex flex-col justify-between items-center">
                <Image
                    src={weapon.miniUrl}
                    alt={weapon.name}
                    width={112}
                    height={112}
                    className={`rounded bg-rarity-${rarityBgClass} object-contain h-28 w-auto`}
                />

                <h3 className="text-sm text-white font-semibold mt-3">
                    {weapon.name}
                </h3>
            </div>
            {/* Actions (optionnelles) */}
            {showActions && onDelete && (
                <CardActions
                    editHref={`/admin/weapons/${weapon.id}/edit`}
                    deleteAction={onDelete}
                    elementId={weapon.id}
                    small
                />
            )}
        </AppCard>
    )
}