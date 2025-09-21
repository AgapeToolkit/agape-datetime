import { Properties } from '@agape/types';
import { UnicodeDateTimeToken } from './unicode-datetime-token';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';

export class ElasticNumberUnicodeDateTimeToken extends UnicodeDateTimeToken {

  readonly id!: string;

  readonly name?: string;

  readonly char!: string;

  prefix?: '+' | '-' | null | undefined;

  constructor(params: Properties<ElasticNumberUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options?: DateTimePatternImplementationOptions | null | undefined, length: number=1) {
    if (length <= 0) throw new Error('length must be positive');
    const elastic = options?.elastic ?? true;
    const prefixRegex = !this.prefix
      ? ''
      : this.prefix === '+'
        ? '[+\\-]'
        : '-?';
    return elastic
      ? `${prefixRegex}\\d{${length},}`
      : `${prefixRegex}\\d{${length}}`;
  }

  resolve(value: string, options?: DateTimePatternImplementationOptions): object {
    const n = value.startsWith('+') ? value.slice(1) : value;
    return { [this.name ?? this.id]: Number(n) };
  }

  getTokenLength(tokenString: string): number {
    const regex = new RegExp(`^[+\\-±]`, 'u')
    const testString = tokenString.match(regex) ? tokenString.slice(1) : tokenString;
    return testString.length;
  }

  getTokenRegex(options?: DateTimePatternImplementationOptions) {
    const prefix = !this.prefix
      ? ''
      : this.prefix === '+'
      ? '[+±]'
      : '-';
    return `${prefix}${this.char}+`;
  }
}
