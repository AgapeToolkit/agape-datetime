import { Properties } from '@agape/types';
import { DateTimePatternOptions } from '../interfaces/datetime-pattern-options';
import { ElasticNumberUnicodeDateTimeToken } from './elastic-number-unicode-datetime-token';

export class ElasticTimestampUnicodeDateTimeToken extends ElasticNumberUnicodeDateTimeToken {

  prefix?: '+' | '-' | null | undefined;

  constructor(options: Properties<ElasticTimestampUnicodeDateTimeToken>) {
    super(options);
  }

  getRegex(options?: DateTimePatternOptions | null | undefined, length: number=1) {
    if (length <= 0) throw new Error('length must be positive');
    const elastic = options?.elastic ?? true;
    const prefixRegex = !this.prefix
      ? ''
      : this.prefix === '+'
      ? '[+-]'
      : '-?';
    return elastic
      ? `${prefixRegex}\\d{${length},}`
      : `${prefixRegex}\\d{${length}}`;
  }

  resolve(value: string, options?: DateTimePatternOptions) {
    const n = value.startsWith('+') ? value.slice(1) : value;
    return { [this.name ?? this.id]: Number(n) };
  }

  getTokenLength(tokenString: string): number {
    const regex = new RegExp(`^[^${this.char}]`)
    const testString = tokenString.match(regex) ? tokenString.slice(1) : tokenString;
    return testString.length;
  }

}
