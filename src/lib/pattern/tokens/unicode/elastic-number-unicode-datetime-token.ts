import { Properties } from '@agape/types';
import { UnicodeDateTimeToken } from './unicode-datetime-token';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { LiteralDateTimeToken } from '../literal-datetime-token';
import { DestructuredDateTimePatternPart } from '../../types/destructured-datetime-pattern-part';

export class ElasticNumberUnicodeDateTimeToken extends UnicodeDateTimeToken {

  readonly id!: string;

  readonly name?: string;

  readonly char!: string;

  prefix?: '+' | '-' | null | undefined;

  constructor(params: Properties<ElasticNumberUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options?: PopulatedDateTimePatternOptions | null | undefined, length: number=1) {
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

  resolve(value: string, options?: PopulatedDateTimePatternOptions): object {
    const n = value.startsWith('+') ? value.slice(1) : value;
    const number = Number(n);
    return { [this.name ?? this.id]: Object.is(number, -0) ? 0 : number  };
  }

  getTokenLength(tokenString: string): number {
    const regex = new RegExp(`^[+\\-±]`, 'u')
    const testString = tokenString.match(regex) ? tokenString.slice(1) : tokenString;
    return testString.length;
  }

  getTokenRegex(options?: PopulatedDateTimePatternOptions) {
    const prefix = !this.prefix
      ? ''
      : this.prefix === '+'
      ? '[+±]'
      : '-';
    return `${prefix}${this.char}+`;
  }

  getTokenQualifier(parts: DestructuredDateTimePatternPart[]) {
    if (!parts || !parts.length) return true;
    return parts.at(-1)?.token instanceof LiteralDateTimeToken;
  }
}
