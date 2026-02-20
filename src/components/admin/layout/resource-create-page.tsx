import AdminHero from "./hero";
import AdminPageWrapper from "./page-wrapper";

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
            <AdminHero title={title} />

            <AdminPageWrapper>
                {children}
            </AdminPageWrapper>
        </>
    );
}