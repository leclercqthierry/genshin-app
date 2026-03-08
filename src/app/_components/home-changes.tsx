import { getAdminChangesGrouped } from "@/domain/admin-changes/get-admin-changes-grouped";
import { AdminChangeGroup } from "@/domain/admin-changes/types";
import ChangeGroupCard from "@/components/change/change-group-card";

export default async function HomeChanges() {
    const changes = await getAdminChangesGrouped(50);

    return (
        <div className="space-y-10">
            {Object.entries(changes).map(([date, groups]) => (
                <section key={date} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gold text-glow-gold">
                        {new Date(date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </h2>

                    <div className="space-y-6">
                        {Object.entries(groups).map(
                            ([entityLabel, group]: [string, AdminChangeGroup]) => (
                                <ChangeGroupCard
                                    key={entityLabel}
                                    label={entityLabel}
                                    group={group}
                                />
                            )
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
}