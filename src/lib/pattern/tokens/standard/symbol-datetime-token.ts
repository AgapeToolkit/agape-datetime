import { Properties } from '@agape/types';
import { DateTimeToken } from '../datetime-token';
import { SymbolUnicodeDateTimeToken } from '../unicode/symbol-unicode-datetime-token';

export class SymbolDateTimeToken extends DateTimeToken {
  readonly id!: string;

  readonly symbol!: string | RegExp;

  readonly unicode!: SymbolUnicodeDateTimeToken;

  constructor(params: Properties<SymbolDateTimeToken>) {
    super();
    Object.assign(this, params);
  }
}
