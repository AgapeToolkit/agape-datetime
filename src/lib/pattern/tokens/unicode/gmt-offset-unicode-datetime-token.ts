import { Properties } from '@agape/types';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';

export class GmtOffsetUnicodeDateTimeToken extends SymbolUnicodeDateTimeToken {

  readonly id!: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly regex!: string;

  constructor(params: Properties<GmtOffsetUnicodeDateTimeToken>) {
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
    // Parse GMT offset format like "GMT-05:00" or "GMT+0530"
    const gmtMatch = value.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?$/i);
    if (!gmtMatch) {
      throw new Error(`Cannot resolve GMT offset "${value}", invalid format`);
    }

    const [, sign, hours, minutes = '00', seconds = '00'] = gmtMatch;
    
    // Convert to standard offset format
    const timeZoneOffset = `${sign}${hours.padStart(2, '0')}:${minutes}`;
    
    return { timeZoneOffset };
  }
}
