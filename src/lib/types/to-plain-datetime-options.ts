import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToPlainDateTimeOptions extends DateTimeParts {
  fill?: FillStrategy;
}
