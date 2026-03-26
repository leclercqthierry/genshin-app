import PageHero from "@/components/layout/page-hero";
import PageWrapper from "@/components/layout/page-wrapper";
import Grid from "@/components/layout/grid";

import type { GridProps } from "@/components/layout/grid";

interface GalleryPageProps<T> extends Pick<GridProps, "variant"> {
    title: string;
    count?: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    extra?: React.ReactNode;
    emptyState?: React.ReactNode;
}

export default function GalleryPage<T>({
    title,
    count,
    items,
    renderItem,
    variant,
    extra,
    emptyState
}: GalleryPageProps<T>) {
    const hasNoItems = items.length === 0;

    return (
        <div>
            <PageHero title={title}>
                {count && <p className="text-center mt-6">{count}</p>}
            </PageHero>

            {extra && <>{extra}</>}

            <PageWrapper>
                {hasNoItems && emptyState ? (
                    <div className="py-12 text-center text-white">
                        {emptyState}
                    </div>
                ) : (
                    <Grid variant={variant}>
                        {items.map((item) => renderItem(item))}
                    </Grid>
                )}
            </PageWrapper>
        </div>
    );
}
