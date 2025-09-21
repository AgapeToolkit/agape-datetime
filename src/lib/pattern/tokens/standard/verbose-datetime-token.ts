import { Properties } from '@agape/types';
import { VerboseUnicodeDateTimeToken } from '../unicode/verbose-unicode-datetime-token';
import { SymbolDateTimeToken } from './symbol-datetime-token';

export class VerboseDateTimeToken extends SymbolDateTimeToken {

  readonly id: string;

  readonly symbol: string | RegExp;

  readonly unicode: VerboseUnicodeDateTimeToken;

  constructor(params: Properties<VerboseDateTimeToken>) {
    super(params);
  }
}
