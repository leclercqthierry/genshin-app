import { requireAdmin } from "@/services/auth/require-admin";
import { adminSections } from "@/domain/admin/sections";

import AdminHero from "@/components/ui/layout/admin-hero";
import AdminPageWrapper from "@/components/ui/layout/admin-page-wrapper";
import AdminGrid from "@/components/ui/layout/admin-grid";
import QuickLinkCard from "@/components/ui/card/quick-link-card";
import Redirecting from "@/components/ui/feedback/redirecting";

export default async function AdminPage() {
    const { redirect, profile } = await requireAdmin();

    if (redirect) return <Redirecting />;

    return (
        <>
            <AdminHero title="Espace Admin">
                Bienvenue {profile?.pseudo ?? "Admin"}.
            </AdminHero>

            <AdminPageWrapper>
                <AdminGrid variant="compact">
                    {adminSections.map((section) => (
                        <QuickLinkCard
                            key={section.href}
                            href={section.href}
                            title={section.title}
                            description={section.description}
                        />
                    ))}
                </AdminGrid>
            </AdminPageWrapper>
        </>
    );
}