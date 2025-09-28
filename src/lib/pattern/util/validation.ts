import { Temporal } from '@agape/temporal';
import { DateTimeParts } from '../../types/datetime-parts';

export function isValidDayOfMonth<T extends {year?: number, month?: number, day?: number}>(dateParts: T) {
  const {year, month, day} = dateParts;
  if (!month || !day) return true;

  if ([1,3,5,7,8,10,12].includes(month)) {
    return !(day > 31);
  }
  if ([4,6,9,11].includes(month)) {
    return !(day > 30);
  }
  if (month === 2) {
    return year === undefined || Number.isNaN(year) || isLeapYear(year)
      ? !(day > 29)
      : !(day > 28)
  }

  throw new RangeError(`Invalid month ${month}, acceptable range 1 through 12`)
}

export function isYearInRange(dateParts: { year?: number }) {
  if (dateParts.year === undefined) return true
  return dateParts.year <= 275759 && dateParts.year >= -271820;
}

function isLeapYear(year: number) {
  return (year % 4 === 0) && !(year % 100 == 0 && year % 400 !== 0)
}

// Build once at startup (Node 20+ / modern runtimes)
const SUPPORTED_ZONES =
  typeof Intl.supportedValuesOf === 'function'
    ? new Set(Intl.supportedValuesOf('timeZone'))
    : null;

export function isValidTimeZone(timeZone: string): boolean {
  if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
    throw new Error('Time zones are not available in this environment');
  }

  if (timeZone === 'UTC') return true;
  if (SUPPORTED_ZONES) return SUPPORTED_ZONES.has(timeZone);

  try {
    new Intl.DateTimeFormat('en', { timeZone });
    return true;
  } catch {
    return false;
  }
}


// export function offsetToMinutes(offset: string): number {
//   const match = /^([+-])(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(offset);
//   if (!match) {
//     throw new Error(`Invalid offset format: ${offset}`);
//   }
//
//   const sign = match[1] === '-' ? -1 : 1;
//   const hours = parseInt(match[2], 10);
//   const minutes = parseInt(match[3], 10);
//   const seconds = match[4] ? parseInt(match[4], 10) : 0;
//
//   const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);
//   return sign * totalMinutes;
// }

export function isValidOffset(parts: DateTimeParts): boolean {
  if (
    parts.year === undefined ||
    parts.month === undefined ||
    parts.day === undefined ||
    !parts.timeZone ||
    !parts.timeZoneOffset
  ) {
    return true;
  }

  const plain = Temporal.PlainDateTime.from({
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour ?? 0,
    minute: parts.minute ?? 0,
    second: parts.second ?? 0,
    millisecond: parts.nanoseconds ? Math.floor(parts.nanoseconds / 1_000_000) : 0,
    microsecond: parts.nanoseconds ? Math.floor((parts.nanoseconds / 1_000) % 1_000) : 0,
    nanosecond: parts.nanoseconds ? parts.nanoseconds % 1_000 : 0
  });

  const tz = Temporal.TimeZone.from(parts.timeZone);

  const possibleOffsets = tz
    .getPossibleInstantsFor(plain)
    .map(i => i.toZonedDateTimeISO(tz).offset);

  return possibleOffsets.includes(parts.timeZoneOffset);
}






/**
 *
 * @param datetime 2020-01-01T00:00:00
 * @param offset -05:00
 * @param timezone America/New_York
 */
// export function isValidOffset(datetime: string, offset: string, timezone: string) {
//   if (hasTemporal()) {
//     try {
//       Temporal.ZonedDateTime.from(`${datetime}${offset}[${timezone}]`)
//     }
//     catch (error) {
//       if (error instanceof Error && error.message.match(/^Offset -?\d{2}:\d{2} is invalid/)) {
//         return false
//       }
//       throw error
//     }
//     return true
//   }
//   else {
//     const standardOffset = getOffset(datetime, timezone, { dst: false })
//     if (offset === standardOffset) return true
//
//     const daylightOffset = getOffset(datetime, timezone, { dst: true })
//     return offset === daylightOffset
//   }
// }
//
// export function getOffset(date: string | Date, timeZone: string, options?: DateParsingOptions): string {
//   const offsetInMinutes = getOffsetInMinutes(date, timeZone, options)
//   const sign = offsetInMinutes >= 0
//   const absoluteValue = Math.abs(offsetInMinutes)
//   const minutes = absoluteValue % 60;
//   const hours = (absoluteValue - minutes) / 60;
//   return `${sign ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
// }
