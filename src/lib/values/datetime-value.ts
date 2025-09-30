/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { hasValue, isNil, omit } from '@agape/util';
import { Temporal } from '@agape/temporal';
import { ResolvedDateTimeParts } from '../types/resolved-datetime-parts';
import { ParsedDateTimeParts } from '../types/parsed-datetime-parts';
import { DateTimeParts } from '../types/datetime-parts';
import { resolveDateTimeParts } from './util/resolve';
import { normalizeDateTimeParts } from './util/normalize';
import { PopulatedDateTimePatternOptions } from '../pattern/types/populated-datetime-pattern-options';
import { validateNormalizedValue } from './util/validation';
import { FillDateTimeParts, FillOptions } from '../types/fill-datetime-parts';
import { FillStrategy } from '../types/fill-strategy';
import { BaseValue } from './base-value';
import { TimeValue } from './time-value';
import { DateValue } from './date-value';

import { ToPlainDateOptions } from '../types/to-plain-date-options';
import { ToPlainTimeOptions } from '../types/to-plain-time-options';
import { ToPlainDateTimeOptions } from '../types/to-plain-datetime-options';
import { ToPlainYearMonthOptions } from '../types/to-plain-year-month-options';
import { ToPlainMonthDayOptions } from '../types/to-plain-month-day-options';
import { ToZonedDateTimeOptions } from '../types/to-zoned-datetime-options';
import { ToInstantOptions } from '../types/to-instant-options';
import { ToTimeZoneOptions } from '../types/to-timezone-options';
import { ToDateOptions } from '../types/to-date-options';
import { legacyDateToDateParts } from './util/legacy-date-to-date-parts';
import { getTimeZone, getSystemTimeZone } from '@agape/locale';
import { Class } from '@agape/types';


const DEFAULT_PARTS_TO_FILL: Array<keyof DateTimeParts> = ['year', 'month', 'day', 'hour', 'minute', 'second', 'nanosecond']




export class DateTimeValue extends BaseValue implements DateTimeParts {

  get year(): number | undefined {
    return this.parts.year;
  }

  get month(): number | undefined {
    return this.parts.month;
  }

  get day(): number | undefined {
    return this.parts.day;
  }

  get weekday(): number | undefined {
    return this.parts.weekday;
  }

  get hour(): number | undefined {
    return this.parts.hour;
  }

  get minute(): number | undefined {
    return this.parts.minute;
  }

  get second(): number | undefined {
    return this.parts.second;
  }

  get nanosecond(): number | undefined {
    return this.parts.nanosecond;
  }

  get timeZone(): string | undefined {
    return this.parts.timeZone;
  }

  get timeZoneOffset(): string | undefined {
    return this.parts.timeZoneOffset;
  }

  get secondsTimestamp(): number | undefined {
    return this.parts.secondsTimestamp;
  }

  get millisecondsTimestamp(): number | undefined {
    return this.parts.millisecondsTimestamp;
  }

  get nanosecondsTimestamp(): bigint | undefined {
    return this.parts.nanosecondsTimestamp;
  }

  getEra(): number | undefined {
    if (!isNil(this.parts.year)) return this.parts.year > 0 ? 1 : 0;
    if (!isNil(this.resolvedParts?.era)) return this.resolvedParts.era;
    return undefined;
  }

  getDayPeriod(): number | undefined {
    if (!isNil(this.parts.hour)) return this.parts.hour < 12 ? 0 : 1;
    if (!isNil(this.resolvedParts?.dayPeriod)) return this.resolvedParts.dayPeriod;
  }

  get resolved(): ResolvedDateTimeParts | undefined {
    return this.resolvedParts;
  }

  get parsed(): ParsedDateTimeParts | undefined {
    return this.parsedParts;
  }

  constructor(parts?: DateTimeParts | DateTimeValue) {
    super();
    if (!parts) return;

    if (parts instanceof DateTimeValue) {
      this.parts = parts.parts;
      this.resolvedParts = parts.resolvedParts;
      this.parsedParts = parts.parsedParts;
      return;
    }

    this._set(parts);
  }

  static from(input: any): DateTimeValue {
    if (input instanceof DateTimeValue) {
      return new DateTimeValue(input);
    }

    if (input instanceof TimeValue) {
      return new DateTimeValue(input.toParts());
    }

    if (input instanceof DateValue) {
      return new DateTimeValue(input.toParts());
    }

    if (typeof input === 'string') {
      return DateTimeValue.fromString(input);
    }

    if (input instanceof Date) {
      return DateTimeValue.fromDate(input);
    }

    // Handle Temporal objects
    if (input instanceof Temporal.PlainDate) {
      return DateTimeValue.fromPlainDate(input);
    }
    if (input instanceof Temporal.PlainTime) {
      return DateTimeValue.fromPlainTime(input);
    }
    if (input instanceof Temporal.PlainDateTime) {
      return DateTimeValue.fromPlainDateTime(input);
    }
    if (input instanceof Temporal.ZonedDateTime) {
      return DateTimeValue.fromZonedDateTime(input);
    }
    if (input instanceof Temporal.Instant) {
      return DateTimeValue.fromInstant(input);
    }
    if (input instanceof Temporal.PlainYearMonth) {
      return DateTimeValue.fromPlainYearMonth(input);
    }
    if (input instanceof Temporal.PlainMonthDay) {
      return DateTimeValue.fromPlainMonthDay(input);
    }

    // Handle DateTimeParts object
    if (input && typeof input === 'object') {
      return new DateTimeValue(input);
    }

    throw new Error(`Cannot create DateTimeValue from input: ${input}`);
  }

  private static fromString(input: string): DateTimeValue {
    const parts: DateTimeParts = {};

    // Remove whitespace
    const trimmed = input.trim();

    // Handle various patterns
    if (/^[+-]?\d{4,6}$/.test(trimmed)) {
      // Just a year: 2025, +2025, -2025, +123456
      const year = parseInt(trimmed, 10);
      parts.year = year;
    } else if (/^\d{1,2}-\d{1,2}$/.test(trimmed)) {
      // Month-day: 01-01, 1-1, 12-25
      const [month, day] = trimmed.split('-').map(n => parseInt(n, 10));
      parts.month = month;
      parts.day = day;
    } else if (/^\d{1,2}:\d{1,2}(:\d{1,2}(\.\d+)?)?$/.test(trimmed)) {
      // Time: 12:56, 7:35:6, 12:34:56.789
      const timeParts = trimmed.split(':');
      parts.hour = parseInt(timeParts[0], 10);
      parts.minute = parseInt(timeParts[1], 10);

      if (timeParts[2]) {
        const secondPart = timeParts[2];
        if (secondPart.includes('.')) {
          const [second, fractional] = secondPart.split('.');
          parts.second = parseInt(second, 10);
          // Convert fractional part to nanoseconds (pad to 9 digits, then truncate)
          const paddedFractional = fractional.padEnd(9, '0').substring(0, 9);
          parts.nanosecond = parseInt(paddedFractional, 10);
        } else {
          parts.second = parseInt(secondPart, 10);
        }
      }
    } else if (/^[+-]?\d{4,6}-\d{1,2}$/.test(trimmed)) {
      // Year-month: 2025-01, +2025-1, -2025-12
      const [yearPart, monthPart] = trimmed.split('-');
      parts.year = parseInt(yearPart, 10);
      parts.month = parseInt(monthPart, 10);
    } else if (/^[+-]?\d{4,6}-\d{1,2}-\d{1,2}$/.test(trimmed)) {
      // Date: 2025-01-15, +2025-1-1, -2025-12-25
      const [yearPart, monthPart, dayPart] = trimmed.split('-');
      parts.year = parseInt(yearPart, 10);
      parts.month = parseInt(monthPart, 10);
      parts.day = parseInt(dayPart, 10);
    } else if (/^[+-]?\d{4,6}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}(:\d{1,2}(\.\d+)?)?([+-]\d{1,2}:\d{2})?(\[[^\]]+\])?$/.test(trimmed)) {
      // Full ISO datetime: 2025-01-15T14:30:45.123+05:00[America/New_York]
      const isoMatch = trimmed.match(/^([+-]?\d{4,6})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2})(:(\d{1,2})(\.(\d+))?)?([+-]\d{1,2}:\d{2})?(\[([^\]]+)\])?$/);
      if (isoMatch) {
        parts.year = parseInt(isoMatch[1], 10);
        parts.month = parseInt(isoMatch[2], 10);
        parts.day = parseInt(isoMatch[3], 10);
        parts.hour = parseInt(isoMatch[4], 10);
        parts.minute = parseInt(isoMatch[5], 10);

        if (isoMatch[7]) {
          parts.second = parseInt(isoMatch[7], 10);
        }

        if (isoMatch[9]) {
          // Convert fractional part to nanoseconds (pad to 9 digits, then truncate)
          const paddedFractional = isoMatch[9].padEnd(9, '0').substring(0, 9);
          parts.nanosecond = parseInt(paddedFractional, 10);
        }

        if (isoMatch[10]) {
          parts.timeZoneOffset = isoMatch[10];
        }

        if (isoMatch[12]) {
          parts.timeZone = isoMatch[12];
        }
      }
    } else {
      throw new Error(`Cannot parse datetime string: ${input}`);
    }

    // Validate the parsed parts before creating DateTimeValue
    validateNormalizedValue(parts);
    return new DateTimeValue(parts);
  }

  private static fromDate(date: Date): DateTimeValue {
    const parts: DateTimeParts = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1, // JavaScript months are 0-based
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
      nanosecond: date.getUTCMilliseconds() * 1_000_000
    };
    const dtv = new DateTimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainDate(plainDate: Temporal.PlainDate): DateTimeValue {
    const parts: DateTimeParts = {
      year: plainDate.year,
      month: plainDate.month,
      day: plainDate.day
    };
    const dtv = new DateTimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainTime(plainTime: Temporal.PlainTime): DateTimeValue {
    const parts: DateTimeParts = {
      hour: plainTime.hour,
      minute: plainTime.minute,
      second: plainTime.second,
      nanosecond: plainTime.nanosecond
    };
    const dtv = new DateTimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainDateTime(plainDateTime: Temporal.PlainDateTime): DateTimeValue {
    const parts: DateTimeParts = {
      year: plainDateTime.year,
      month: plainDateTime.month,
      day: plainDateTime.day,
      hour: plainDateTime.hour,
      minute: plainDateTime.minute,
      second: plainDateTime.second,
      nanosecond: plainDateTime.nanosecond
    };
    const dtv = new DateTimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromZonedDateTime(zonedDateTime: Temporal.ZonedDateTime): DateTimeValue {
    const parts: DateTimeParts = {
      year: zonedDateTime.year,
      month: zonedDateTime.month,
      day: zonedDateTime.day,
      hour: zonedDateTime.hour,
      minute: zonedDateTime.minute,
      second: zonedDateTime.second,
      nanosecond: zonedDateTime.nanosecond,
      timeZone: zonedDateTime.timeZoneId,
      timeZoneOffset: zonedDateTime.offset
    };
    const dtv = new DateTimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromInstant(instant: Temporal.Instant): DateTimeValue {
    // Convert to UTC ZonedDateTime first
    const zonedDateTime = instant.toZonedDateTimeISO('UTC');
    return DateTimeValue.fromZonedDateTime(zonedDateTime);
  }

  private static fromPlainYearMonth(plainYearMonth: Temporal.PlainYearMonth): DateTimeValue {
    const parts: DateTimeParts = {
      year: plainYearMonth.year,
      month: plainYearMonth.month
    };
    const dtv = new DateTimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainMonthDay(plainMonthDay: Temporal.PlainMonthDay): DateTimeValue {
    // Convert monthCode to month number (e.g., "M01" -> 1)
    const monthCode = plainMonthDay.monthCode;
    const month = parseInt(monthCode.substring(1), 10);

    const parts: DateTimeParts = {
      month: month,
      day: plainMonthDay.day
    };
    const dtv = new DateTimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private _set(parts: DateTimeParts) {
    // Only assign known DateTimeParts properties
    if (parts.year !== undefined) this.parts.year = parts.year;
    if (parts.month !== undefined) this.parts.month = parts.month;
    if (parts.day !== undefined) this.parts.day = parts.day;
    if (parts.hour !== undefined) this.parts.hour = parts.hour;
    if (parts.minute !== undefined) this.parts.minute = parts.minute;
    if (parts.second !== undefined) this.parts.second = parts.second;
    if (parts.nanosecond !== undefined) this.parts.nanosecond = parts.nanosecond;
    if (parts.weekday !== undefined) this.parts.weekday = parts.weekday;
    if (parts.timeZone !== undefined) this.parts.timeZone = parts.timeZone;
    if (parts.timeZoneOffset !== undefined) this.parts.timeZoneOffset = parts.timeZoneOffset;
    if (parts.secondsTimestamp !== undefined) this.parts.secondsTimestamp = parts.secondsTimestamp;
    if (parts.millisecondsTimestamp !== undefined) this.parts.millisecondsTimestamp = parts.millisecondsTimestamp;
    if (parts.nanosecondsTimestamp !== undefined) this.parts.nanosecondsTimestamp = parts.nanosecondsTimestamp;
  }

  set(parts: DateTimeParts) {
    // Validate the merged parts before creating new instance
    const mergedParts = { ...this.parts, ...parts };
    validateNormalizedValue(mergedParts);
    
    const newInstance = new DateTimeValue();
    newInstance._set(mergedParts);
    return newInstance;
  }

  fill(fillOptions: FillOptions) {
    const { strategy, ...explicitValues } = fillOptions;
    const parts = this.toParts();

    // First apply explicit values
    const partsWithExplicit = { ...parts, ...explicitValues };

    // Then use strategy to fill remaining missing values
    const filledParts = this._fill(partsWithExplicit, strategy, DEFAULT_PARTS_TO_FILL);

    return new DateTimeValue(filledParts);
  }

  toParts(): DateTimeParts {
    return { ...this.parts };
  }

  static fromParsed(options: PopulatedDateTimePatternOptions, parsedParts: ParsedDateTimeParts): DateTimeValue {
    const resolvedParts: ResolvedDateTimeParts = resolveDateTimeParts(parsedParts, options);
    const normalizedParts: DateTimeParts = normalizeDateTimeParts(resolvedParts, options);
    const dtv = new DateTimeValue(normalizedParts);
    dtv.resolvedParts = resolvedParts;
    dtv.parsedParts = parsedParts;
    return dtv;
  }

  toPlainDate(options?: ToPlainDateOptions): Temporal.PlainDate {
    return this.inflate(Temporal.PlainDate, ['year', 'month', 'day'], options);
  }

  private inflate(target: Class<Temporal.PlainDate | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.PlainYearMonth | Temporal.PlainMonthDay>, requiredParts: Array<keyof DateTimeParts>, options?: FillDateTimeParts): any {

    const fillParts = options ? omit(options, ['fill']) : {};

    let parts: DateTimeParts = { ...fillParts, ...this.parts }

    const hasRequiredParts = this.hasRequiredParts(parts, requiredParts);

    if (!hasRequiredParts) {
      if (!options?.fill) {
        throw new Error(`Cannot create Temporal.${target.name}, insufficient data`);
      }

      parts = this._fill(parts, options.fill, requiredParts);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target as any).from(parts);
  }

  private hasRequiredParts(parts: DateTimeParts, requiredParts: Array<keyof DateTimeParts>): boolean {
    for (const key of requiredParts) {
      if (!hasValue(parts[key])) return false;
    }
    return true;
  }

  private _fill(parts: DateTimeParts, strategy: FillStrategy, partsToFill: Array<keyof DateTimeParts> = DEFAULT_PARTS_TO_FILL): DateTimeParts {
    const filled = { ...parts };

    if (strategy === 'start') {
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        switch(part) {
          case 'year':
            filled.year = 1;
            break;
          case 'month':
            filled.month = 1;
            break;
          case 'day':
            filled.day = 1;
            break;
          case 'hour':
            filled.hour = 0;
            break;
          case 'minute':
            filled.minute = 0;
            break;
          case 'second':
            filled.second = 0;
            break;
          case 'nanosecond':
            filled.nanosecond = 0;
            break;
        }
      }
    }
    else if (strategy === 'end') {
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        switch(part) {
          case 'year':
            filled.year = 999999;
            break;
          case 'month':
            filled.month = 12;
            break;
          case 'day':
            filled.day = 1;
            break;
          case 'hour':
            filled.hour = 23;
            break;
          case 'minute':
            filled.minute = 59;
            break;
          case 'second':
            filled.second = 59;
            break;
          case 'nanosecond':
            filled.nanosecond = 999999999;
            break;
        }
      }
    }
    else if (strategy === 'current') {
      const timeZone = filled.timeZone ?? getTimeZone();
      const now = legacyDateToDateParts(new Date(), timeZone);
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        let value = now[part];
        // Fix for legacyDateToDateParts returning NaN for seconds
        if (part === 'second' && (isNaN(value as number) || value === undefined)) {
          value = new Date().getSeconds();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filled[part] = value as any;
      }
    }

    return filled;
  }

  toPlainTime(options?: ToPlainTimeOptions): Temporal.PlainTime {
    return this.inflate(Temporal.PlainTime, ['hour', 'minute', 'second'], options);
  }

  toPlainDateTime(options?: ToPlainDateTimeOptions): Temporal.PlainDateTime {
    return this.inflate(Temporal.PlainDateTime, ['year', 'month', 'day', 'hour', 'minute', 'second'], options);
  }

  toPlainYearMonth(options?: ToPlainYearMonthOptions): Temporal.PlainYearMonth {
    return this.inflate(Temporal.PlainYearMonth, ['year', 'month'], options);
  }

  toPlainMonthDay(options?: ToPlainMonthDayOptions): Temporal.PlainMonthDay {
    return this.inflate(Temporal.PlainMonthDay, ['month', 'day'], options);
  }

  toZonedDateTime(options?: ToZonedDateTimeOptions): Temporal.ZonedDateTime {
    const timeZoneToUse = options?.timeZone ?? this.parts.timeZone ?? getTimeZone();

    if (!timeZoneToUse) {
      throw new Error('Cannot create Temporal.ZonedDateTime, timeZone is required');
    }

    const fillParts = options ? omit(options, ['fill', 'timeZone', 'disambiguate']) : {};
    let parts: DateTimeParts = { ...fillParts, ...this.parts, timeZone: timeZoneToUse };

    const requiredParts: Array<keyof DateTimeParts> = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    const hasRequiredParts = this.hasRequiredParts(parts, requiredParts);

    if (!hasRequiredParts) {
      if (!options?.fill) {
        throw new Error('Cannot create Temporal.ZonedDateTime, insufficient data');
      }
      parts = this._fill(parts, options.fill, requiredParts);
    }

    // Direct mapping to Temporal (nanosecond property maps to nanosecond)
    const temporalParts: any = { ...parts };
    if (temporalParts.nanosecond !== undefined) {
      temporalParts.nanosecond = temporalParts.nanosecond;
    }

    // Only use disambiguation if no timeZoneOffset is provided
    if (!parts.timeZoneOffset && options?.disambiguate) {
      return Temporal.ZonedDateTime.from(temporalParts, { disambiguation: options.disambiguate });
    }

    return Temporal.ZonedDateTime.from(temporalParts);
  }

  toInstant(options?: ToInstantOptions): Temporal.Instant {
    const zonedDateTime = this.toZonedDateTime(options);
    return zonedDateTime.toInstant();
  }

  toTimeZone(options?: ToTimeZoneOptions): Temporal.TimeZone {
    const timeZoneToUse = options?.timeZone ?? this.parts.timeZone;

    if (!timeZoneToUse) {
      if (!options?.fill) {
        throw new Error('Cannot create Temporal.TimeZone, timeZone is required');
      }
      // Use default timezone when fill strategy is provided
      return new Temporal.TimeZone(getTimeZone());
    }

    return new Temporal.TimeZone(timeZoneToUse);
  }

  toDate(options?: ToDateOptions): Date {
    const timeZoneToUse = options?.timeZone ?? this.parts.timeZone ?? getTimeZone();
    const systemTimeZone = getSystemTimeZone();
    const hasTemporal = typeof Temporal !== 'undefined' && Temporal.ZonedDateTime;

    // Check if we need to warn about timezone usage without Temporal
    if (!hasTemporal && timeZoneToUse !== 'UTC' && timeZoneToUse !== systemTimeZone) {
      // eslint-disable-next-line no-console
      console.warn(
        'Warning: Converting to Date object with timezone other than UTC or system timezone without Temporal may have bugs around DST transitions. ' +
        'Consider using Temporal or providing timeZoneOffset for more accurate results.'
      );
    }

    // If user has Temporal, use it for accurate conversion
    if (hasTemporal) {
      try {
        const zonedDateTime = this.toZonedDateTime({ ...options, timeZone: timeZoneToUse });
        const instant = zonedDateTime.toInstant();
        // Get the base milliseconds from Temporal
        const baseMilliseconds = Number(instant.epochMilliseconds);

        // Get fractional milliseconds from the original nanosecond
        const fillParts = options ? omit(options, ['fill']) : {};
        const originalParts: DateTimeParts = { ...fillParts, ...this.parts };
        const fractionalMilliseconds = originalParts.nanosecond ? Math.floor(originalParts.nanosecond / 1_000_000) : 0;

        const date = new Date(baseMilliseconds);
        // Set the fractional milliseconds manually
        date.setUTCMilliseconds(fractionalMilliseconds);
        return date;
      } catch (error) {
        // Fall back to manual conversion if Temporal fails
        // eslint-disable-next-line no-console
        console.warn('Temporal conversion failed, falling back to manual conversion:', error);
      }
    }

    // Manual conversion without Temporal
    const fillParts = options ? omit(options, ['fill']) : {};
    let parts: DateTimeParts = { ...fillParts, ...this.parts };

    // Ensure we have required parts
    const requiredParts: Array<keyof DateTimeParts> = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    const hasRequiredParts = this.hasRequiredParts(parts, requiredParts);

    if (!hasRequiredParts) {
      if (!options?.fill) {
        throw new Error('Cannot create Date, insufficient data');
      }
      parts = this._fill(parts, options.fill, requiredParts);
    }

    // Handle different timezone scenarios
    if (timeZoneToUse === 'UTC') {
      // Create UTC date
      const year = parts.year!;
      const month = parts.month! - 1; // JavaScript months are 0-based
      const day = parts.day!;
      const hour = parts.hour!;
      const minute = parts.minute!;
      const second = parts.second!;
      const millisecond = parts.nanosecond ? Math.floor(parts.nanosecond / 1_000_000) : 0;


      return new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
    } else if (timeZoneToUse === systemTimeZone) {
      // Create date in system timezone
      const year = parts.year!;
      const month = parts.month! - 1; // JavaScript months are 0-based
      const day = parts.day!;
      const hour = parts.hour!;
      const minute = parts.minute!;
      const second = parts.second!;
      const millisecond = parts.nanosecond ? Math.floor(parts.nanosecond / 1_000_000) : 0;


      return new Date(year, month, day, hour, minute, second, millisecond);
    } else if (parts.timeZoneOffset) {
      // Use exact offset
      const year = parts.year!;
      const month = parts.month! - 1;
      const day = parts.day!;
      const hour = parts.hour!;
      const minute = parts.minute!;
      const second = parts.second!;
      const millisecond = parts.nanosecond ? Math.floor(parts.nanosecond / 1_000_000) : 0;

      // Parse offset (e.g., "-05:00" or "+02:30")
      const offsetMatch = parts.timeZoneOffset.match(/^([+-])(\d{2}):(\d{2})$/);
      if (!offsetMatch) {
        throw new Error(`Invalid timezone offset format: ${parts.timeZoneOffset}`);
      }

      const sign = offsetMatch[1] === '+' ? 1 : -1;
      const offsetHours = parseInt(offsetMatch[2], 10);
      const offsetMinutes = parseInt(offsetMatch[3], 10);
      const totalOffsetMinutes = sign * (offsetHours * 60 + offsetMinutes);

      // Create UTC date and adjust for offset
      const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
      return new Date(utcDate.getTime() - (totalOffsetMinutes * 60 * 1000));
    } else {
      // Try to estimate offset for the timezone (may be inaccurate around DST)
      const year = parts.year!;
      const month = parts.month! - 1;
      const day = parts.day!;
      const hour = parts.hour!;
      const minute = parts.minute!;
      const second = parts.second!;
      const millisecond = parts.nanosecond ? Math.floor(parts.nanosecond / 1_000_000) : 0;

      // Create a date in the target timezone by using Intl.DateTimeFormat
      const testDate = new Date(year, month, day, hour, minute, second, millisecond);
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: timeZoneToUse,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      // This is a rough approximation - may be incorrect around DST transitions
      const partsArray = formatter.formatToParts(testDate);
      const tzDate = new Date(
        parseInt(partsArray.find(p => p.type === 'year')!.value),
        parseInt(partsArray.find(p => p.type === 'month')!.value) - 1,
        parseInt(partsArray.find(p => p.type === 'day')!.value),
        parseInt(partsArray.find(p => p.type === 'hour')!.value),
        parseInt(partsArray.find(p => p.type === 'minute')!.value),
        parseInt(partsArray.find(p => p.type === 'second')!.value),
        millisecond
      );

      return tzDate;
    }
  }


}
