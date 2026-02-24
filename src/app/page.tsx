import HomeChanges from "./_components/HomeChanges";
import PageHero from "@/components/layout/page-hero";

export default async function HomePage() {
    return (
        <>
            <PageHero title="Historique des changements">
                Dernières modifications effectuées dans l’interface d’administration.
            </PageHero>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <HomeChanges />
            </div>
        </>
    );
}