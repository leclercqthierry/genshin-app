export function extractFileKey(url: string): string {
    const parts = url.split("/");
    return parts[parts.length - 1];
}