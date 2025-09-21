import { hasTemporal, Temporal } from '@agape/temporal';
import { DateTimeParts } from '../../types/datetime-parts';
import { InvalidTimeZoneOffsetError } from '../../errors/invalid-timezone-offset-error';

export function isValidDayOfMonth<T extends {year?: number, month?: number, day?: number}>(dateParts: T) {
  const {year, month, day} = dateParts
  if (!month || !day) return false

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
  if (dateParts.year === undefined) return false
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

export function datePartsToWallClockDateTime(parts: DateTimeParts,): string {
  if (parts.year === undefined || parts.month === undefined || parts.day === undefined) {
    throw new Error("Year, month, and day are required");
  }

  const yearSign = parts.year >= 0 ? "+" : "-";
  const year = Math.abs(parts.year).toString().padStart(4, "0");
  const month = (parts.month ?? 1).toString().padStart(2, "0");
  const day = (parts.day ?? 1).toString().padStart(2, "0");

  const hour = (parts.hour ?? 0).toString().padStart(2, "0");
  const minute = (parts.minute ?? 0).toString().padStart(2, "0");
  const second = (parts.second ?? 0).toString().padStart(2, "0");

  let fractional = "";
  if (parts.fractionalSecond !== undefined && parts.fractionalSecond !== 0) {
    fractional = "." + parts.fractionalSecond.toString();
  }

  return `${yearSign}${year}-${month}-${day}T${hour}:${minute}:${second}${fractional}`;
}

export function isValidOffset(parts: DateTimeParts): boolean {
  if (
    parts.year === undefined ||
    parts.month === undefined ||
    parts.day === undefined ||
    !parts.timeZoneId ||
    !parts.timeZoneOffset
  ) {
    return true;
  }

  const isoWallClock = datePartsToWallClockDateTime(parts);
  const plain = Temporal.PlainDateTime.from(isoWallClock);

  const tz = Temporal.TimeZone.from(parts.timeZoneId);

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
