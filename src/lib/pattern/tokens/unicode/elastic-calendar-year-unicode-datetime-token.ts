import { Properties } from '@agape/types';
import { ElasticNumberUnicodeDateTimeToken } from './elastic-number-unicode-datetime-token';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';

export class ElasticCalendarYearUnicodeDateTimeToken extends ElasticNumberUnicodeDateTimeToken {

  constructor(options: Properties<ElasticCalendarYearUnicodeDateTimeToken>) {
    super(options);
  }

  getRegex(options: DateTimePatternImplementationOptions | null | undefined, length: number=1) {
    if (length === 0) throw new Error('length must be positive');
    const elastic = options?.elastic ?? true;

    return elastic
      ? `\\d{${length - 1},}[1-9]`
      : `\\d{${length - 1}}[1-9]`;
  }

  resolve(value: string, options?: DateTimePatternImplementationOptions): object {
    return { calendarYear: Number(value) };
  }
}
