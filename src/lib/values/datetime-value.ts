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
import { FillDateTimeParts } from '../types/fill-datetime-parts';
import { FillStrategy } from '../types/fill-strategy';

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


const DEFAULT_PARTS_TO_FILL: Array<keyof DateTimeParts> = ['year', 'month', 'day', 'hour', 'minute', 'second', 'fractionalSecond']




export class DateTimeValue implements DateTimeParts {

  private readonly parts: DateTimeParts = {};
  private resolvedParts?: ResolvedDateTimeParts;
  private parsedParts?: ParsedDateTimeParts;

  get year(): number | undefined {
    return this.parts.year;
  }

  get month(): number | undefined {
    return this.parts.month;
  }

  get day(): number | undefined {
    return this.parts.day;
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

  get fractionalSecond(): number | undefined {
    return this.parts.fractionalSecond;
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

  constructor(parts?: DateTimeParts | DateTimeValue) {
    if (!parts) return;

    if (parts instanceof DateTimeValue) {
      this.parts = parts.parts;
      this.resolvedParts = parts.resolvedParts;
      this.parsedParts = parts.parsedParts;
      return;
    }

    this.set(parts);
  }

  set(parts: DateTimeParts) {
    validateNormalizedValue({...this.parts, ...parts});
    Object.assign(this.parts, parts);
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
          case 'fractionalSecond':
            filled.second = 0;
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
          case 'fractionalSecond':
            filled.second = .999999999;
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

    // Convert fractional seconds to nanoseconds for Temporal (but keep original fractionalSecond)
    const temporalParts = { ...parts };
    if (temporalParts.fractionalSecond !== undefined) {
      const nanoseconds = Math.round(temporalParts.fractionalSecond * 1_000_000_000);
      temporalParts.nanosecond = nanoseconds;
      delete temporalParts.fractionalSecond;
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
        
        // Get fractional milliseconds from the original fractionalSecond
        const fillParts = options ? omit(options, ['fill']) : {};
        const originalParts: DateTimeParts = { ...fillParts, ...this.parts };
        const fractionalMilliseconds = originalParts.fractionalSecond ? Math.round(originalParts.fractionalSecond * 1000) : 0;
        
        const date = new Date(baseMilliseconds);
        // Set the fractional milliseconds manually
        date.setUTCMilliseconds(fractionalMilliseconds);
        return date;
      } catch (error) {
        // Fall back to manual conversion if Temporal fails
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
      const millisecond = parts.fractionalSecond ? Math.round(parts.fractionalSecond * 1000) : 0;
      
      
      return new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
    } else if (timeZoneToUse === systemTimeZone) {
      // Create date in system timezone
      const year = parts.year!;
      const month = parts.month! - 1; // JavaScript months are 0-based
      const day = parts.day!;
      const hour = parts.hour!;
      const minute = parts.minute!;
      const second = parts.second!;
      const millisecond = parts.fractionalSecond ? Math.round(parts.fractionalSecond * 1000) : 0;
      
      
      return new Date(year, month, day, hour, minute, second, millisecond);
    } else if (parts.timeZoneOffset) {
      // Use exact offset
      const year = parts.year!;
      const month = parts.month! - 1;
      const day = parts.day!;
      const hour = parts.hour!;
      const minute = parts.minute!;
      const second = parts.second!;
      const millisecond = parts.fractionalSecond ? Math.round(parts.fractionalSecond * 1000) : 0;
      
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
      const millisecond = parts.fractionalSecond ? Math.round(parts.fractionalSecond * 1000) : 0;
      
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
