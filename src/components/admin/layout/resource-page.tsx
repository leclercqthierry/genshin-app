import PageHero from "../../layout/page-hero";
import PageWrapper from "@/components/layout/page-wrapper";
import Grid from "../../layout/grid";
import AppButton from "@/components/ui/button/app-button";

import type { GridProps } from "../../layout/grid";


interface AdminResourcePageProps<T> extends Pick<GridProps, "variant"> {
    title: string;
    description?: string;
    count?: string;
    createHref: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

export default function AdminResourcePage<T>({
    title,
    description,
    count,
    createHref,
    items,
    renderItem,
    variant,
}: AdminResourcePageProps<T>) {
    return (
        <>
            <PageHero title={title}>
                <AppButton href={createHref}>Ajouter</AppButton>

                {description && (
                    <p className="text-center mt-6">{description}</p>
                )}

                {count && (
                    <p className="text-center mt-6">{count}</p>
                )}
            </PageHero>

            <PageWrapper>
                <Grid variant={variant}>
                    {items.map((item) => renderItem(item))}
                </Grid>
            </PageWrapper>
        </>
    );
}