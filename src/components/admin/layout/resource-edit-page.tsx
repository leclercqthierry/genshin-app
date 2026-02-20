import AdminHero from "./hero";
import AdminPageWrapper from "./page-wrapper";

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
            <AdminHero title={title} />

            <AdminPageWrapper>
                {children}
            </AdminPageWrapper>
        </>
    );
}