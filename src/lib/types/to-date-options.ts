import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToDateOptions extends DateTimeParts {
  fill?: FillStrategy;
}
