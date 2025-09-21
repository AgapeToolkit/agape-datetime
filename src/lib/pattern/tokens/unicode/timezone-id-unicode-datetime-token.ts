import { Properties } from '@agape/types';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';
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

  getRegex(options: DateTimePatternImplementationOptions): string {
    if (options.case === 'lowercase' || options.case === 'insensitive') return this.regex.toLocaleLowerCase('en-US');
    if (options.case === 'uppercase') return this.regex.toLocaleUpperCase('en-US');
    return this.regex;
  }

  resolve(value: string, options?: DateTimePatternOptions): { timeZoneId: string } {
    try {
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", { timeZone: value });
      const resolvedTimeZoneId = dateTimeFormat.resolvedOptions().timeZone; // "America/New_York"
      return { timeZoneId: resolvedTimeZoneId };
    }
    catch (error) {
      if (error instanceof RangeError) {
        throw new InvalidTimeZoneError(`Could not resolve timezone ID "${value}"`)
      }
      throw error;
    }
  }

}
