import { Properties } from '@agape/types';
import { VerboseUnicodeDateTimeToken } from './verbose-unicode-datetime-token';
import { VerboseDateTimePartVariation } from '../../types/verbose-datetime-part-variaion';
import { CommonEraNames, EraNames } from '../../../names';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { buildRegexFromNames } from '../util';

export class VerboseEraUnicodeDateTimeToken extends VerboseUnicodeDateTimeToken {
  declare readonly id: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly variation!: VerboseDateTimePartVariation;

  readonly common?: boolean;

  constructor(params: Properties<VerboseEraUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options: PopulatedDateTimePatternOptions): string {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;

    const eraNames = this.common
      ? CommonEraNames.get({locale: options.locale, case: namesCase})
      : EraNames.get({locale: options.locale, case: namesCase});

    const eras = eraNames[this.variation];
    return buildRegexFromNames(eras);
  }

  resolve(value: string, options: PopulatedDateTimePatternOptions): { era: number } {
    const namesCase = options.case === 'insensitive' ? 'lowercase' : options.case;
    const eraNames = this.common
      ? CommonEraNames.get({locale: options.locale, case: namesCase})
      : EraNames.get({locale: options.locale, case: namesCase});

    const eras = eraNames[this.variation];

    const testValue = options.case === 'insensitive'
      ? value.toLocaleLowerCase(options.locale)
      : value;

    const index = eras.indexOf(testValue);
    if (index < 0) throw new Error(`Could not resolve era for value "${value}"`)
    return { era: index };
  }
}
