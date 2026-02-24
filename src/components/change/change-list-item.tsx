"use client";

interface ChangeListItemProps {
    label: string;
    color: "success" | "info" | "danger";
    items: string[];
}

export default function ChangeListItem({ label, color, items }: ChangeListItemProps) {
    if (items.length === 0) return null;

    return (
        <div className="space-y-1">
            <span className={`font-semibold text-${color}`}>
                {label} :
            </span>

            <ul className="pl-6 list-disc text-white/90">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}