import { PatternCase } from './datetime-pattern-case';

export interface DateTimePatternOptions {
  locale?: string;

  case?: PatternCase;

  elastic?: boolean;

  flexible?: boolean;

  limitRange?: boolean;

  unicode?: boolean;
}
