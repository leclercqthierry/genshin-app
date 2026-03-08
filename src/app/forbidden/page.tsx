import PageHero from "@/components/layout/page-hero";

export default async function ForbiddenPage() {
    return (
        <>
            <PageHero title="Accès interdit"></PageHero>
            <p className="max-w-3xl mx-auto px-6 py-12 text-white text-center">
                Vous n&apos;avez pas les droits pour accéder à cette page.
            </p>
        </>
    );
}