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

  resolve(value: string, options?: PopulatedDateTimePatternOptions) {
    // Convert fractional part to nanoseconds (pad to 9 digits, then truncate)
    const paddedFractional = value.padEnd(9, '0').substring(0, 9);
    return { 'nanoseconds': parseInt(paddedFractional, 10) };
  }

}
