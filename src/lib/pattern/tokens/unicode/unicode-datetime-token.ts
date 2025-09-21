import { DateTimeToken } from '../datetime-token';
import { DateTimePatternImplementationOptions } from '../../types/datetime-pattern-implementation-options';
import { ResolvedDateTimeParts } from '../../types/resolved-datetime-parts';

export abstract class UnicodeDateTimeToken extends DateTimeToken {
  abstract readonly id: string;
  abstract readonly name?: string;

  abstract getRegex(options: DateTimePatternImplementationOptions | null | undefined): string;

  abstract resolve(value: string, options: DateTimePatternImplementationOptions, parts?: ResolvedDateTimeParts): ResolvedDateTimeParts;
}
