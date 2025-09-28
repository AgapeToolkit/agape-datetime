import { DateTimeValue } from './datetime-value';
import { DateTimeParts } from '../types/datetime-parts';
import { ParsedDateTimeParts } from '../types/parsed-datetime-parts';
import { PopulatedDateTimePatternOptions } from '../pattern/types/populated-datetime-pattern-options';
import { InvalidDayOfMonth } from '../pattern/errors/invalid-day-of-month';
import { InvalidWeekdayError } from '../pattern/errors/invalid-weekday';
import { InvalidTimeZoneError } from '../pattern/errors/invalid-timezone-error';
import { InvalidTimeZoneOffsetError } from '../pattern/errors/invalid-timezone-offset-error';
import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
import { setTemporal } from '@agape/temporal';

describe('DateTimeValue', () => {
  describe('Constructor', () => {
    it('should create empty instance when no parts provided', () => {
      const dtv = new DateTimeValue();
      expect(dtv.year).toBeUndefined();
      expect(dtv.month).toBeUndefined();
      expect(dtv.day).toBeUndefined();
      expect(dtv.hour).toBeUndefined();
      expect(dtv.minute).toBeUndefined();
      expect(dtv.second).toBeUndefined();
      expect(dtv.fractionalSecond).toBeUndefined();
      expect(dtv.timeZone).toBeUndefined();
      expect(dtv.timeZoneOffset).toBeUndefined();
      expect(dtv.secondsTimestamp).toBeUndefined();
      expect(dtv.millisecondsTimestamp).toBeUndefined();
      expect(dtv.nanosecondsTimestamp).toBeUndefined();
    });

    it('should create instance with DateTimeParts', () => {
      const parts: DateTimeParts = {
        year: 2025,
        month: 1,
        day: 15,
        hour: 14,
        minute: 30,
        second: 45,
        fractionalSecond: 500,
        timeZone: 'America/New_York',
        timeZoneOffset: '-05:00',
        secondsTimestamp: 1737034245,
        millisecondsTimestamp: 1737034245500,
        nanosecondsTimestamp: BigInt('1737034245500000000')
      };

      const dtv = new DateTimeValue(parts);
      expect(dtv.year).toBe(2025);
      expect(dtv.month).toBe(1);
      expect(dtv.day).toBe(15);
      expect(dtv.hour).toBe(14);
      expect(dtv.minute).toBe(30);
      expect(dtv.second).toBe(45);
      expect(dtv.fractionalSecond).toBe(500);
      expect(dtv.timeZone).toBe('America/New_York');
      expect(dtv.timeZoneOffset).toBe('-05:00');
      expect(dtv.secondsTimestamp).toBe(1737034245);
      expect(dtv.millisecondsTimestamp).toBe(1737034245500);
      expect(dtv.nanosecondsTimestamp).toBe(BigInt('1737034245500000000'));
    });

    it('should create instance with partial DateTimeParts', () => {
      const parts: DateTimeParts = {
        year: 2025,
        month: 1,
        day: 15
      };

      const dtv = new DateTimeValue(parts);
      expect(dtv.year).toBe(2025);
      expect(dtv.month).toBe(1);
      expect(dtv.day).toBe(15);
      expect(dtv.hour).toBeUndefined();
      expect(dtv.minute).toBeUndefined();
      expect(dtv.second).toBeUndefined();
    });

    it('should copy from another DateTimeValue instance', () => {
      const originalParts: DateTimeParts = {
        year: 2025,
        month: 1,
        day: 15,
        hour: 14,
        minute: 30,
        second: 45
      };

      const original = new DateTimeValue(originalParts);
      const copy = new DateTimeValue(original);

      expect(copy.year).toBe(2025);
      expect(copy.month).toBe(1);
      expect(copy.day).toBe(15);
      expect(copy.hour).toBe(14);
      expect(copy.minute).toBe(30);
      expect(copy.second).toBe(45);
    });

    it('should copy resolvedParts and parsedParts from another DateTimeValue', () => {
      const original = new DateTimeValue();
      // Manually set private properties for testing
      Object.defineProperty(original, 'resolvedParts', {
        value: { era: 1, dayPeriod: 0 },
        writable: true,
        configurable: true,
        enumerable: false,
      });
      Object.defineProperty(original, 'parsedParts', {
        value: { year: '2025', month: '01' },
        writable: true,
        configurable: true,
        enumerable: false,
      });

      const copy = new DateTimeValue(original);
      expect(copy.getEra()).toBe(1);
      expect(copy.getDayPeriod()).toBe(0);
    });
  });

  describe('Getters', () => {
    let dtv: DateTimeValue;

    beforeEach(() => {
      dtv = new DateTimeValue();
    });

    it('should return undefined for unset properties', () => {
      expect(dtv.year).toBeUndefined();
      expect(dtv.month).toBeUndefined();
      expect(dtv.day).toBeUndefined();
      expect(dtv.hour).toBeUndefined();
      expect(dtv.minute).toBeUndefined();
      expect(dtv.second).toBeUndefined();
      expect(dtv.fractionalSecond).toBeUndefined();
      expect(dtv.timeZone).toBeUndefined();
      expect(dtv.timeZoneOffset).toBeUndefined();
      expect(dtv.secondsTimestamp).toBeUndefined();
      expect(dtv.millisecondsTimestamp).toBeUndefined();
      expect(dtv.nanosecondsTimestamp).toBeUndefined();
    });

    it('should return set values', () => {
      const parts: DateTimeParts = {
        year: 2025,
        month: 1,
        day: 15,
        hour: 14,
        minute: 30,
        second: 45,
        fractionalSecond: 500,
        timeZone: 'America/New_York',
        timeZoneOffset: '-05:00',
        secondsTimestamp: 1737034245,
        millisecondsTimestamp: 1737034245500,
        nanosecondsTimestamp: BigInt('1737034245500000000')
      };

      dtv.set(parts);

      expect(dtv.year).toBe(2025);
      expect(dtv.month).toBe(1);
      expect(dtv.day).toBe(15);
      expect(dtv.hour).toBe(14);
      expect(dtv.minute).toBe(30);
      expect(dtv.second).toBe(45);
      expect(dtv.fractionalSecond).toBe(500);
      expect(dtv.timeZone).toBe('America/New_York');
      expect(dtv.timeZoneOffset).toBe('-05:00');
      expect(dtv.secondsTimestamp).toBe(1737034245);
      expect(dtv.millisecondsTimestamp).toBe(1737034245500);
      expect(dtv.nanosecondsTimestamp).toBe(BigInt('1737034245500000000'));
    });
  });

  describe('getEra()', () => {
    it('should return 1 for positive year', () => {
      const dtv = new DateTimeValue({ year: 2025 });
      expect(dtv.getEra()).toBe(1);
    });

    it('should return 0 for negative year', () => {
      const dtv = new DateTimeValue({ year: -2025 });
      expect(dtv.getEra()).toBe(0);
    });

    it('should return undefined when year is undefined', () => {
      const dtv = new DateTimeValue();
      expect(dtv.getEra()).toBeUndefined();
    });

    it('should return resolvedParts era when year is undefined', () => {
      const dtv = new DateTimeValue();
      Object.defineProperty(dtv, 'resolvedParts', {
        value: { era: 1 },
        writable: true,
        configurable: true,
        enumerable: false,
      });
      expect(dtv.getEra()).toBe(1);
    });

    it('should prioritize year over resolvedParts era', () => {
      const dtv = new DateTimeValue({ year: -2025 });
      Object.defineProperty(dtv, 'resolvedParts', {
        value: { era: 1 },
        writable: true,
        configurable: true,
        enumerable: false,
      });
      expect(dtv.getEra()).toBe(0);
    });
  });

  describe('getDayPeriod()', () => {
    it('should return 0 for hour < 12', () => {
      const dtv = new DateTimeValue({ hour: 11 });
      expect(dtv.getDayPeriod()).toBe(0);
    });

    it('should return 1 for hour >= 12', () => {
      const dtv = new DateTimeValue({ hour: 12 });
      expect(dtv.getDayPeriod()).toBe(1);
    });

    it('should return 1 for hour > 12', () => {
      const dtv = new DateTimeValue({ hour: 15 });
      expect(dtv.getDayPeriod()).toBe(1);
    });

    it('should return undefined when hour is undefined', () => {
      const dtv = new DateTimeValue();
      expect(dtv.getDayPeriod()).toBeUndefined();
    });

    it('should return resolvedParts dayPeriod when hour is undefined', () => {
      const dtv = new DateTimeValue();
      Object.defineProperty(dtv, 'resolvedParts', {
        value: { dayPeriod: 1 },
        writable: true,
        configurable: true,
        enumerable: false,
      });
      expect(dtv.getDayPeriod()).toBe(1);
    });

    it('should prioritize hour over resolvedParts dayPeriod', () => {
      const dtv = new DateTimeValue({ hour: 8 });
      Object.defineProperty(dtv, 'resolvedParts', {
        value: { dayPeriod: 1 },
        writable: true,
        configurable: true,
        enumerable: false,
      });
      expect(dtv.getDayPeriod()).toBe(0);
    });
  });

  describe('set()', () => {
    let dtv: DateTimeValue;

    beforeEach(() => {
      dtv = new DateTimeValue();
    });

    it('should set new parts', () => {
      const parts: DateTimeParts = {
        year: 2025,
        month: 1,
        day: 15
      };

      dtv.set(parts);
      expect(dtv.year).toBe(2025);
      expect(dtv.month).toBe(1);
      expect(dtv.day).toBe(15);
    });

    it('should merge with existing parts', () => {
      dtv.set({ year: 2025, month: 1 });
      dtv.set({ day: 15, hour: 14 });

      expect(dtv.year).toBe(2025);
      expect(dtv.month).toBe(1);
      expect(dtv.day).toBe(15);
      expect(dtv.hour).toBe(14);
    });

    it('should overwrite existing parts', () => {
      dtv.set({ year: 2025, month: 1 });
      dtv.set({ year: 2026 });

      expect(dtv.year).toBe(2026);
      expect(dtv.month).toBe(1);
    });

    it('should throw InvalidDayOfMonth for invalid day', () => {
      expect(() => {
        dtv.set({ year: 2025, month: 2, day: 30 }); // February 30th
      }).toThrow(InvalidDayOfMonth);
    });

    it('should throw InvalidWeekdayError for invalid weekday', () => {
      expect(() => {
        dtv.set({ year: 2025, month: 1, day: 15, weekday: 8 }); // Invalid weekday
      }).toThrow(InvalidWeekdayError);
    });

    it('should throw InvalidTimeZoneError for invalid timezone', () => {
      expect(() => {
        dtv.set({ timeZone: 'Invalid/Timezone' });
      }).toThrow(InvalidTimeZoneError);
    });

    it('should throw InvalidTimeZoneOffsetError for invalid offset', () => {
      // Skip this test if Temporal is not available as it won't validate offsets
      if (!require('@agape/temporal').hasTemporal()) {
        expect(() => {
          dtv.set({ timeZone: 'America/New_York', timeZoneOffset: 'Invalid' });
        }).not.toThrow(); // Should not throw when Temporal is not available
      } else {
        expect(() => {
          dtv.set({ timeZone: 'America/New_York', timeZoneOffset: 'Invalid' });
        }).toThrow(InvalidTimeZoneOffsetError);
      }
    });
  });

  describe('fromParsed()', () => {
    it('should create DateTimeValue from parsed parts', () => {
      const options: PopulatedDateTimePatternOptions = {
        locale: 'en-US',
        case: 'lowercase',
        elastic: false,
        flexible: false,
        limitRange: false,
        unicode: false
      };

      const parsedParts: ParsedDateTimeParts = {
        calendarYear: '2025',
        month: '01',
        day: '15',
        hour: '14',
        minute: '30',
        second: '45',
        weekdayLocal: 'Wednesday'
      };

      const dtv = DateTimeValue.fromParsed(options, parsedParts);

      expect(dtv.year).toBe(2025);
      expect(dtv.month).toBe(1);
      expect(dtv.day).toBe(15);
      expect(dtv.hour).toBe(14);
      expect(dtv.minute).toBe(30);
      expect(dtv.second).toBe(45);
    });

    it('should set resolvedParts and parsedParts', () => {
      const options: PopulatedDateTimePatternOptions = {
        locale: 'en-US',
        case: 'lowercase',
        elastic: false,
        flexible: false,
        limitRange: false,
        unicode: false
      };

      const parsedParts: ParsedDateTimeParts = {
        calendarYear: '2025',
        month: '01',
        weekdayLocal: 'Wednesday'
      };

      const dtv = DateTimeValue.fromParsed(options, parsedParts);

      // Access private properties for testing
      const resolvedParts = (dtv as any).resolvedParts;
      const parsedPartsStored = (dtv as any).parsedParts;

      expect(resolvedParts).toBeDefined();
      expect(parsedPartsStored).toBeDefined();
      expect(parsedPartsStored.calendarYear).toBe('2025');
      expect(parsedPartsStored.month).toBe('01');
    });
  });

  describe('Property Enumerability', () => {
    it('should provide toParts() method for spread operator usage', () => {
      const dtv = new DateTimeValue({
        year: 2025,
        month: 1,
        day: 15,
        hour: 14,
        minute: 30,
        second: 45,
        fractionalSecond: 500,
        timeZone: 'America/New_York',
        timeZoneOffset: '-05:00',
        secondsTimestamp: 1737034245,
        millisecondsTimestamp: 1737034245500,
        nanosecondsTimestamp: BigInt('1737034245500000000')
      });

      const parts = dtv.toParts();
      const spread: DateTimeParts = {...parts};

      // Test that properties are accessible via toParts() method
      expect(spread.year).toBe(2025);
      expect(spread.month).toBe(1);
      expect(spread.day).toBe(15);
      expect(spread.hour).toBe(14);
      expect(spread.minute).toBe(30);
      expect(spread.second).toBe(45);
      expect(spread.fractionalSecond).toBe(500);
      expect(spread.timeZone).toBe('America/New_York');
      expect(spread.timeZoneOffset).toBe('-05:00');
      expect(spread.secondsTimestamp).toBe(1737034245);
      expect(spread.millisecondsTimestamp).toBe(1737034245500);
      expect(spread.nanosecondsTimestamp).toBe(BigInt('1737034245500000000'));
    });

    it('should not expose private properties through toParts()', () => {
      const dtv = new DateTimeValue({ year: 2025 });
      const parts = dtv.toParts();

      // The private properties should not be in the returned parts
      expect(parts).not.toHaveProperty('parts');
      expect(parts).not.toHaveProperty('resolvedParts');
      expect(parts).not.toHaveProperty('parsedParts');

      // Only the actual DateTimeParts should be present
      expect(parts.year).toBe(2025);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values', () => {
      const dtv = new DateTimeValue({
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        fractionalSecond: 0
      });

      expect(dtv.year).toBe(0);
      expect(dtv.month).toBe(0);
      expect(dtv.day).toBe(0);
      expect(dtv.hour).toBe(0);
      expect(dtv.minute).toBe(0);
      expect(dtv.second).toBe(0);
      expect(dtv.fractionalSecond).toBe(0);
    });

    it('should handle negative year for era calculation', () => {
      const dtv = new DateTimeValue({ year: -1 });
      expect(dtv.getEra()).toBe(0);
    });

    it('should handle hour 0 for day period calculation', () => {
      const dtv = new DateTimeValue({ hour: 0 });
      expect(dtv.getDayPeriod()).toBe(0);
    });

    it('should handle hour 23 for day period calculation', () => {
      const dtv = new DateTimeValue({ hour: 23 });
      expect(dtv.getDayPeriod()).toBe(1);
    });

    it('should handle bigint nanoseconds timestamp', () => {
      const bigintValue = BigInt('1737034245500000000');
      const dtv = new DateTimeValue({ nanosecondsTimestamp: bigintValue });
      expect(dtv.nanosecondsTimestamp).toBe(bigintValue);
      expect(typeof dtv.nanosecondsTimestamp).toBe('bigint');
    });
  });

  describe('Validation Integration', () => {
    it('should validate day of month correctly', () => {
      const dtv = new DateTimeValue();

      // Valid dates
      expect(() => dtv.set({ year: 2025, month: 1, day: 31 })).not.toThrow();
      expect(() => dtv.set({ year: 2025, month: 2, day: 28 })).not.toThrow();
      expect(() => dtv.set({ year: 2024, month: 2, day: 29 })).not.toThrow(); // Leap year

      // Invalid dates
      expect(() => dtv.set({ year: 2025, month: 2, day: 29 })).toThrow(InvalidDayOfMonth);
      expect(() => dtv.set({ year: 2025, month: 4, day: 31 })).toThrow(InvalidDayOfMonth);
    });

    it('should validate weekday correctly', () => {
      const dtv = new DateTimeValue();

      // Valid weekdays (1-7) - need year, month, day for validation
      // January 15, 2025 is a Wednesday (3)
      expect(() => dtv.set({ year: 2025, month: 1, day: 15, weekday: 3 })).not.toThrow(); // Wednesday

      // Test with a Sunday - January 12, 2025 is a Sunday (7)
      expect(() => dtv.set({ year: 2025, month: 1, day: 12, weekday: 7 })).not.toThrow(); // Sunday

      // Invalid weekdays - need year, month, day for validation
      // Note: weekday 0 is falsy so it won't trigger validation
      expect(() => dtv.set({ year: 2025, month: 1, day: 15, weekday: 1 })).toThrow(InvalidWeekdayError); // Should be 3 (Wednesday)
      expect(() => dtv.set({ year: 2025, month: 1, day: 15, weekday: 8 })).toThrow(InvalidWeekdayError);

      // Weekday alone should not trigger validation (no year/month/day)
      expect(() => dtv.set({ weekday: 0 })).not.toThrow();
      // Note: weekday 8 is truthy so it will trigger validation, but since there's no year/month/day, it should pass
      expect(() => dtv.set({ weekday: 8 })).toThrow();

      // Test with a fresh instance to ensure no existing parts
      const freshDtv = new DateTimeValue();
      expect(() => freshDtv.set({ weekday: 8 })).toThrow();
    });
  });

  describe('Temporal Conversion Methods', () => {
    beforeEach(() => {
      setTemporal(TemporalPolyfill);
    });

    afterEach(() => {
      setTemporal(null);
    });

    it('should have all temporal conversion methods', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15, hour: 14, minute: 30, second: 45 });
      
      expect(typeof dtv.toPlainDate).toBe('function');
      expect(typeof dtv.toPlainTime).toBe('function');
      expect(typeof dtv.toPlainDateTime).toBe('function');
      expect(typeof dtv.toPlainYearMonth).toBe('function');
      expect(typeof dtv.toPlainMonthDay).toBe('function');
      expect(typeof dtv.toZonedDateTime).toBe('function');
      expect(typeof dtv.toInstant).toBe('function');
      expect(typeof dtv.toTimeZone).toBe('function');
      expect(typeof dtv.toDate).toBe('function');
    });

    it('should convert to Temporal.PlainDate', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15 });
      const plainDate = dtv.toPlainDate();
      expect(plainDate.year).toBe(2025);
      expect(plainDate.month).toBe(1);
      expect(plainDate.day).toBe(15);
    });

    it('should convert to Temporal.PlainTime', () => {
      const dtv = new DateTimeValue({ hour: 14, minute: 30, second: 45 });
      const plainTime = dtv.toPlainTime();
      expect(plainTime.hour).toBe(14);
      expect(plainTime.minute).toBe(30);
      expect(plainTime.second).toBe(45);
    });

    it('should convert to Temporal.PlainDateTime', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15, hour: 14, minute: 30, second: 45 });
      const plainDateTime = dtv.toPlainDateTime();
      expect(plainDateTime.year).toBe(2025);
      expect(plainDateTime.month).toBe(1);
      expect(plainDateTime.day).toBe(15);
      expect(plainDateTime.hour).toBe(14);
      expect(plainDateTime.minute).toBe(30);
      expect(plainDateTime.second).toBe(45);
    });

    it('should convert to Temporal.ZonedDateTime', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15, hour: 14, minute: 30, second: 45 });
      const zonedDateTime = dtv.toZonedDateTime({ timeZone: 'UTC' });
      expect(zonedDateTime.year).toBe(2025);
      expect(zonedDateTime.month).toBe(1);
      expect(zonedDateTime.day).toBe(15);
      expect(zonedDateTime.hour).toBe(14);
      expect(zonedDateTime.minute).toBe(30);
      expect(zonedDateTime.second).toBe(45);
      expect(zonedDateTime.timeZoneId).toBe('UTC');
    });

    it('should convert to Temporal.Instant', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15, hour: 14, minute: 30, second: 45 });
      const instant = dtv.toInstant({ timeZone: 'UTC' });
      expect(instant).toBeDefined();
      expect(typeof instant.epochNanoseconds).toBe('bigint');
    });

    it('should convert to Temporal.TimeZone', () => {
      const dtv = new DateTimeValue({ timeZone: 'America/New_York' });
      const timeZone = dtv.toTimeZone();
      expect(timeZone.id).toBe('America/New_York');
    });

    it('should convert to Temporal.TimeZone with options', () => {
      const dtv = new DateTimeValue({ timeZone: 'America/New_York' });
      const timeZone = dtv.toTimeZone({ timeZone: 'Europe/London' });
      expect(timeZone.id).toBe('Europe/London');
    });

    it('should throw error when no timeZone available for Temporal.TimeZone', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15 });
      expect(() => dtv.toTimeZone()).toThrow('Cannot create Temporal.TimeZone, timeZone is required');
    });

    it('should use default timeZone when fill strategy provided', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15 });
      const timeZone = dtv.toTimeZone({ fill: 'current' });
      expect(timeZone).toBeDefined();
      expect(timeZone.id).toBeDefined();
    });

    it('should convert to Date object with UTC timezone', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15, hour: 14, minute: 30, second: 45 });
      const date = dtv.toDate({ timeZone: 'UTC' });
      expect(date).toBeInstanceOf(Date);
      expect(date.getUTCFullYear()).toBe(2025);
      expect(date.getUTCMonth()).toBe(0); // January is 0
      expect(date.getUTCDate()).toBe(15);
      expect(date.getUTCHours()).toBe(14);
      expect(date.getUTCMinutes()).toBe(30);
      expect(date.getUTCSeconds()).toBe(45);
    });

    it('should convert to Date object with system timezone', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1, day: 15, hour: 14, minute: 30, second: 45 });
      const date = dtv.toDate();
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2025);
      expect(date.getMonth()).toBe(0); // January is 0
      expect(date.getDate()).toBe(15);
      expect(date.getHours()).toBe(14);
      expect(date.getMinutes()).toBe(30);
      expect(date.getSeconds()).toBe(45);
    });

    it('should convert to Date object with timezone offset', () => {
      const dtv = new DateTimeValue({ 
        year: 2025, 
        month: 1, 
        day: 15, 
        hour: 14, 
        minute: 30, 
        second: 45,
        timeZoneOffset: '-05:00'
      });
      const date = dtv.toDate();
      expect(date).toBeInstanceOf(Date);
      // The date should be adjusted for the -05:00 offset
      expect(date.getUTCFullYear()).toBe(2025);
      expect(date.getUTCMonth()).toBe(0);
      expect(date.getUTCDate()).toBe(15);
      expect(date.getUTCHours()).toBe(19); // 14 + 5 hours
      expect(date.getUTCMinutes()).toBe(30);
      expect(date.getUTCSeconds()).toBe(45);
    });

    it('should handle fractional seconds in Date conversion', () => {
      const dtv = new DateTimeValue({ 
        year: 2025, 
        month: 1, 
        day: 15, 
        hour: 14, 
        minute: 30, 
        second: 45,
        fractionalSecond: 0.123
      });
      const date = dtv.toDate({ timeZone: 'UTC' });
      expect(date).toBeInstanceOf(Date);
      expect(date.getUTCMilliseconds()).toBe(123);
    });

    it('should throw error when insufficient data for Date conversion', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1 });
      expect(() => dtv.toDate()).toThrow('Cannot create Date, insufficient data');
    });

    it('should use fill strategy when insufficient data', () => {
      const dtv = new DateTimeValue({ year: 2025, month: 1 });
      const date = dtv.toDate({ fill: 'current' });
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2025);
      expect(date.getMonth()).toBe(0);
    });

    it('should handle DST disambiguation with "earlier" option', () => {
      // Spring forward: 2:30 AM doesn't exist, should become 3:30 AM
      const dtv = new DateTimeValue({ 
        year: 2024, 
        month: 3, 
        day: 10, // DST transition day in US
        hour: 2, 
        minute: 30, 
        second: 0 
      });
      
      const zonedDateTime = dtv.toZonedDateTime({ 
        timeZone: 'America/New_York', 
        disambiguate: 'earlier' 
      });
      
      // The "earlier" option should give us the time before the DST transition
      // In spring forward, 2:30 AM EST becomes 3:30 AM EDT
      // So "earlier" should give us 1:30 AM EST (which is 2:30 AM EDT)
      expect(zonedDateTime.hour).toBe(1);
      expect(zonedDateTime.minute).toBe(30);
    });

    it('should handle DST disambiguation with "later" option', () => {
      // Fall back: 2:30 AM exists twice, should use the later one
      const dtv = new DateTimeValue({ 
        year: 2024, 
        month: 11, 
        day: 3, // DST transition day in US
        hour: 2, 
        minute: 30, 
        second: 0 
      });
      
      const zonedDateTime = dtv.toZonedDateTime({ 
        timeZone: 'America/New_York', 
        disambiguate: 'later' 
      });
      
      expect(zonedDateTime.hour).toBe(2);
      expect(zonedDateTime.minute).toBe(30);
    });

    it('should not use disambiguation when timeZoneOffset is provided', () => {
      const dtv = new DateTimeValue({ 
        year: 2024, 
        month: 3, 
        day: 10,
        hour: 2, 
        minute: 30, 
        second: 0,
        timeZoneOffset: '-05:00' // EST offset
      });
      
      const zonedDateTime = dtv.toZonedDateTime({ 
        timeZone: 'America/New_York', 
        disambiguate: 'earlier' 
      });
      
      // Should use the exact time with the provided offset, not disambiguate
      // The timeZoneOffset forces it to use EST, so 2:30 AM EST becomes 3:30 AM EDT
      expect(zonedDateTime.hour).toBe(3);
      expect(zonedDateTime.minute).toBe(30);
    });
  });
});
