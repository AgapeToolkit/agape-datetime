import { Properties } from '@agape/types';
import { NumberUnicodeDateTimeToken } from '../unicode/number-unicode-datetime-token';
import { SymbolDateTimeToken } from './symbol-datetime-token';

export class NumberDateTimeToken extends SymbolDateTimeToken {

  readonly id: string;

  readonly symbol: string | RegExp;

  readonly unicode: NumberUnicodeDateTimeToken;

  constructor(params: Properties<NumberDateTimeToken>) {
    super(params);
  }
}
