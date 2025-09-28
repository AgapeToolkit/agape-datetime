import { Properties } from '@agape/types';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';
import { VerboseDateTimePartVariation } from '../../types/verbose-datetime-part-variaion';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { DayPeriodNames } from '../../../names';
import { buildRegexFromNames } from '../util';

export class DayPeriodUnicodeDateTimeToken extends SymbolUnicodeDateTimeToken {

  readonly id!: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly variation!: VerboseDateTimePartVariation | 'default';

  constructor(params: Properties<DayPeriodUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options: PopulatedDateTimePatternOptions): string {
    const namesCase = options.case === 'insensitive' ? 'default' : options.case;
    const dayPeriodNames = DayPeriodNames.get({locale: options.locale, case: namesCase});
    const dayPeriods = dayPeriodNames[this.variation];
    return buildRegexFromNames(dayPeriods);
  }

  resolve(value: string, options: PopulatedDateTimePatternOptions): { dayPeriod: number } {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;
    const dayPeriodNames = DayPeriodNames.get({locale: options.locale, case: namesCase});
    const dayPeriods = dayPeriodNames[this.variation];

    const testValue = options.case === 'insensitive'
      ? value.toLocaleLowerCase(options.locale)
      : value;

    const index = dayPeriods.indexOf(testValue);
    if (index && index < 0) throw new Error(`Error resolving day period, value "${value}" is not one of ${dayPeriods.map(m => '"' + m + '"').join(', ')}`)
    return { dayPeriod: index };
  }

}
