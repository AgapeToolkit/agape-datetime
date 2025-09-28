import { Properties } from '@agape/types';
import { VerboseUnicodeDateTimeToken } from './verbose-unicode-datetime-token';
import { VerboseDateTimePartVariation } from '../../types/verbose-datetime-part-variaion';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { buildRegexFromNames } from '../util';
import { MonthNames } from '../../../names';

export class VerboseMonthUnicodeDateTimeToken extends VerboseUnicodeDateTimeToken {
  declare readonly id: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly variation!: VerboseDateTimePartVariation;

  readonly standalone?: boolean;

  constructor(params: Properties<VerboseMonthUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
    this.standalone ??= false;
  }

  getRegex(options: PopulatedDateTimePatternOptions): string {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;
    const monthNames = MonthNames.get({locale: options.locale, case: namesCase, standalone: this.standalone});
    const months = monthNames[this.variation];
    return buildRegexFromNames(months);
  }

  resolve(value: string, options: PopulatedDateTimePatternOptions): { month: number } {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;
    const monthNames = MonthNames.get({locale: options.locale, case: namesCase, standalone: this.standalone});
    const months = monthNames[this.variation];

    const testValue = options.case === 'insensitive'
      ? value.toLocaleLowerCase(options.locale)
      : value;

    const index = months.indexOf(testValue);
    if (index < 0) throw new Error(`Error resolving month, value "${value}" is not one of ${months.map(m => '"' + m + '"').join(', ')}`)
    return { month: index + 1 };
  }
}
