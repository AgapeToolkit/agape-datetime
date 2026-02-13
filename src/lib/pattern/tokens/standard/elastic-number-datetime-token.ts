import { Properties } from '@agape/types';
import { ElasticNumberUnicodeDateTimeToken } from '../unicode/elastic-number-unicode-datetime-token';
import { DateTimeToken } from '../datetime-token';

export class ElasticNumberDateTimeToken extends DateTimeToken {

  readonly char!: string;

  readonly id!: string;

  readonly unicode!: ElasticNumberUnicodeDateTimeToken;

  constructor(params: Properties<ElasticNumberDateTimeToken>) {
    super();
    Object.assign(this, params);
  }

  getTokenRegex() {
    const prefix = !this.unicode.prefix
      ? ''
      : this.unicode.prefix === '+'
        ? '[+±]'
        : '-';
    return `${prefix}${this.char}+`;
  }
}
