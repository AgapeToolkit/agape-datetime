import { Temporal } from '@agape/temporal';

export function getOffsetLegacyDate(date: Date, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat('en', {
    timeZone: timeZone,
    timeZoneName: 'longOffset'
  });

  const parts = formatter.formatToParts(date);
  return parts.find(part => part.type === 'timeZoneName')?.value || '+00:00';
}

export function getOffsetTemporal(instant: Temporal.Instant, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat('en', {
    timeZone: timeZone,
    timeZoneName: 'longOffset'
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parts = formatter.formatToParts(instant as any);
  return parts.find(part => part.type === 'timeZoneName')?.value || '+00:00';
}
