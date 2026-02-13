import { PopulatedDateTimePatternOptions } from './types/populated-datetime-pattern-options';

export const DATETIME_PATTERN_IMPLEMENTATION_DEFAULT_OPTIONS: PopulatedDateTimePatternOptions = {
  locale: '',

  case: 'default',

  elastic: true,

  flexible: true,

  limitRange: false,

  unicode: false,
} as const;


export const JS_MIN_YEAR = -271820;
export const JS_MAX_YEAR = 275759;
