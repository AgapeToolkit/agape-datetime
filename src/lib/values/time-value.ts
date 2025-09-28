/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { hasValue, isNil, omit } from '@agape/util';
import { Class } from '@agape/types';
import { Temporal } from '@agape/temporal';
import { TimeParts } from '../types/time-parts';
import { ResolvedDateTimeParts } from '../types/resolved-datetime-parts';
import { ParsedDateTimeParts } from '../types/parsed-datetime-parts';
import { validateNormalizedValue } from './util/validation';
import { ToPlainTimeOptions } from '../types/to-plain-time-options';

export class TimeValue implements TimeParts {

  private parts: TimeParts = {};
  private resolvedParts?: ResolvedDateTimeParts;
  private parsedParts?: ParsedDateTimeParts;

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

  getDayPeriod(): number | undefined {
    if (!isNil(this.parts.hour)) return this.parts.hour < 12 ? 0 : 1;
    if (!isNil(this.resolvedParts?.dayPeriod)) return this.resolvedParts.dayPeriod;
  }

  constructor(parts?: TimeParts | TimeValue) {
    if (!parts) return;

    if (parts instanceof TimeValue) {
      this.parts = parts.parts;
      this.resolvedParts = parts.resolvedParts;
      this.parsedParts = parts.parsedParts;
      return;
    }

    this.set(parts);
  }

  static from(input: any): TimeValue {
    if (input instanceof TimeValue) {
      return new TimeValue(input);
    }

    if (typeof input === 'string') {
      return TimeValue.fromString(input);
    }

    if (input instanceof Date) {
      return TimeValue.fromDate(input);
    }

    // Handle Temporal objects
    if (typeof Temporal !== 'undefined') {
      if (input instanceof Temporal.PlainTime) {
        return TimeValue.fromPlainTime(input);
      }
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
      parts.fractionalSecond = parseFloat('0.' + fractionalPart);
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
      fractionalSecond: date.getUTCMilliseconds() / 1000
    };
    const dtv = new TimeValue();
    dtv.parts = parts;
    return dtv;
  }

  private static fromPlainTime(plainTime: Temporal.PlainTime): TimeValue {
    // Convert nanoseconds to fractional seconds (up to 9 decimal places)
    const fractionalSecond = plainTime.nanosecond / 1_000_000_000;
    const truncatedFractionalSecond = Math.floor(fractionalSecond * 1_000_000_000) / 1_000_000_000;
    
    const parts: TimeParts = {
      hour: plainTime.hour,
      minute: plainTime.minute,
      second: plainTime.second,
      fractionalSecond: truncatedFractionalSecond
    };
    const dtv = new TimeValue();
    dtv.parts = parts;
    return dtv;
  }

  set(parts: TimeParts) {
    validateNormalizedValue({...this.parts, ...parts});
    Object.assign(this.parts, parts);
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
        else if (part === 'fractionalSecond') filled.fractionalSecond = 0;
      }
    } else if (strategy === 'end') {
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'hour') filled.hour = 23;
        else if (part === 'minute') filled.minute = 59;
        else if (part === 'second') filled.second = 59;
        else if (part === 'fractionalSecond') filled.fractionalSecond = 0.999999999;
      }
    } else if (strategy === 'current') {
      const now = new Date();
      for (const part of partsToFill) {
        if (hasValue(filled[part])) continue;
        if (part === 'hour') filled.hour = now.getUTCHours();
        else if (part === 'minute') filled.minute = now.getUTCMinutes();
        else if (part === 'second') filled.second = now.getUTCSeconds();
        else if (part === 'fractionalSecond') filled.fractionalSecond = now.getUTCMilliseconds() / 1000;
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

    // Convert fractional seconds to nanoseconds for Temporal
    const temporalParts: any = { ...parts };
    if (temporalParts.fractionalSecond !== undefined) {
      // Truncate to 9 decimal places and convert to nanoseconds
      const truncatedFractional = Math.floor(temporalParts.fractionalSecond * 1_000_000_000) / 1_000_000_000;
      temporalParts.nanosecond = Math.round(truncatedFractional * 1_000_000_000);
      delete temporalParts.fractionalSecond;
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
    const millisecond = parts.fractionalSecond ? Math.round(parts.fractionalSecond * 1000) : 0;

    return new Date(Date.UTC(1970, 0, 1, hour, minute, second, millisecond));
  }
}
