import { Properties } from '@agape/types';
import { VerboseUnicodeDateTimeToken } from './verbose-unicode-datetime-token';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';
import { WeekdayNames } from '../../../names';
import { buildRegexFromNames } from '../util';
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
  }

  getRegex(options: DateTimePatternImplementationOptions): string {
    const namesCase = options.case === 'insensitive' ? 'default' : options.case;
    const weekdayNames = WeekdayNames.get({locale: options.locale, case: namesCase});
    const weekdays = weekdayNames[this.variation];
    return buildRegexFromNames(weekdays);
  }

  resolve(value: string, options: DateTimePatternImplementationOptions, parts?: ResolvedDateTimeParts): { weekday: number } {
    const namesCase = options.case === 'insensitive' ? 'default' : options.case;
    const weekdayNames = WeekdayNames.get({locale: options.locale, case: namesCase});
    const weekdays = weekdayNames[this.variation];

    const testValue = options.case === 'insensitive'
      ? value.toLocaleLowerCase(options.locale)
      : value;

    const index = weekdays.indexOf(testValue);
    if (index < 0) throw new Error(`Error resolving weekday, value "${value}" is not one of ${weekdays.map(m => '"' + m + '"').join(', ')}`)
    return { weekday: index + 1 };
  }
}
