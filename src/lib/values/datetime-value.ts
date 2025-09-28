import { isNil } from '@agape/util';
import { ResolvedDateTimeParts } from '../pattern/types/resolved-datetime-parts';
import { ParsedDateTimeParts } from '../pattern/types/parsed-datetime-parts';
import { DateTimeParts } from '../pattern/types/datetime-parts';
import { resolveDateTimeParts } from './util/resolve';
import { normalizeDateTimeParts } from './util/normalize';
import { PopulatedDateTimePatternOptions } from '../pattern/types/populated-datetime-pattern-options';
import { validateNormalizedValue } from './util/validation';

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
    if (!parts) return;

    if (parts instanceof DateTimeValue) {
      Object.defineProperty(this, 'parts', {
        value: parts.parts,
        writable: true,
        configurable: true,
        enumerable: false,
      });
      Object.defineProperty(this, 'resolvedParts', {
        value: parts.resolvedParts,
        writable: true,
        configurable: true,
        enumerable: false,
      });
      Object.defineProperty(this, 'parsedParts', {
        value: parts.parsedParts,
        writable: true,
        configurable: true,
        enumerable: false,
      });
      return;
    }

    Object.defineProperty(this, 'parts', {
      value: {},
      writable: true,
      configurable: true,
      enumerable: false,
    });
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
    dtv.parts = normalizedParts
    Object.defineProperty(dtv, 'resolvedParts', {
      value: resolvedParts,
      writable: true,
      configurable: true,
      enumerable: false,
    });
    Object.defineProperty(dtv, 'parsedParts', {
      value: parsedParts,
      writable: true,
      configurable: true,
      enumerable: false,
    });
    return dtv;
  }
}

const enumerableProps: (keyof DateTimeValue)[] = ['year', 'month', 'day', 'hour',
  'minute', 'second', 'fractionalSecond', 'timeZone', 'timeZoneOffset',
  'secondsTimestamp', 'millisecondsTimestamp', 'nanosecondsTimestamp'];

for (const key of enumerableProps) {
  const descriptor = Object.getOwnPropertyDescriptor(DateTimeValue.prototype, key);
  if (descriptor?.get) {
    Object.defineProperty(DateTimeValue.prototype, key, {
      ...descriptor,
      enumerable: true
    });
  }
}
