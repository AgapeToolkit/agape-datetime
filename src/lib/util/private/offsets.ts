
export function getOffsetLegacyDate(date: Date, timeZone: string): string {
  // Simplified implementation for legacy date offset calculation
  const formatter = new Intl.DateTimeFormat('en', {
    timeZone: timeZone,
    timeZoneName: 'longOffset'
  });

  const parts = formatter.formatToParts(date);
  const offset = parts.find(part => part.type === 'timeZoneName')?.value || '+00:00';
  return offset;
}

export function getOffsetTemporal(instant: any, timeZone: string): string {
  // Simplified implementation for temporal offset calculation
  const formatter = new Intl.DateTimeFormat('en', {
    timeZone: timeZone,
    timeZoneName: 'longOffset'
  });

  const parts = formatter.formatToParts(instant);
  const offset = parts.find(part => part.type === 'timeZoneName')?.value || '+00:00';
  return offset;
}
