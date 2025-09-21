
import { ResolvedDateTimeParts } from './resolved-datetime-parts';
import { ParsedDateTimeParts } from './parsed-datetime-parts';
import { DateTimeParts } from './datetime-parts';
import { DateTimePatternOptions } from './datetime-pattern-options';

export class DateTimeValue {
  readonly normalized!: DateTimeParts;
  readonly resolved!: ResolvedDateTimeParts;
  readonly parsed!: ParsedDateTimeParts;
  readonly options!: DateTimePatternOptions

  // constructor(value?: DateTimeValue) {
  //
  // }
}



