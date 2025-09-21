export function getCaptureGroup(name: string, regexPart: string) {
  return `(?<${name}>${regexPart})`;
}
