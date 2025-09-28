import { DateTimeParts } from './datetime-parts';
import { FillStrategy } from './fill-strategy';

export interface ToInstantOptions extends DateTimeParts {
  fill?: FillStrategy;
  timeZone?: string;
  disambiguate?: 'compatible' | 'earlier' | 'later';
}
