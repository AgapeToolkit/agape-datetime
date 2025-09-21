export function escapeRegex(text: string): string {
  return text
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/[\u00A0\u202F]/g, '[ \\u00A0\\u202F]');
}

export function buildRegexFromNames(names: readonly string[]): string {
  return names.map(escapeRegex).sort((a, b) => b.length - a.length).join('|');
}
