import PageHero from "../../layout/page-hero";
import AdminPageWrapper from "../../layout/page-wrapper";

interface AdminResourceEditPageProps {
    title: string;
    children: React.ReactNode;
}

export default function AdminResourceEditPage({
    title,
    children,
}: AdminResourceEditPageProps) {
    return (
        <>
            <PageHero title={title} />

            <AdminPageWrapper>
                {children}
            </AdminPageWrapper>
        </>
    );
}