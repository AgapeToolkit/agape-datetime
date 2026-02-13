import { Properties } from '@agape/types';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';

export class TimeZoneOffsetUnicodeDateTimeToken extends SymbolUnicodeDateTimeToken {

  readonly id!: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly regex!: string;

  constructor(params: Properties<TimeZoneOffsetUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options?: PopulatedDateTimePatternOptions): string {
    if (!options?.case || options?.case === 'default') return this.regex;
    if (options.case === 'lowercase' || options.case === 'insensitive') return this.regex.toLocaleLowerCase('en-US');
    if (options.case === 'uppercase') return this.regex.toLocaleUpperCase('en-US');
    return this.regex;
  }

  resolve(value: string, options?: PopulatedDateTimePatternOptions): { timeZoneOffset: string, timeZone?: string } {
    if (value === 'Z' || value === 'z') return { timeZoneOffset: "+00:00", timeZone: 'UTC' };

    let timeZoneOffset: string;
    if (!value.includes(':')) {
      const length = value.length;
      if (length === 3) timeZoneOffset = `${value}:00`;
      else if (length === 5) timeZoneOffset = `${value.slice(0,3)}:${value.slice(3)}`;
      else if (length === 7) timeZoneOffset = `${value.slice(0,3)}:${value.slice(3,5)}:${value.slice(5)}`;
      else throw new Error(`Cannot resolve timezone offset "${value}", invalid value`);
    }
    else {
      timeZoneOffset = value;
    }

    return { timeZoneOffset };
  }
}
