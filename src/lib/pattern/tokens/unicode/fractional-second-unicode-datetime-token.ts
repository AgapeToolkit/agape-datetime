import { Properties } from '@agape/types';
import { ElasticNumberUnicodeDateTimeToken } from './elastic-number-unicode-datetime-token';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';

export class FractionalSecondUnicodeDateTimeToken extends ElasticNumberUnicodeDateTimeToken {

  readonly id!: string;

  readonly name?: string;

  readonly char!: string;

  constructor(params: Properties<FractionalSecondUnicodeDateTimeToken>) {
    super(params);
  }

  resolve(value: string, options?: DateTimePatternImplementationOptions) {
    return { [this.name ?? this.id ]: Number(`.${value}`) };
  }

}
