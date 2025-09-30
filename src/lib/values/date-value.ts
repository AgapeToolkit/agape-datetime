/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { hasValue, isNil, omit } from '@agape/util';
import { Class } from '@agape/types';
import { Temporal } from '@agape/temporal';
import { DateParts } from '../types/date-parts';
import { ResolvedDateTimeParts } from '../types/resolved-datetime-parts';
import { ParsedDateTimeParts } from '../types/parsed-datetime-parts';
import { validateNormalizedValue } from './util/validation';
import { ToPlainDateOptions } from '../types/to-plain-date-options';
import { ToPlainYearMonthOptions } from '../types/to-plain-year-month-options';
import { ToPlainMonthDayOptions } from '../types/to-plain-month-day-options';
import { BaseValue } from './base-value';
import { FillStrategy } from '../types/fill-strategy';
import { FillOptions } from '../types/fill-datetime-parts';
import { DateTimeValue } from './datetime-value';

export class DateValue extends BaseValue implements DateParts {

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

  getEra(): number | undefined {
    if (!isNil(this.parts.year)) return this.parts.year < 0 ? 0 : 1;
    if (!isNil(this.resolvedParts?.era)) return this.resolvedParts.era;
  }

  constructor(parts?: DateParts) {
    super();
    if (!parts) return;

    this._set(parts);
  }

  static from(input: Date | Temporal.PlainDate | Temporal.PlainYearMonth | Temporal.PlainMonthDay | Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | DateValue | DateTimeValue | DateParts | string): DateValue {
    if (input instanceof DateValue) {
      return new DateValue(input.toParts());
    }

    if (input instanceof DateTimeValue) {
      return new DateValue(input.toParts());
    }

    if (typeof input === 'string') {
      return DateValue.fromString(input);
    }

    if (input instanceof Date) {
      return DateValue.fromDate(input);
    }

    // Handle Temporal objects
    if (input instanceof Temporal.PlainDate) {
      return DateValue.fromPlainDate(input);
    }
    if (input instanceof Temporal.PlainYearMonth) {
      return DateValue.fromPlainYearMonth(input);
    }
    if (input instanceof Temporal.PlainMonthDay) {
      return DateValue.fromPlainMonthDay(input);
    }
    if (input instanceof Temporal.PlainDateTime) {
      return DateValue.fromPlainDateTime(input);
    }
    if (input instanceof Temporal.ZonedDateTime) {
      return DateValue.fromZonedDateTime(input);
    }
    if (input instanceof Temporal.Instant) {
      return DateValue.fromInstant(input);
    }

    // Handle DateParts object
    if (input && typeof input === 'object') {
      return new DateValue(input);
    }

    throw new Error(`Cannot create DateValue from input: ${input}`);
  }

  private static fromString(input: string): DateValue {
    const parts: DateParts = {};
    
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
    } else {
      throw new Error(`Cannot parse date string: ${input}`);
    }
    
    const dtv = new DateValue(parts);
    return dtv;
  }

  private static fromDate(date: Date): DateValue {
    const parts: DateParts = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1, // JavaScript months are 0-based
      day: date.getUTCDate()
    };
    const dtv = new DateValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainDate(plainDate: Temporal.PlainDate): DateValue {
    const parts: DateParts = {
      year: plainDate.year,
      month: plainDate.month,
      day: plainDate.day
    };
    const dtv = new DateValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainYearMonth(plainYearMonth: Temporal.PlainYearMonth): DateValue {
    const parts: DateParts = {
      year: plainYearMonth.year,
      month: plainYearMonth.month
    };
    const dtv = new DateValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainMonthDay(plainMonthDay: Temporal.PlainMonthDay): DateValue {
    // Convert monthCode to month number (e.g., "M01" -> 1)
    const monthCode = plainMonthDay.monthCode;
    const month = parseInt(monthCode.substring(1), 10);
    
    const parts: DateParts = {
      month: month,
      day: plainMonthDay.day
    };
    const dtv = new DateValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainDateTime(plainDateTime: Temporal.PlainDateTime): DateValue {
    const parts: DateParts = {
      year: plainDateTime.year,
      month: plainDateTime.month,
      day: plainDateTime.day
    };
    const dtv = new DateValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromZonedDateTime(zonedDateTime: Temporal.ZonedDateTime): DateValue {
    const parts: DateParts = {
      year: zonedDateTime.year,
      month: zonedDateTime.month,
      day: zonedDateTime.day
    };
    const dtv = new DateValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromInstant(instant: Temporal.Instant): DateValue {
    // Convert to UTC date
    const utcDateTime = instant.toZonedDateTimeISO('UTC');
    const parts: DateParts = {
      year: utcDateTime.year,
      month: utcDateTime.month,
      day: utcDateTime.day
    };
    const dtv = new DateValue();
    dtv.parts = parts;
    return dtv;
  }

  set(parts: DateParts) {
    const newInstance = new DateValue();
    newInstance._set({ ...this.parts, ...parts });
    return newInstance;
  }

  toParts(): DateParts {
    return { ...this.parts };
  }

  private hasRequiredParts(parts: DateParts, requiredParts: Array<keyof DateParts>): boolean {
    return requiredParts.every(part => hasValue(parts[part]));
  }

  private _fill(parts: DateParts, strategy: 'start' | 'end' | 'current', partsToFill: Array<keyof DateParts>): DateParts {
    const filled = { ...parts };
    
    if (strategy === 'start') {
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'year') filled.year = 1;
        else if (part === 'month') filled.month = 1;
        else if (part === 'day') filled.day = 1;
        else if (part === 'weekday') filled.weekday = 1;
      }
    } else if (strategy === 'end') {
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'year') filled.year = 9999;
        else if (part === 'month') filled.month = 12;
        else if (part === 'day') filled.day = 31;
        else if (part === 'weekday') filled.weekday = 7;
      }
    } else if (strategy === 'current') {
      const now = new Date();
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'year') filled.year = now.getUTCFullYear();
        else if (part === 'month') filled.month = now.getUTCMonth() + 1;
        else if (part === 'day') filled.day = now.getUTCDate();
        else if (part === 'weekday') filled.weekday = now.getUTCDay() + 1;
      }
    }

    return filled;
  }

  private inflate(target: Class<Temporal.PlainDate | Temporal.PlainYearMonth | Temporal.PlainMonthDay>, requiredParts: Array<keyof DateParts>, options?: ToPlainDateOptions | ToPlainYearMonthOptions | ToPlainMonthDayOptions): any {
    const fillParts = options ? omit(options, ['fill']) : {};
    let parts: DateParts = { ...fillParts, ...this.parts };
    
    const hasRequiredParts = this.hasRequiredParts(parts, requiredParts);
    if (!hasRequiredParts) {
      if (!options?.fill) {
        throw new Error(`Cannot create Temporal.${target.name}, insufficient data`);
      }
      parts = this._fill(parts, options.fill, requiredParts);
    }

    return (target as any).from(parts);
  }

  toPlainDate(options?: ToPlainDateOptions): Temporal.PlainDate {
    return this.inflate(Temporal.PlainDate, ['year', 'month', 'day'], options);
  }

  toPlainYearMonth(options?: ToPlainYearMonthOptions): Temporal.PlainYearMonth {
    return this.inflate(Temporal.PlainYearMonth, ['year', 'month'], options);
  }

  toPlainMonthDay(options?: ToPlainMonthDayOptions): Temporal.PlainMonthDay {
    return this.inflate(Temporal.PlainMonthDay, ['month', 'day'], options);
  }

  toDate(): Date {
    const parts = this.parts;
    
    // Ensure we have required parts
    const requiredParts: Array<keyof DateParts> = ['year', 'month', 'day'];
    const hasRequiredParts = this.hasRequiredParts(parts, requiredParts);

    if (!hasRequiredParts) {
      throw new Error('Cannot create Date, insufficient data');
    }

    // Create UTC date
    const year = parts.year!;
    const month = parts.month! - 1; // JavaScript months are 0-based
    const day = parts.day!;

    return new Date(Date.UTC(year, month, day));
  }

  private _set(parts: DateParts) {
    // Only assign known DateParts properties
    if (parts.year !== undefined) this.parts.year = parts.year;
    if (parts.month !== undefined) this.parts.month = parts.month;
    if (parts.day !== undefined) this.parts.day = parts.day;
    if (parts.weekday !== undefined) this.parts.weekday = parts.weekday;
  }

  fill(fillOptions: FillOptions) {
    const { strategy, ...explicitValues } = fillOptions;
    const parts = this.toParts();

    // First apply explicit values
    const partsWithExplicit = { ...parts, ...explicitValues };

    // Then use strategy to fill remaining missing values
    const filledParts = this._fill(partsWithExplicit, strategy, ['year', 'month', 'day', 'weekday']);

    return new DateValue(filledParts);
  }
}
