import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';

export abstract class DateTimePatternParser {

  public abstract readonly parts: DestructuredDateTimePatternPart[];

}
