import { DateTimeParts } from '../types/datetime-parts';
import { ResolvedDateTimeParts } from '../types/resolved-datetime-parts';
import { ParsedDateTimeParts } from '../types/parsed-datetime-parts';

export abstract class BaseValue {
  protected parts: DateTimeParts = {};
  protected resolvedParts?: ResolvedDateTimeParts;
  protected parsedParts?: ParsedDateTimeParts;

  constructor() {
    // Base constructor - no parameters accepted
  }

  protected set(parts: DateTimeParts): void {
    this.parts = { ...parts };
  }

  toParts(): DateTimeParts {
    return { ...this.parts };
  }
}
