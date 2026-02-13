import { UnicodeDateTimeToken } from './unicode-datetime-token';

export abstract class SymbolUnicodeDateTimeToken extends UnicodeDateTimeToken {
  abstract readonly id: string;

  abstract readonly name?: string;

  abstract readonly symbol: string | RegExp
}