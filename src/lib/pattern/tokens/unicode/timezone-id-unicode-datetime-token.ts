import { Properties } from '@agape/types';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { DateTimePatternOptions } from '../../types/datetime-pattern-options';
import { InvalidTimeZoneError } from '../../errors/invalid-timezone-error';

export class TimeZoneIdUnicodeDateTimeToken extends SymbolUnicodeDateTimeToken {

  readonly id!: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly regex!: string;

  private readonly date: Date = new Date('2020-06-15T12:00:00');

  constructor(params: Properties<TimeZoneIdUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options: PopulatedDateTimePatternOptions): string {
    if (options.case === 'lowercase' || options.case === 'insensitive') return this.regex.toLocaleLowerCase('en-US');
    if (options.case === 'uppercase') return this.regex.toLocaleUpperCase('en-US');
    return this.regex;
  }

  resolve(value: string, options?: DateTimePatternOptions): { timeZone: string } {
    try {
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", { timeZone: value });
      const resolvedTimeZoneId = dateTimeFormat.resolvedOptions().timeZone; // "America/New_York"
      return { timeZone: resolvedTimeZoneId };
    }
    catch (error) {
      if (error instanceof RangeError) {
        throw new InvalidTimeZoneError(`Could not resolve timezone ID "${value}"`)
      }
      throw error;
    }
  }

}
