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
import { legacyDateToDateParts } from './util/legacy-date-to-date-parts';
import { getTimeZone } from '@agape/locale';
import { Class } from '@agape/types';


const DEFAULT_PARTS_TO_FILL: Array<keyof DateTimeParts> = ['year', 'month', 'day', 'hour', 'minute', 'second', 'fractionalSecond']

interface DateTimeObjectInflationDefinition {
  name: string;
  requiredParts: Array<keyof DateTimeParts>;
  inflate: (parts: DateTimeParts) => any;
}

const DATETIME_OBJECT_INFLATION_DEFINITION_MAP = new Map<Class, DateTimeObjectInflationDefinition>([
  [Temporal.PlainDate, {
    name: 'Temporal.PlainDate',
    requiredParts: ['year', 'month', 'day'],
    inflate: (parts: DateTimeParts) => {
      return Temporal.PlainDate.from(parts);
    }
  }]
]);



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
  
  toPlainDate(fill?: FillDateTimeParts): Temporal.PlainDate {
    return this.inflate(Temporal.PlainDate, fill);
  }

  private inflate(target: Class, fill?: FillDateTimeParts): any {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const definition = DATETIME_OBJECT_INFLATION_DEFINITION_MAP.get(target)!;

    const fillParts = fill ? omit(fill, ['fill']) : {};

    let parts: DateTimeParts = { ...fillParts, ...this.parts }

    const hasRequiredParts = this.hasRequiredParts(parts, definition.requiredParts);

    if (!hasRequiredParts) {
      if (!fill?.fill) {
        throw new Error(`Cannot create ${definition.name}, insufficient data`);
      }

      parts = this._fill(parts, fill.fill, definition.requiredParts);
    }

    return definition.inflate(parts);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filled[part] = now[part] as any;
      }
    }
  }

  toPlainDateTime() {

  }

  toInstant() {

  }

  toZonedDateTime() {

  }


}
