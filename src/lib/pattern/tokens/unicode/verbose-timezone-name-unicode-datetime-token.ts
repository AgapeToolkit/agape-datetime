import { Properties } from '@agape/types';
import { VerboseUnicodeDateTimeToken } from './verbose-unicode-datetime-token';
import { VerboseDateTimePartVariation } from '../../types/verbose-datetime-part-variaion';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { TimeZoneNames } from '../../../names';
import { InvalidTimeZoneNameError } from '../../errors/invalid-timezone-name-error';


export class VerboseTimeZoneNameUnicodeDateTimeToken extends VerboseUnicodeDateTimeToken {
  declare readonly id: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly variation!: VerboseDateTimePartVariation;

  readonly regex!: string;

  constructor(params: Properties<VerboseTimeZoneNameUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options: PopulatedDateTimePatternOptions): string {
    if (options.case === 'uppercase') return this.regex.toLocaleUpperCase(options.locale);
    if (options.case === 'lowercase' || options.case === 'insensitive') return this.regex.toLocaleLowerCase(options.locale);
    return this.regex;
  }

  resolve(value: string, options: PopulatedDateTimePatternOptions): { timeZoneOffset: string } {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;
    const timeZoneNames = TimeZoneNames.get({locale: options.locale, case: namesCase});

    const testValue = options.case === 'insensitive'
      ? value.toLocaleLowerCase(options.locale)
      : value;

    const offset = timeZoneNames.getOffset(this.variation, testValue);
    if (!offset) throw new InvalidTimeZoneNameError(`Invalid timezone name, value "${value}" is not one of ${timeZoneNames[this.variation].map(m => '"' + m + '"').join(', ')}`)
    return { timeZoneOffset: offset };
  }
}
