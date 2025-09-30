/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { hasValue, isNil, omit } from '@agape/util';
import { Class } from '@agape/types';
import { Temporal } from '@agape/temporal';
import { TimeParts } from '../types/time-parts';
import { ResolvedDateTimeParts } from '../types/resolved-datetime-parts';
import { ParsedDateTimeParts } from '../types/parsed-datetime-parts';
import { validateNormalizedValue } from './util/validation';
import { ToPlainTimeOptions } from '../types/to-plain-time-options';
import { BaseValue } from './base-value';
import { FillStrategy } from '../types/fill-strategy';
import { FillOptions } from '../types/fill-datetime-parts';
import { DateTimeValue } from './datetime-value';

export class TimeValue extends BaseValue implements TimeParts {

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

  getDayPeriod(): number | undefined {
    if (!isNil(this.parts.hour)) return this.parts.hour < 12 ? 0 : 1;
    if (!isNil(this.resolvedParts?.dayPeriod)) return this.resolvedParts.dayPeriod;
  }

  constructor(parts?: TimeParts) {
    super();
    if (!parts) return;

    this._set(parts);
  }

  static from(input: Date | Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.Instant | TimeValue | DateTimeValue | TimeParts | string): TimeValue {
    if (input instanceof TimeValue) {
      return new TimeValue(input.toParts());
    }

    if (input instanceof DateTimeValue) {
      return new TimeValue(input.toParts());
    }

    if (typeof input === 'string') {
      return TimeValue.fromString(input);
    }

    if (input instanceof Date) {
      return TimeValue.fromDate(input);
    }

    // Handle Temporal objects
    if (input instanceof Temporal.PlainTime) {
      return TimeValue.fromPlainTime(input);
    }
    if (input instanceof Temporal.PlainDateTime) {
      return TimeValue.fromPlainDateTime(input);
    }
    if (input instanceof Temporal.ZonedDateTime) {
      return TimeValue.fromZonedDateTime(input);
    }
    if (input instanceof Temporal.Instant) {
      return TimeValue.fromInstant(input);
    }

    // Handle TimeParts object
    if (input && typeof input === 'object') {
      return new TimeValue(input);
    }

    throw new Error(`Cannot create TimeValue from input: ${input}`);
  }

  private static fromString(input: string): TimeValue {
    const parts: TimeParts = {};
    
    // Remove whitespace
    const trimmed = input.trim();
    
    // Handle various time patterns
    if (/^\d{1,2}:\d{1,2}$/.test(trimmed)) {
      // Hour:minute: 12:30, 1:5
      const [hour, minute] = trimmed.split(':').map(n => parseInt(n, 10));
      parts.hour = hour;
      parts.minute = minute;
    } else if (/^\d{1,2}:\d{1,2}:\d{1,2}$/.test(trimmed)) {
      // Hour:minute:second: 12:30:45, 1:5:6
      const [hour, minute, second] = trimmed.split(':').map(n => parseInt(n, 10));
      parts.hour = hour;
      parts.minute = minute;
      parts.second = second;
    } else if (/^\d{1,2}:\d{1,2}:\d{1,2}\.\d+$/.test(trimmed)) {
      // Hour:minute:second.fractional: 12:30:45.123, 1:5:6.7
      const [timePart, fractionalPart] = trimmed.split('.');
      const [hour, minute, second] = timePart.split(':').map(n => parseInt(n, 10));
      parts.hour = hour;
      parts.minute = minute;
      parts.second = second;
      // Convert fractional part to nanoseconds (pad to 9 digits, then truncate)
      const paddedFractional = fractionalPart.padEnd(9, '0').substring(0, 9);
      parts.nanosecond = parseInt(paddedFractional, 10);
    } else {
      throw new Error(`Cannot parse time string: ${input}`);
    }
    
    return new TimeValue(parts);
  }

  private static fromDate(date: Date): TimeValue {
    const parts: TimeParts = {
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
      nanosecond: date.getUTCMilliseconds() * 1_000_000 // Convert milliseconds to nanoseconds
    };
    const dtv = new TimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainTime(plainTime: Temporal.PlainTime): TimeValue {
    const parts: TimeParts = {
      hour: plainTime.hour,
      minute: plainTime.minute,
      second: plainTime.second,
      nanosecond: plainTime.nanosecond
    };
    const dtv = new TimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainDateTime(plainDateTime: Temporal.PlainDateTime): TimeValue {
    const parts: TimeParts = {
      hour: plainDateTime.hour,
      minute: plainDateTime.minute,
      second: plainDateTime.second,
      nanosecond: plainDateTime.nanosecond
    };
    const dtv = new TimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromZonedDateTime(zonedDateTime: Temporal.ZonedDateTime): TimeValue {
    const parts: TimeParts = {
      hour: zonedDateTime.hour,
      minute: zonedDateTime.minute,
      second: zonedDateTime.second,
      nanosecond: zonedDateTime.nanosecond
    };
    const dtv = new TimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromInstant(instant: Temporal.Instant): TimeValue {
    // Convert to UTC time
    const utcDateTime = instant.toZonedDateTimeISO('UTC');
    const parts: TimeParts = {
      hour: utcDateTime.hour,
      minute: utcDateTime.minute,
      second: utcDateTime.second,
      nanosecond: utcDateTime.nanosecond
    };
    const dtv = new TimeValue();
    dtv.parts = parts;
    return dtv;
  }

  set(parts: TimeParts) {
    const newInstance = new TimeValue();
    newInstance._set({ ...this.parts, ...parts });
    return newInstance;
  }

  toParts(): TimeParts {
    return { ...this.parts };
  }

  private hasRequiredParts(parts: TimeParts, requiredParts: Array<keyof TimeParts>): boolean {
    return requiredParts.every(part => hasValue(parts[part]));
  }

  private _fill(parts: TimeParts, strategy: 'start' | 'end' | 'current', partsToFill: Array<keyof TimeParts>): TimeParts {
    const filled = { ...parts };
    
    if (strategy === 'start') {
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'hour') filled.hour = 0;
        else if (part === 'minute') filled.minute = 0;
        else if (part === 'second') filled.second = 0;
        else if (part === 'nanosecond') filled.nanosecond = 0;
      }
    } else if (strategy === 'end') {
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'hour') filled.hour = 23;
        else if (part === 'minute') filled.minute = 59;
        else if (part === 'second') filled.second = 59;
        else if (part === 'nanosecond') filled.nanosecond = 999999999;
      }
    } else if (strategy === 'current') {
      const now = new Date();
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'hour') filled.hour = now.getUTCHours();
        else if (part === 'minute') filled.minute = now.getUTCMinutes();
        else if (part === 'second') filled.second = now.getUTCSeconds();
        else if (part === 'nanosecond') filled.nanosecond = now.getUTCMilliseconds() * 1_000_000;
      }
    }

    return filled;
  }

  private inflate(target: Class<Temporal.PlainTime>, requiredParts: Array<keyof TimeParts>, options?: ToPlainTimeOptions): any {
    const fillParts = options ? omit(options, ['fill']) : {};
    let parts: TimeParts = { ...fillParts, ...this.parts };
    
    const hasRequiredParts = this.hasRequiredParts(parts, requiredParts);
    if (!hasRequiredParts) {
      if (!options?.fill) {
        throw new Error(`Cannot create Temporal.${target.name}, insufficient data`);
      }
      parts = this._fill(parts, options.fill, requiredParts);
    }

    // Direct mapping to Temporal (nanosecond property maps to nanosecond)
    const temporalParts: any = { ...parts };
    if (temporalParts.nanosecond !== undefined) {
      temporalParts.nanosecond = temporalParts.nanosecond;
    }

    return (target as any).from(temporalParts);
  }

  toPlainTime(options?: ToPlainTimeOptions): Temporal.PlainTime {
    return this.inflate(Temporal.PlainTime, ['hour', 'minute', 'second'], options);
  }

  toDate(): Date {
    const parts = this.parts;
    
    // Ensure we have required parts
    const requiredParts: Array<keyof TimeParts> = ['hour', 'minute', 'second'];
    const hasRequiredParts = this.hasRequiredParts(parts, requiredParts);

    if (!hasRequiredParts) {
      throw new Error('Cannot create Date, insufficient data');
    }

    // Create UTC date with time components
    const hour = parts.hour!;
    const minute = parts.minute!;
    const second = parts.second!;
    const millisecond = parts.nanosecond ? Math.floor(parts.nanosecond / 1_000_000) : 0;

    return new Date(Date.UTC(1970, 0, 1, hour, minute, second, millisecond));
  }

  private _set(parts: TimeParts) {
    // Only assign known TimeParts properties
    if (parts.hour !== undefined) this.parts.hour = parts.hour;
    if (parts.minute !== undefined) this.parts.minute = parts.minute;
    if (parts.second !== undefined) this.parts.second = parts.second;
    if (parts.nanosecond !== undefined) this.parts.nanosecond = parts.nanosecond;
  }

  fill(fillOptions: FillOptions) {
    const { strategy, ...explicitValues } = fillOptions;
    const parts = this.toParts();

    // First apply explicit values
    const partsWithExplicit = { ...parts, ...explicitValues };

    // Then use strategy to fill remaining missing values
    const filledParts = this._fill(partsWithExplicit, strategy, ['hour', 'minute', 'second', 'nanosecond']);

    return new TimeValue(filledParts);
  }
}
