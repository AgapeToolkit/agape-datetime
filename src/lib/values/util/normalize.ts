import { ResolvedDateTimeParts } from '../../types/resolved-datetime-parts';
import { PopulatedDateTimePatternOptions } from '../../pattern/types/populated-datetime-pattern-options';
import { DateTimeParts } from '../../types/datetime-parts';
import { localWeekdayToIsoWeekday } from '../../pattern/util/weekday';

export function normalizeDateTimeParts(resolvedDateTimeParts: ResolvedDateTimeParts, options: PopulatedDateTimePatternOptions): DateTimeParts {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const incoming: Partial<ResolvedDateTimeParts> = { ...resolvedDateTimeParts };
  const normalizedParts: DateTimeParts = {};

  if ('calendarYear' in resolvedDateTimeParts && !('year' in resolvedDateTimeParts)) {
    const era = resolvedDateTimeParts.era ?? 1;
    if (era) normalizedParts.year = resolvedDateTimeParts.calendarYear;
    else normalizedParts.year = ( (resolvedDateTimeParts.calendarYear as number) - 1) * -1;
  }
  delete incoming['calendarYear'];
  delete incoming['era'];

  if ('twelveHour' in resolvedDateTimeParts && !('hour' in resolvedDateTimeParts)) {
    const dayPeriod = resolvedDateTimeParts.dayPeriod ?? 0;
    normalizedParts.hour = dayPeriod && (resolvedDateTimeParts.twelveHour as number) < 12? (resolvedDateTimeParts.twelveHour as number) + 12 : resolvedDateTimeParts.twelveHour;
  }
  delete incoming['twelveHour'];
  delete incoming['dayPeriod'];

  if('weekdayLocal' in resolvedDateTimeParts && !('weekday' in resolvedDateTimeParts)) {
    normalizedParts.weekday = localWeekdayToIsoWeekday((resolvedDateTimeParts.weekdayLocal as number), options.locale)
    delete incoming['weekdayLocal'];
  }

  delete incoming['timeZoneNameShort'];
  delete incoming['timeZoneNameLong'];

  return { ...incoming, ...normalizedParts } as DateTimeParts;
}
