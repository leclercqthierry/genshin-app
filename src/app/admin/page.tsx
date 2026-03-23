import { requireAdmin } from "@/services/auth/require-admin";
import { adminSections } from "@/domain/admin/sections";

import PageHero from "@/components/layout/page-hero";
import AdminPageWrapper from "@/components/layout/page-wrapper";
import AdminGrid from "@/components/layout/grid";
import QuickLinkCard from "@/components/ui/card/quick-link-card";
import Redirecting from "@/components/ui/feedback/redirecting";

export default async function AdminPage() {
    const { redirect, profile } = await requireAdmin();

    if (redirect) return <Redirecting />;

    return (
        <>
            <PageHero title="Espace Admin">
                Bienvenue {profile?.pseudo ?? "admin"}.
            </PageHero>

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