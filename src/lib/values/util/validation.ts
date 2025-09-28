import { DateTimeParts } from '../../pattern';
import { isValidDayOfMonth, isValidOffset, isValidTimeZone, isYearInRange } from '../../pattern/util/validation';
import { InvalidDayOfMonth } from '../../pattern/errors/invalid-day-of-month';
import { isValidDayOfWeek } from '../../pattern/util/weekday';
import { InvalidWeekdayError } from '../../pattern/errors/invalid-weekday';
import { InvalidTimeZoneError } from '../../pattern/errors/invalid-timezone-error';
import { hasTemporal } from '@agape/temporal';
import { InvalidTimeZoneOffsetError } from '../../pattern/errors/invalid-timezone-offset-error';

let skippedValidationCount = 0;
export function validateNormalizedValue(parts: DateTimeParts) {

  if(!isValidDayOfMonth(parts)) {
    throw new InvalidDayOfMonth();
  }

  if (parts.weekday) {
    // First validate that weekday is in valid range (1-7)
    if (parts.weekday < 1 || parts.weekday > 7) {
      throw new InvalidWeekdayError();
    }
    
    // Then validate that weekday matches the actual day of week for the date
    const { valid } = isValidDayOfWeek(parts);
    if (!valid) {
      throw new InvalidWeekdayError();
    }
  }

  if (parts.timeZone) {
    if (!isValidTimeZone(parts.timeZone)) {
      throw new InvalidTimeZoneError();
    }

    if (!hasTemporal()) {
      skippedValidationCount++;

      if (skippedValidationCount === 1) {
        // eslint-disable-next-line no-console
        console.warn(
          `Cannot validate time zone offsets because Temporal is not available.\n` +
          `This occurred while checking if offset ${parts.timeZoneOffset} is valid for time zone ${parts.timeZone}.\n` +
          `Install a Temporal polyfill to enable full time zone functionality.`
        );
      } else if (skippedValidationCount % 5 === 0) {
        // eslint-disable-next-line no-console
        console.warn(
          `Validation of time zone offsets has been skipped ${skippedValidationCount} times because Temporal is not available.\n` +
          `Install a Temporal polyfill to enable this functionality.`
        );
      }
    }
    else {
      if(!isValidOffset(parts)) {
        throw new InvalidTimeZoneOffsetError()
      }
    }
  }
}