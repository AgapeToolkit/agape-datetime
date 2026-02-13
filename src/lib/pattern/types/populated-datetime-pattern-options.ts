import { PatternCase } from './datetime-pattern-case';

export interface PopulatedDateTimePatternOptions {
  locale: string;

  case: PatternCase;

  elastic: boolean;

  flexible: boolean;

  limitRange: boolean;

  unicode: boolean;
}
