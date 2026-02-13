import { Properties } from '@agape/types';
import { ElasticNumberUnicodeDateTimeToken } from './elastic-number-unicode-datetime-token';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';

export class FractionalSecondUnicodeDateTimeToken extends ElasticNumberUnicodeDateTimeToken {

  declare readonly id: string;

  declare readonly name?: string;

  declare readonly char: string;

  constructor(params: Properties<FractionalSecondUnicodeDateTimeToken>) {
    super(params);
  }

  // getRegex(options?: PopulatedDateTimePatternOptions | null | undefined, length: number = 1) {
  //   if (length <= 0) throw new Error('length must be positive');
  //   const elastic = options?.elastic ?? true;
  //   return elastic
  //     ? `\\d{${length},}`
  //     : `\\d{${length}}`;
  // }

  resolve(value: string, options?: PopulatedDateTimePatternOptions) {
    const nanosecond = Number(`.${value}`) * 1_000_000_000;
    return { nanosecond };
  }

}
