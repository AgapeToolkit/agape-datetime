import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToPlainDateOptions extends DateTimeParts {
  fill?: FillStrategy;
}
