import { DateTimeToken } from './datetime-token';
import { DateTimePatternImplementationOptions } from '../types/datetime-pattern-implementation-options';
import { escapeRegex } from './util';

export class LiteralDateTimeToken extends DateTimeToken {
  readonly id: string = 'literal';
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  getRegex(options: DateTimePatternImplementationOptions): string {
    let value = this.value;
    if (options?.case) {
      if (options.case === 'lowercase' || options.case === 'insensitive') value = value.toLocaleLowerCase(options.locale);
      if (options.case === 'uppercase') value = value.toLocaleUpperCase(options.locale);
    }
    return escapeRegex(value);
  }
}
