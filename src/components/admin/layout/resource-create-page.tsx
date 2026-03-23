import PageHero from "../../layout/page-hero";
import AdminPageWrapper from "../../layout/page-wrapper";

interface AdminResourceCreatePageProps {
    title: string;
    children: React.ReactNode;
}

export default function AdminResourceCreatePage({
    title,
    children,
}: AdminResourceCreatePageProps) {
    return (
        <>
            <PageHero title={title} />

            <AdminPageWrapper>
                {children}
            </AdminPageWrapper>
        </>
    );
}