import PageHero from "@/components/layout/page-hero";

export default async function DeleteAccountSucessPage() {
    return (
        <div>
            <PageHero title="Succès"></PageHero>
            <p className="max-w-3xl mx-auto px-6 py-12 text-white text-center">
                Votre compte a été supprimé avec succès.
            </p>
        </div>
    );
}