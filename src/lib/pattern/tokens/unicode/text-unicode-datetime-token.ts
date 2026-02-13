import { Properties } from '@agape/types';
import { DateTimePatternOptions } from '../interfaces/datetime-pattern-options';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';

export class TextUnicodeDateTimeToken extends SymbolUnicodeDateTimeToken {
  readonly id: string;

  readonly name?: string;

  readonly symbol: string | RegExp;

  readonly regex: string;

  constructor(params: Properties<TextUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options?: DateTimePatternOptions) {
    if (!options) return this.regex;
    if (options?.case === 'uppercase') return this.regex.toLocaleUpperCase(options?.locale);
    if (options?.case === 'lowercase' || options?.case === 'insensitive') return this.regex.toLocaleLowerCase(options?.locale);
    return this.regex;
  }

  resolve(value: string, options?: DateTimePatternOptions): object {
    return { [this.name ?? this.id]: value };
  }
}
