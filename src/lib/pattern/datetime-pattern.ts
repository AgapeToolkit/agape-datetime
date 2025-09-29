import { DateTimePatternImplementation } from './implementation/datetime-pattern-implementation';
import { DateTimePatternStringParser } from './parser/datetime-pattern-string-parser';
import { DateTimePatternIntlParser } from './parser/datetime-pattern-intl-parser';
import { DateTimePatternObjectParser } from './parser/datetime-pattern-object-parser';
import { DateTimeValue } from '../values/datetime-value';
import { DateTimePatternOptions } from './types/datetime-pattern-options';
import { PopulatedDateTimePatternOptions } from './types/populated-datetime-pattern-options';
import { DATETIME_PATTERN_IMPLEMENTATION_DEFAULT_OPTIONS } from './constants';
import { getLocale } from '@agape/locale';

export class DateTimePattern {

  private implementation!: DateTimePatternImplementation;

  constructor(pattern: string | Intl.DateTimeFormat | Intl.DateTimeFormatOptions, options: Partial<DateTimePatternOptions> = {}) {
    const implementationOptions: PopulatedDateTimePatternOptions = {
      ...DATETIME_PATTERN_IMPLEMENTATION_DEFAULT_OPTIONS as PopulatedDateTimePatternOptions,
      ...options as PopulatedDateTimePatternOptions,
      locale: options?.locale ?? getLocale()
    }
    if (pattern instanceof Intl.DateTimeFormat) {
      const parser = new DateTimePatternIntlParser(pattern);
      this.implementation = new DateTimePatternImplementation(parser.parts, implementationOptions);
    }
    else if (typeof pattern === 'string') {
      const parser = new DateTimePatternStringParser(pattern, options.unicode ?? false);
      this.implementation = new DateTimePatternImplementation(parser.parts, implementationOptions);
    }
    else {
      const parser = new DateTimePatternObjectParser(pattern, implementationOptions.locale);
      this.implementation = new DateTimePatternImplementation(parser.parts, implementationOptions);
    }
  }

  parse(value: string): DateTimeValue {
    return this.implementation.parse(value);
  }
}
