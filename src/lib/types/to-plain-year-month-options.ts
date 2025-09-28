import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToPlainYearMonthOptions extends DateTimeParts {
  fill?: FillStrategy;
}
