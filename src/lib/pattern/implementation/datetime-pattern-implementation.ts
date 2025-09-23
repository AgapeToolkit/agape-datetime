import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';
import { DateTimeParts } from '../types/datetime-parts';
import { DateTimePatternOptions } from '../types/datetime-pattern-options';
import { ElasticNumberUnicodeDateTimeToken } from '../tokens/unicode/elastic-number-unicode-datetime-token';
import { LiteralDateTimeToken } from '../tokens/literal-datetime-token';
import { DateTimePatternMatchError } from '../errors/datetime-pattern-match-error';
import { ParsedDateTimeParts } from '../types/parsed-datetime-parts';
import { ResolvedDateTimeParts } from '../types/resolved-datetime-parts';
import { UnicodeDateTimeToken } from '../tokens/unicode/unicode-datetime-token';
import { unicodeDateTimeTokenDefinitions } from '../token-definitions/unicode-datetime-token-definitions';
import { datetimeTokenResolveOrder } from '../token-definitions/datetime-token-resolve-order';
import { getLocale } from '@agape/locale';
import { DateTimeValue } from '../types/datetime-value';
import { isValidDayOfMonth, isValidOffset, isValidTimeZone, isYearInRange } from './util/validation';
import { InvalidDayOfMonth } from '../errors/invalid-day-of-month';
import { isoWeekdayToLocalWeekday, isValidDayOfWeek, localWeekdayToIsoWeekday } from './util/weekday';
import { getCaptureGroup } from './util/regex';
import { VerboseWeekdayUnicodeDateTimeToken } from '../tokens/unicode/verbose-weekday-unicode-datetime-token';
import { Case, WeekdayNames } from '../../names';
import { DateOutOfRangeError } from '../errors/date-out-of-range-error';
import { InvalidWeekdayError } from '../errors/invalid-weekday';
import { InvalidTimeZoneError } from '../errors/invalid-timezone-error';
import { hasTemporal } from '@agape/temporal';
import { InvalidTimeZoneOffsetError } from '../errors/invalid-timezone-offset-error';
import { DateTimePatternImplementationOptions } from '../types/datetime-pattern-implementation-options';

let skippedValidationCount = 0;

export class DateTimePatternImplementation {

  regex?: RegExp;

  constructor(public readonly parts: DestructuredDateTimePatternPart[], private options: DateTimePatternImplementationOptions) {

  }

  parse(value: string): DateTimeValue {
    const parsedDateTimeParts: ParsedDateTimeParts = this.parseValue(value);
    const resolvedDateTimeParts: ResolvedDateTimeParts = this.resolveDateTimeParts(parsedDateTimeParts);
    const normalizedDateTimeParts: ResolvedDateTimeParts = this.normalizeDateTimeParts(resolvedDateTimeParts, this.options);

    console.log("Normalized Parts", normalizedDateTimeParts);

    this.validateNormalizedValue(normalizedDateTimeParts);

    const datetime = Object.create(DateTimeValue.prototype)
    Object.assign(datetime, {
      normalized: normalizedDateTimeParts,
      resolved: resolvedDateTimeParts,
      parsed: parsedDateTimeParts,
      options: this.options,
    });

    return datetime;
  }

  private parseValue(value: string): ParsedDateTimeParts {
    this.regex ??= this.getRegex();
    console.log(this.regex);

    const match = value.match(this.regex);
    if (!match) throw new DateTimePatternMatchError();
    return match.groups as unknown as ParsedDateTimeParts;
  }

  private resolveDateTimeParts(parsedDateTimeParts: ParsedDateTimeParts) {
    const resolvedDateTimeParts: ResolvedDateTimeParts = {};

    const entries = Object.entries(parsedDateTimeParts).sort(
      (a, b) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return (datetimeTokenResolveOrder[a[0]] ?? 12) - (datetimeTokenResolveOrder[b[0]] ?? 12);
      }
    )

    for (const [group, value] of entries) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const token: UnicodeDateTimeToken = (unicodeDateTimeTokenDefinitions as Record<string,UnicodeDateTimeToken>)[group]!;
      const tokenDateParts = token.resolve(value, this.options, resolvedDateTimeParts);
      Object.assign(resolvedDateTimeParts, tokenDateParts);
    }

    return resolvedDateTimeParts;
  }

  private normalizeDateTimeParts(resolvedDateTimeParts: ResolvedDateTimeParts, options: DateTimePatternImplementationOptions): DateTimeParts {
    const incoming: any = { ...resolvedDateTimeParts };
    const normalizedParts: DateTimeParts = {};

    if ('calendarYear' in resolvedDateTimeParts && !('year' in resolvedDateTimeParts)) {
      const era = resolvedDateTimeParts.era ?? 1;
      if (era) normalizedParts.year = resolvedDateTimeParts.calendarYear;
      else normalizedParts.year = ( (resolvedDateTimeParts.calendarYear as number) - 1) * -1;
    }
    delete incoming['calendarYear'];
    delete incoming['era'];

    if ('twelveHour' in resolvedDateTimeParts && !('hour' in resolvedDateTimeParts)) {
      const dayPeriod = resolvedDateTimeParts.dayPeriod ?? 0;
      normalizedParts.hour = dayPeriod ? (resolvedDateTimeParts.twelveHour as number) + 12 : resolvedDateTimeParts.twelveHour;
    }
    delete incoming['twelveHour'];
    delete incoming['dayPeriod'];

    if('weekdayLocal' in resolvedDateTimeParts && !('weekday' in resolvedDateTimeParts)) {
      normalizedParts.weekday =  localWeekdayToIsoWeekday((resolvedDateTimeParts.weekdayLocal as number), options.locale)
      delete incoming['weekdayLocal'];
    }

    delete incoming['timezoneNameShort'];
    delete incoming['timezoneNameLong'];

    return { ...incoming, ...normalizedParts };
  }

  private validateNormalizedValue(parts: DateTimeParts) {

    if(!isValidDayOfMonth(parts)) {
      throw new InvalidDayOfMonth();
    }

    const outOfRange = !isYearInRange(parts);
    if(this.options.limitRange && outOfRange) {
      throw new DateOutOfRangeError();
    }

    if (parts.weekday) {
      const { valid, correctDayOfWeek = 1 } = isValidDayOfWeek(parts);

      if (!valid) {
        const verboseWeekdayTokens = this.parts.filter(part => part.token instanceof VerboseWeekdayUnicodeDateTimeToken) as Array<{ token: VerboseWeekdayUnicodeDateTimeToken}>;
        if (verboseWeekdayTokens.length) {
          const token = verboseWeekdayTokens[verboseWeekdayTokens.length - 1];
          const variation = token.token.variation;

          const caseValue: Case = this.options.case === 'insensitive' ? 'lowercase' : this.options.case;
          const weekdayNames = WeekdayNames.get({ locale: this.options?.locale, case: caseValue });
          throw new InvalidWeekdayError(`Invalid weekday, should be ${(weekdayNames as any)[variation][correctDayOfWeek - 1]}`);
        }

        const numericWeekdayTokens = this.parts.filter(part => part.token.id === 'weekday' || part.token.id === 'weekdayPadded');
        if (numericWeekdayTokens.length) {
          const token = numericWeekdayTokens[numericWeekdayTokens.length - 1];
          const value = token.token.id === 'weekdayPadded' ? String(correctDayOfWeek).padStart(2, '0') : `${correctDayOfWeek}`;
          throw new InvalidWeekdayError(`Invalid weekday, should be ${value}`);
        }

        const numericLocalWeekdayTokens = this.parts.filter(part => part.token.id === 'weekdayLocal' || part.token.id === 'weekdayLocalPadded');
        if (numericLocalWeekdayTokens.length) {
          const token = numericLocalWeekdayTokens[numericLocalWeekdayTokens.length - 1];
          const localWeekday = isoWeekdayToLocalWeekday(correctDayOfWeek, this.options.locale);
          const value = token.token.id === 'weekdayLocalPadded' ? String(localWeekday).padStart(2, '0') : `${localWeekday}`;
          throw new InvalidWeekdayError(`Invalid weekday, should be ${value}`);
        }
      }
    }

    if (parts.timeZoneId) {
      if (!isValidTimeZone(parts.timeZoneId)) {
        throw new InvalidTimeZoneError();
      }

      if (!hasTemporal()) {
        skippedValidationCount++;

        if (skippedValidationCount === 1) {
          // eslint-disable-next-line no-console
          console.warn(
            `Cannot validate time zone offsets because Temporal is not available.\n` +
            `This occurred while checking if offset ${parts.timeZoneOffset} is valid for time zone ${parts.timeZoneId}.\n` +
            `Install a Temporal polyfill to enable full time zone functionality.`
          );
        } else if (skippedValidationCount % 5 === 0) {
          // eslint-disable-next-line no-console
          console.warn(
            `Validation of time zone offsets has been skipped ${skippedValidationCount} times because Temporal is not available.\n` +
            `Install a Temporal polyfill to enable this functionality.`
          );
        }
      }
      else {
        if(!isValidOffset(parts)) {
          throw new InvalidTimeZoneOffsetError()
        }
      }
    }
  }

  private getRegex() {
    let regex = '';
    for (const part of this.parts) {
      if (part.token instanceof ElasticNumberUnicodeDateTimeToken) {

        regex += getCaptureGroup(part.token.id, part.token.getRegex(this.options, part.length));
      }
      else if (part.token instanceof LiteralDateTimeToken) {
        regex += part.token.getRegex(this.options);
      }
      else {
        regex += getCaptureGroup(part.token.id, part.token.getRegex(this.options));
      }
    }

    const regexOptions = this.options?.case === 'insensitive' ? 'iu' : 'u';

    return new RegExp('^' + regex + '$', regexOptions);
  }

}
