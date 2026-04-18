import Image from "next/image";

export default function AscensionCell({
    src,
    count,
    rarity,
    setType,
}: {
    src: string;
    count: number;
    rarity: number;
    setType: string;
}) {
    return (
        <td className="border-r py-2 px-2">
            <div className="flex flex-col items-center  gap-1">
                <Image
                    src={src}
                    alt={`Item de drop ${setType} de rareté ${rarity}`}
                    width={40}
                    height={40}
                    className={`bg-rarity-${rarity} h-10 w-10 rounded-md`}
                />
                <span className="text-base font-medium">{count}</span>
            </div>
        </td>
    );
}
