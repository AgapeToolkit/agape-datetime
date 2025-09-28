import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToPlainMonthDayOptions extends DateTimeParts {
  fill?: FillStrategy;
}
