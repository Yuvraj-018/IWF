/** Escapes user input so it is matched literally inside a RegExp (".*" stays ".*", not "anything"). */
export function escapeRegex(value: string): string {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** "ABCDE1234F" -> "AB******4F": enough to recognise, not enough to misuse. */
export function maskPan(pan?: string | null): string | undefined {
  if (!pan) return undefined;
  const p = String(pan).toUpperCase();
  return p.length >= 6 ? `${p.slice(0, 2)}${"*".repeat(p.length - 4)}${p.slice(-2)}` : "****";
}
