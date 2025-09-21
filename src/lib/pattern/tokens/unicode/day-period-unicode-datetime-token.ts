import { Properties } from '@agape/types';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';
import { VerboseDateTimePartVariation } from '../../types/verbose-datetime-part-variaion';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';
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

  getRegex(options: DateTimePatternImplementationOptions): string {
    const namesCase = options.case === 'insensitive' ? 'default' : options.case;
    const dayPeriodNames = DayPeriodNames.get({locale: options.locale, case: namesCase});
    const dayPeriods = dayPeriodNames[this.variation];
    return buildRegexFromNames(dayPeriods);
  }

  resolve(value: string, options: DateTimePatternImplementationOptions): { month: number } {
    const namesCase = options.case === 'insensitive' ? 'default' : options.case;
    const dayPeriodNames = DayPeriodNames.get({locale: options.locale, case: namesCase});
    const dayPeriods = dayPeriodNames[this.variation];

    const testValue = options.case === 'insensitive'
      ? value.toLocaleLowerCase(options.locale)
      : value;

    const index = dayPeriods.indexOf(testValue);
    if (index && index < 0) throw new Error(`Error resolving day period, value "${value}" is not one of ${dayPeriods.map(m => '"' + m + '"').join(', ')}`)
    return { month: index };
  }

}
