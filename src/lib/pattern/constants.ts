import { DateTimePatternImplementationOptions } from './types/datetime-pattern-implementation-options';

export const DATETIME_PATTERN_IMPLEMENTATION_DEFAULT_OPTIONS: Partial<DateTimePatternImplementationOptions> = {
  case: 'default',

  elastic: true,

  flexible: true,

  limitRange: true
} as const;
