"use client";

import { useState, useMemo } from "react";
import AppFormWrapper from "@/components/ui/form/app-form-wrapper";
import AppFieldBase from "@/components/ui/form/app-field-base";
import AppButton from "@/components/ui/button/app-button";
import { changePseudo } from "../actions/change-pseudo";
import { changePseudoSchema } from "../schema";

export function ChangePseudoForm({ defaultPseudo }: { defaultPseudo: string }) {
    const [pseudo, setPseudo] = useState(defaultPseudo);

    // Validation Zod
    const error = useMemo(() => {
        const value = pseudo.trim();

        const result = changePseudoSchema.safeParse(value);
        if (!result.success) {
            return result.error.issues[0].message;
        }

        return null;
    }, [pseudo]);

    // Désactivation du bouton si :
    // - pseudo invalide
    // - pseudo identique à l'original
    const isDisabled =
        error !== null ||
        pseudo.trim() === defaultPseudo.trim();

    return (
        <AppFormWrapper action={changePseudo} variant="default" size="md">
            <AppFieldBase
                label="Nouveau pseudo"
                name="pseudo"
                required
                error={error ?? undefined}
            >
                <input
                    type="text"
                    name="pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-black/20 border border-white/20 text-white"
                />
            </AppFieldBase>

            <AppButton
                type="submit"
                variant="primary"
                full
                disabled={isDisabled}
            >
                Enregistrer
            </AppButton>
        </AppFormWrapper>
    );
}
