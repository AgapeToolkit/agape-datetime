import { Properties } from '@agape/types';
import { VerboseUnicodeDateTimeToken } from './verbose-unicode-datetime-token';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { WeekdayNames } from '../../../names';
import { buildRegexFromNames, getIsoWeekdayFromResolvedDateParts } from '../util';
import { VerboseDateTimePartVariation } from '../../types/verbose-datetime-part-variaion';
import { ResolvedDateTimeParts } from '../../types/resolved-datetime-parts';

export class VerboseWeekdayUnicodeDateTimeToken extends VerboseUnicodeDateTimeToken {

  declare readonly id: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly variation!: VerboseDateTimePartVariation;

  readonly standalone?: boolean;

  constructor(params: Properties<VerboseWeekdayUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
    this.standalone ??= false;
  }

  getRegex(options: PopulatedDateTimePatternOptions): string {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;
    const weekdayNames = WeekdayNames.get({locale: options.locale, case: namesCase, standalone: this.standalone});
    const weekdays = weekdayNames[this.variation];
    return buildRegexFromNames(weekdays);
  }

  resolve(value: string, options: PopulatedDateTimePatternOptions, parts?: ResolvedDateTimeParts): { weekday: number } {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;
    const weekdayNames = WeekdayNames.get({locale: options.locale, case: namesCase, standalone: this.standalone});
    const weekdays = weekdayNames[this.variation];

    const testValue = options.case === 'insensitive'
      ? value.toLocaleLowerCase(options.locale)
      : value;

    if (this.variation === 'narrow' && parts && (parts.year || parts.calendarYear) && parts.month && parts.day) {
      const dow = getIsoWeekdayFromResolvedDateParts(parts) as number;
      const actualWeekday = weekdays[dow-1];

      if (actualWeekday === testValue) {
        return { weekday: dow };
      }
    }

    const index = weekdays.indexOf(testValue);
    if (index < 0) throw new Error(`Error resolving weekday, value "${value}" is not one of ${weekdays.map(m => '"' + m + '"').join(', ')}`)
    return { weekday: index + 1 };
  }
}
