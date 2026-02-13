import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface FillDateTimeParts extends DateTimeParts {
  fill?: FillStrategy;
}

export interface FillOptions extends DateTimeParts {
  strategy: FillStrategy;
}
