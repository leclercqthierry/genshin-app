import AdminHero from "./hero";
import AdminPageWrapper from "./page-wrapper";
import AdminGrid from "./grid";
import AppButton from "@/components/ui/button/app-button";

import type { AdminGridProps } from "./grid";


interface AdminResourcePageProps<T> extends Pick<AdminGridProps, "variant"> {
    title: string;
    description?: string;
    createHref: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export default function AdminResourcePage<T>({
    title,
    description,
    createHref,
    items,
    renderItem,
    variant,
}: AdminResourcePageProps<T>) {
    return (
        <>
            <AdminHero title={title}>
                <AppButton href={createHref}>Ajouter</AppButton>

                {description && (
                    <p className="text-center mt-6">{description}</p>
                )}
            </AdminHero>

            <AdminPageWrapper>
                <AdminGrid variant={variant}>
                    {items.map((item) => renderItem(item))}
                </AdminGrid>
            </AdminPageWrapper>
        </>
    );
}