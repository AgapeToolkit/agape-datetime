import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToTimeZoneOptions extends DateTimeParts {
  fill?: FillStrategy;
}
