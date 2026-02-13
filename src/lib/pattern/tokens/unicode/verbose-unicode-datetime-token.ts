import { SymbolUnicodeDateTimeToken } from './symbol-unicode-datetime-token';

export abstract class VerboseUnicodeDateTimeToken extends SymbolUnicodeDateTimeToken {
  readonly id!: string;

  abstract readonly name?: string;

  abstract readonly symbol: string | RegExp;
}
