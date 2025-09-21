import { Properties } from '@agape/types';
import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';

export class NumberUnicodeDateTimeToken extends SymbolUnicodeDateTimeToken {
  readonly id!: string;

  readonly name?: string;

  readonly symbol!: string | RegExp;

  readonly regex!: string;

  readonly fixedWidthRegex?: string;

  constructor(params: Properties<NumberUnicodeDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getRegex(options: DateTimePatternImplementationOptions) {
    const flexible = options?.flexible ?? true;
    return flexible || !this.fixedWidthRegex ? this.regex : this.fixedWidthRegex;
  }

  resolve(value: string, options?: DateTimePatternImplementationOptions) {
    return { [this.name ?? this.id ]: Number(value) };
  }
}
