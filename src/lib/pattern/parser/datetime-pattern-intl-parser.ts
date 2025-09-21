import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';
import { DateTimePatternParser } from './datetime-pattern-parser';

export class DateTimePatternIntlParser extends DateTimePatternParser {

  public readonly parts!: DestructuredDateTimePatternPart[];

  constructor(private readonly intlFormat: Intl.DateTimeFormat) {
    super();
    // this.parts = this.formatToParts(intlFormat);
  }

  // private formatToParts(intlFormat: Intl.DateTimeFormat): DestructuredDateTimePatternPart[] {
  //
  // }
}
