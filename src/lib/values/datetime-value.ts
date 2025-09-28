import { isNil } from '@agape/util';
import { ResolvedDateTimeParts } from '../pattern/types/resolved-datetime-parts';
import { ParsedDateTimeParts } from '../pattern/types/parsed-datetime-parts';
import { DateTimeParts } from '../pattern/types/datetime-parts';
import { resolveDateTimeParts } from './util/resolve';
import { normalizeDateTimeParts } from './util/normalize';
import { PopulatedDateTimePatternOptions } from '../pattern/types/populated-datetime-pattern-options';
import { validateNormalizedValue } from './util/validation';

// Make all DateTimeParts properties enumerable on this instance
const enumerableProps: (keyof DateTimeParts)[] = ['year', 'month', 'day', 'hour',
  'minute', 'second', 'fractionalSecond', 'timeZone', 'timeZoneOffset',
  'secondsTimestamp', 'millisecondsTimestamp', 'nanosecondsTimestamp'];

export class DateTimeValue implements DateTimeParts {

  private parts: DateTimeParts = {};
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
    for (const key of enumerableProps) {
      const descriptor = Object.getOwnPropertyDescriptor(DateTimeValue.prototype, key);
      if (descriptor?.get) {
        Object.defineProperty(this, key, {
          ...descriptor,
          enumerable: true
        });
      }
    }

    // Ensure private properties are non-enumerable
    Object.defineProperty(this, 'parts', {
      value: {},
      writable: true,
      configurable: true,
      enumerable: false,
    });

    Object.defineProperty(this, 'resolvedParts', {
      value: undefined,
      writable: true,
      configurable: true,
      enumerable: false,
    });

    Object.defineProperty(this, 'parsedParts', {
      value: undefined,
      writable: true,
      configurable: true,
      enumerable: false,
    });

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

  static fromParsed(options: PopulatedDateTimePatternOptions, parsedParts: ParsedDateTimeParts): DateTimeValue {
    const resolvedParts: ResolvedDateTimeParts = resolveDateTimeParts(parsedParts, options);
    const normalizedParts: DateTimeParts = normalizeDateTimeParts(resolvedParts, options);
    const dtv = new DateTimeValue();
    dtv.parts = normalizedParts;
    dtv.resolvedParts = resolvedParts;
    dtv.parsedParts = parsedParts;
    return dtv;
  }
}