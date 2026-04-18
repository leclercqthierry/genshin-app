export function assertLiteral<T extends readonly string[]>(
    value: string,
    allowed: T
): T[number] {
    if (allowed.includes(value as T[number])) {
        return value as T[number];
    }
    throw new Error(`Valeur littérale invalide: ${value}`);
}
