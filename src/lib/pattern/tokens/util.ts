import { hasTemporal, Temporal } from '@agape/temporal';
import { DateOutOfRangeError } from '../errors/date-out-of-range-error';
import { JS_MAX_YEAR, JS_MIN_YEAR } from '../constants';
import { ResolvedDateTimeParts } from '../../types/resolved-datetime-parts';

export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\u00A0\u202F]/g, '[ \\u00A0\\u202F]');
}

export function buildRegexFromNames(names: readonly string[]): string {
  return names.map(escapeRegex).sort((a, b) => b.length - a.length).join('|');
}

export function getIsoWeekdayFromResolvedDateParts(parts: ResolvedDateTimeParts): number | undefined {
  if (!parts.calendarYear && !parts.year) return undefined;
  if (!parts.month || !parts.day) return undefined;

  if (hasTemporal()) {
    const plain = Temporal.PlainDate.from(resolvedDatePartsDateTimeIsoString(parts, 'date'));
    return plain.dayOfWeek;
  }
  else if (!isResolveDatePartYearInRange(parts)) {
    throw new DateOutOfRangeError();
  }

  const isoString = resolvedDatePartsDateTimeIsoString(parts);
  const d = new Date(isoString + 'Z');
  if (Number.isNaN(d.getTime())) throw new Error("Invalid timestamp")
  const dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function isResolveDatePartYearInRange(parts: ResolvedDateTimeParts) {
  const year = getIsoYearFromResolvedDateParts(parts);
  if (!year) return true;
  return year <= JS_MAX_YEAR && year >= JS_MIN_YEAR
}

function getIsoYearFromResolvedDateParts(parts: ResolvedDateTimeParts) {
  const { calendarYear } = parts;
  let { year, era } = parts;

  if (year === undefined && calendarYear) {
    era ??= 1;
    year = era === 1 ? year : (calendarYear - 1) * -1;
  }

  return year;
}


export function resolvedDatePartsDateTimeIsoString(parts: ResolvedDateTimeParts, output: 'date' | 'datetime' = 'datetime') {
  const { month=1, day=1, hour = 0, minute = 0, second = 0, nanoseconds = 0 } = parts;

  const year = getIsoYearFromResolvedDateParts(parts) ?? new Date().getFullYear();

  const date = `${year < 0 ? '-' : '+'}${String(Math.abs(year)).padStart(6,"0")}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  if (output === 'date') return date;

  const time = `${String(hour) === "24"?"00":String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}:${String(second).padStart(2, "0")}.${String(Math.floor(nanoseconds / 1_000_000)).padStart(3,'0')}`;
  return `${date}T${time}`;
}
