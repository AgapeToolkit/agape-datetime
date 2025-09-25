import { DateTimePatternImplementationOptions } from './types/datetime-pattern-implementation-options';

export const DATETIME_PATTERN_IMPLEMENTATION_DEFAULT_OPTIONS: DateTimePatternImplementationOptions = {
  locale: '',

  case: 'default',

  elastic: true,

  flexible: true,

  limitRange: false,

  unicode: false,
} as const;


export const JS_MIN_YEAR = -271820;
export const JS_MAX_YEAR = 275759;
