import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';
import { DateTimeParts } from '../../types/datetime-parts';
import { DateTimePatternOptions } from '../types/datetime-pattern-options';
import { ElasticNumberUnicodeDateTimeToken } from '../tokens/unicode/elastic-number-unicode-datetime-token';
import { LiteralDateTimeToken } from '../tokens/literal-datetime-token';
import { DateTimePatternMatchError } from '../errors/datetime-pattern-match-error';
import { ParsedDateTimeParts } from '../../types/parsed-datetime-parts';
import { ResolvedDateTimeParts } from '../../types/resolved-datetime-parts';
import { UnicodeDateTimeToken } from '../tokens/unicode/unicode-datetime-token';
import { unicodeDateTimeTokenDefinitions } from '../token-definitions/unicode-datetime-token-definitions';
import { datetimeTokenResolveOrder } from '../token-definitions/datetime-token-resolve-order';
import { getLocale } from '@agape/locale';
import { DateTimeValue } from '../../values/datetime-value';
import { isValidDayOfMonth, isValidOffset, isValidTimeZone, isYearInRange } from '../util/validation';
import { InvalidDayOfMonth } from '../errors/invalid-day-of-month';
import { isoWeekdayToLocalWeekday, isValidDayOfWeek, localWeekdayToIsoWeekday } from '../util/weekday';
import { getCaptureGroup } from '../util/regex';
import { VerboseWeekdayUnicodeDateTimeToken } from '../tokens/unicode/verbose-weekday-unicode-datetime-token';
import { Case, WeekdayNames } from '../../names';
import { DateOutOfRangeError } from '../errors/date-out-of-range-error';
import { InvalidWeekdayError } from '../errors/invalid-weekday';
import { InvalidTimeZoneError } from '../errors/invalid-timezone-error';
import { hasTemporal } from '@agape/temporal';
import { InvalidTimeZoneOffsetError } from '../errors/invalid-timezone-offset-error';
import { PopulatedDateTimePatternOptions } from '../types/populated-datetime-pattern-options';

let skippedValidationCount = 0;

export class DateTimePatternImplementation {

  regex?: RegExp;

  constructor(public readonly parts: DestructuredDateTimePatternPart[], private options: PopulatedDateTimePatternOptions) {

  }

  parse(value: string): DateTimeValue {
    const parsedDateTimeParts: ParsedDateTimeParts = this.parseValue(value);
    const datetime: DateTimeValue = DateTimeValue.fromParsed(this.options, parsedDateTimeParts)

    const outOfRange = !isYearInRange(datetime);
    if(this.options.limitRange && outOfRange) {
      throw new DateOutOfRangeError();
    }

    // const resolvedDateTimeParts: ResolvedDateTimeParts = this.resolveDateTimeParts(parsedDateTimeParts);
    // const normalizedDateTimeParts: DateTimeParts = this.normalizeDateTimeParts(resolvedDateTimeParts, this.options);
    //
    // console.log("Normalized Parts", normalizedDateTimeParts);
    //
    // this.validateNormalizedValue(normalizedDateTimeParts);

    // const datetime = Object.create(DateTimeValue.prototype)
    // Object.assign(datetime, {
    //   normalized: normalizedDateTimeParts,
    //   resolved: resolvedDateTimeParts,
    //   parsed: parsedDateTimeParts,
    //   options: this.options,
    // });

    return datetime;
  }

  private parseValue(value: string): ParsedDateTimeParts {
    this.regex ??= this.getRegex();

    console.log(">>>>>>>", this.regex)

    const match = value.match(this.regex);
    if (!match) throw new DateTimePatternMatchError();

    return match.groups  as unknown as ParsedDateTimeParts
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
