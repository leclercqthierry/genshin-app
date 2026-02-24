"use client";

import AppCard from "../ui/card/app-card";
import { AdminChangeGroup } from "@/domain/admin-changes/types";
import ChangeListItem from "./change-list-item";

interface ChangeGroupCardProps {
    label: string;
    group: AdminChangeGroup;
}

export default function ChangeGroupCard({ label, group }: ChangeGroupCardProps) {
    return (
        <AppCard variant="default" size="lg" disableFloat>
            <h3 className="text-xl font-medium text-gold mb-3">
                {label}
            </h3>

            <div className="space-y-2 text-sm text-white">
                <ChangeListItem
                    label="Créations"
                    color="success"
                    items={group.creates}
                />

                <ChangeListItem
                    label="Modifications"
                    color="info"
                    items={group.updates}
                />

                <ChangeListItem
                    label="Suppressions"
                    color="danger"
                    items={group.deletes}
                />
            </div>
        </AppCard>
    );
}