import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToPlainTimeOptions extends DateTimeParts {
  fill?: FillStrategy;
}
