import { ResolvedDateTimeParts } from '../../pattern/types/resolved-datetime-parts';
import { PopulatedDateTimePatternOptions } from '../../pattern/types/populated-datetime-pattern-options';
import { DateTimeParts } from '../../pattern/types/datetime-parts';
import {
  isoWeekdayToLocalWeekday,
  isValidDayOfWeek,
  localWeekdayToIsoWeekday
} from '../../pattern/util/weekday';
import { isValidDayOfMonth, isValidOffset, isValidTimeZone, isYearInRange } from '../../pattern/util/validation';
import { InvalidDayOfMonth } from '../../pattern/errors/invalid-day-of-month';
import { DateOutOfRangeError } from '../../pattern/errors/date-out-of-range-error';
import { VerboseWeekdayUnicodeDateTimeToken } from '../../pattern/tokens/unicode/verbose-weekday-unicode-datetime-token';
import { Case, WeekdayNames } from '@agape/datetime';
import { InvalidWeekdayError } from '../../pattern/errors/invalid-weekday';
import { InvalidTimeZoneError } from '../../pattern/errors/invalid-timezone-error';
import { hasTemporal } from '@agape/temporal';
import { InvalidTimeZoneOffsetError } from '../../pattern/errors/invalid-timezone-offset-error';

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
    normalizedParts.weekday =  localWeekdayToIsoWeekday((resolvedDateTimeParts.weekdayLocal as number), options.locale)
    delete incoming['weekdayLocal'];
  }

  delete incoming['timeZoneNameShort'];
  delete incoming['timeZoneNameLong'];

  return { ...incoming, ...normalizedParts } as DateTimeParts;
}


//
// export function validateNormalizedDateTimeParts(parts: DateTimeParts) {
//   if(!isValidDayOfMonth(parts)) {
//     throw new InvalidDayOfMonth();
//   }
//
//   if (parts.weekday) {
//     const { valid, correctDayOfWeek = 1 } = isValidDayOfWeek(parts);
//
//     if (!valid) {
//       const verboseWeekdayTokens = this.parts.filter(part => part.token instanceof VerboseWeekdayUnicodeDateTimeToken) as Array<{ token: VerboseWeekdayUnicodeDateTimeToken}>;
//       if (verboseWeekdayTokens.length) {
//         const token = verboseWeekdayTokens[verboseWeekdayTokens.length - 1];
//         const variation = token.token.variation;
//
//         const caseValue: Case = this.options.case === 'insensitive' ? 'lowercase' : this.options.case;
//         const weekdayNames = WeekdayNames.get({ locale: this.options?.locale, case: caseValue });
//         throw new InvalidWeekdayError(`Invalid weekday, should be ${(weekdayNames as any)[variation][correctDayOfWeek - 1]}`);
//       }
//
//       const numericWeekdayTokens = this.parts.filter(part => part.token.id === 'weekday' || part.token.id === 'weekdayPadded');
//       if (numericWeekdayTokens.length) {
//         const token = numericWeekdayTokens[numericWeekdayTokens.length - 1];
//         const value = token.token.id === 'weekdayPadded' ? String(correctDayOfWeek).padStart(2, '0') : `${correctDayOfWeek}`;
//         throw new InvalidWeekdayError(`Invalid weekday, should be ${value}`);
//       }
//
//       const numericLocalWeekdayTokens = this.parts.filter(part => part.token.id === 'weekdayLocal' || part.token.id === 'weekdayLocalPadded');
//       if (numericLocalWeekdayTokens.length) {
//         const token = numericLocalWeekdayTokens[numericLocalWeekdayTokens.length - 1];
//         const localWeekday = isoWeekdayToLocalWeekday(correctDayOfWeek, this.options.locale);
//         const value = token.token.id === 'weekdayLocalPadded' ? String(localWeekday).padStart(2, '0') : `${localWeekday}`;
//         throw new InvalidWeekdayError(`Invalid weekday, should be ${value}`);
//       }
//     }
//   }
//
//   if (parts.timeZone) {
//     if (!isValidTimeZone(parts.timeZone)) {
//       throw new InvalidTimeZoneError();
//     }
//
//     if (!hasTemporal()) {
//       skippedValidationCount++;
//
//       if (skippedValidationCount === 1) {
//         // eslint-disable-next-line no-console
//         console.warn(
//           `Cannot validate time zone offsets because Temporal is not available.\n` +
//           `This occurred while checking if offset ${parts.timeZoneOffset} is valid for time zone ${parts.timeZone}.\n` +
//           `Install a Temporal polyfill to enable full time zone functionality.`
//         );
//       } else if (skippedValidationCount % 5 === 0) {
//         // eslint-disable-next-line no-console
//         console.warn(
//           `Validation of time zone offsets has been skipped ${skippedValidationCount} times because Temporal is not available.\n` +
//           `Install a Temporal polyfill to enable this functionality.`
//         );
//       }
//     }
//     else {
//       if(!isValidOffset(parts)) {
//         throw new InvalidTimeZoneOffsetError()
//       }
//     }
//   }
// }
