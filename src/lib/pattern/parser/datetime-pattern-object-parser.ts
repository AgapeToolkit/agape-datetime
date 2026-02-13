import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';
import { DateTimePatternParser } from './datetime-pattern-parser';
import { DateTimePatternIntlParser } from './datetime-pattern-intl-parser';

export class DateTimePatternObjectParser extends DateTimePatternParser {

  public readonly parts: DestructuredDateTimePatternPart[];

  constructor(private readonly options: Intl.DateTimeFormatOptions, private readonly locale: string) {
    super();
    this.parts = this.createPartsFromOptions(options, locale);
  }

  private createPartsFromOptions(options: Intl.DateTimeFormatOptions, locale: string): DestructuredDateTimePatternPart[] {
    // Create an Intl.DateTimeFormat instance with the provided options and locale
    const intlFormat = new Intl.DateTimeFormat(locale, options);
    
    // Use the existing Intl parser to parse the format
    const intlParser = new DateTimePatternIntlParser(intlFormat);
    
    return intlParser.parts;
  }
}
