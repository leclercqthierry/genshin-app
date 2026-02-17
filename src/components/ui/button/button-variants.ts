export const buttonVariantStyles = {
    primary: `
        bg-[var(--color-gold)]
        text-black
        border border-[var(--color-gold)]
        hover:bg-[var(--color-gold)]/60
        hover:border-[var(--color-gold)]
        hover:-translate-y-0.5
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.4)]
        active:bg-[var(--color-gold)]/50
        active:translate-y-0
        disabled:bg-white/10 disabled:text-white/40 disabled:border-transparent
    `,
    secondary: `
        bg-[var(--color-primary-80)]
        text-white
        border border-white/20
        hover:bg-[var(--color-primary-80)]/60
        hover:border-white/40
        hover:-translate-y-0.5
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.4)]
        active:bg-[var(--color-primary-80)]/50
        active:translate-y-0
        disabled:bg-[var(--color-primary-80)] disabled:text-white/40 disabled:border-transparent
    `,
    ghost: `
        bg-transparent
        text-[var(--color-gold)]
        border border-transparent
        hover:bg-black/20
        hover:border-[var(--color-gold)]
        hover:-translate-y-0.5
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.4)]
        active:bg-black/30
        active:translate-y-0
        disabled:text-white/30 disabled:border-transparent
    `,
    danger: `
        bg-red-600 text-white
        border border-red-600
        hover:bg-red-700
        hover:border-red-700
        hover:-translate-y-0.5
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.4)]
        active:bg-red-800
        active:translate-y-0
        disabled:bg-red-900/40 disabled:text-white/40 disabled:border-transparent
    `,
} as const;