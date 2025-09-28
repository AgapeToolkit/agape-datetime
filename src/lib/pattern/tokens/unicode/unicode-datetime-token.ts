import { DateTimeToken } from '../datetime-token';
import { PopulatedDateTimePatternOptions } from '../../types/populated-datetime-pattern-options';
import { ResolvedDateTimeParts } from '../../../types/resolved-datetime-parts';

export abstract class UnicodeDateTimeToken extends DateTimeToken {
  abstract readonly id: string;
  abstract readonly name?: string;

  abstract getRegex(options: PopulatedDateTimePatternOptions | null | undefined): string;

  abstract resolve(value: string, options: PopulatedDateTimePatternOptions, parts?: ResolvedDateTimeParts): ResolvedDateTimeParts;
}
