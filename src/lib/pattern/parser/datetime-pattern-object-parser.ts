import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';
import { DateTimePatternParser } from './datetime-pattern-parser';

export class DateTimePatternObjectParser extends DateTimePatternParser {

  public readonly parts: DestructuredDateTimePatternPart[];

  constructor(private readonly input: object) {
    super();
    this.parts = this.formatToParts(input);
  }

  private formatToParts(input: object): DestructuredDateTimePatternPart[] {

  }
}
