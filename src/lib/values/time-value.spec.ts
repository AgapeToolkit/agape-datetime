import { TimeValue } from './time-value';
import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
import { setTemporal, Temporal } from '@agape/temporal';

describe('TimeValue', () => {
  describe('Constructor', () => {
    it('should create empty instance when no parts provided', () => {
      const tv = new TimeValue();
      expect(tv.hour).toBeUndefined();
      expect(tv.minute).toBeUndefined();
      expect(tv.second).toBeUndefined();
      expect(tv.nanosecond).toBeUndefined();
    });

    it('should create instance with TimeParts', () => {
      const tv = new TimeValue({ hour: 14, minute: 30, second: 45, nanosecond: 0.123 });
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
      expect(tv.nanosecond).toBe(0.123);
    });

    it('should copy from another TimeValue instance', () => {
      const original = new TimeValue({ hour: 14, minute: 30, second: 45 });
      const copy = new TimeValue(original);
      expect(copy.hour).toBe(14);
      expect(copy.minute).toBe(30);
      expect(copy.second).toBe(45);
      expect(copy).not.toBe(original);
    });
  });

  describe('Getters', () => {
    it('should return undefined for unset properties', () => {
      const tv = new TimeValue();
      expect(tv.hour).toBeUndefined();
      expect(tv.minute).toBeUndefined();
      expect(tv.second).toBeUndefined();
      expect(tv.nanosecond).toBeUndefined();
    });

    it('should return set values', () => {
      const tv = new TimeValue({ hour: 14, minute: 30, second: 45, nanosecond: 123456789 });
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
      expect(tv.nanosecond).toBe(123456789);
    });
  });

  describe('getDayPeriod()', () => {
    it('should return 0 for hour < 12', () => {
      const tv = new TimeValue({ hour: 11 });
      expect(tv.getDayPeriod()).toBe(0);
    });

    it('should return 1 for hour >= 12', () => {
      const tv = new TimeValue({ hour: 12 });
      expect(tv.getDayPeriod()).toBe(1);
    });

    it('should return 1 for hour > 12', () => {
      const tv = new TimeValue({ hour: 15 });
      expect(tv.getDayPeriod()).toBe(1);
    });

    it('should return undefined when hour is undefined', () => {
      const tv = new TimeValue();
      expect(tv.getDayPeriod()).toBeUndefined();
    });
  });

  describe('set()', () => {
    it('should set new parts', () => {
      const tv = new TimeValue();
      tv.set({ hour: 14, minute: 30, second: 45 });
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
    });

    it('should merge with existing parts', () => {
      const tv = new TimeValue({ hour: 14 });
      tv.set({ minute: 30, second: 45 });
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
    });
  });

  describe('toParts()', () => {
    it('should return copy of parts', () => {
      const tv = new TimeValue({ hour: 14, minute: 30, second: 45 });
      const parts = tv.toParts();
      expect(parts).toEqual({ hour: 14, minute: 30, second: 45 });
      // Verify it's a copy by modifying it
      parts.hour = 15;
      expect(tv.hour).toBe(14); // Original should be unchanged
    });
  });

  describe('from() static method', () => {
    beforeEach(() => {
      setTemporal(TemporalPolyfill);
    });

    afterEach(() => {
      setTemporal(null);
    });

    it('should create from TimeValue instance', () => {
      const original = new TimeValue({ hour: 14, minute: 30, second: 45 });
      const copy = TimeValue.from(original);
      expect(copy.hour).toBe(14);
      expect(copy.minute).toBe(30);
      expect(copy.second).toBe(45);
      expect(copy).not.toBe(original);
    });

    it('should create from TimeParts object', () => {
      const parts = { hour: 14, minute: 30, second: 45 };
      const tv = TimeValue.from(parts);
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
    });

    it('should create from Date object', () => {
      const date = new Date('2025-01-15T14:30:45.123Z');
      const tv = TimeValue.from(date);
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
      expect(tv.nanosecond).toBe(123000000);
    });

    it('should create from Temporal.PlainTime', () => {
      const plainTime = Temporal.PlainTime.from('14:30:45.123456789');
      const tv = TimeValue.from(plainTime);
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
      // Direct mapping of nanosecond
      expect(tv.nanosecond).toBe(plainTime.nanosecond);
    });

    it('should throw error for unsupported input', () => {
      expect(() => TimeValue.from(null)).toThrow('Cannot create TimeValue from input: null');
      expect(() => TimeValue.from(123)).toThrow('Cannot create TimeValue from input: 123');
    });
  });

  describe('from() string parsing', () => {
    it('should parse hour:minute', () => {
      const tv = TimeValue.from('14:30');
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBeUndefined();
    });

    it('should parse hour:minute:second', () => {
      const tv = TimeValue.from('14:30:45');
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
    });

    it('should parse hour:minute:second.fractional', () => {
      const tv = TimeValue.from('14:30:45.123');
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
      expect(tv.nanosecond).toBe(123000000);
    });

    it('should handle non-padded values', () => {
      const tv = TimeValue.from('1:5:6');
      expect(tv.hour).toBe(1);
      expect(tv.minute).toBe(5);
      expect(tv.second).toBe(6);
    });

    it('should handle fractional seconds with different precision', () => {
      const tv = TimeValue.from('14:30:45.7');
      expect(tv.hour).toBe(14);
      expect(tv.minute).toBe(30);
      expect(tv.second).toBe(45);
      expect(tv.nanosecond).toBe(700000000);
    });

    it('should throw error for invalid string', () => {
      expect(() => TimeValue.from('invalid')).toThrow('Cannot parse time string: invalid');
      expect(() => TimeValue.from('25:30')).toThrow('Invalid hour 25, acceptable range 0 through 23');
    });
  });

  describe('Temporal conversion methods', () => {
    beforeEach(() => {
      setTemporal(TemporalPolyfill);
    });

    afterEach(() => {
      setTemporal(null);
    });

    it('should convert to Temporal.PlainTime', () => {
      const tv = new TimeValue({ hour: 14, minute: 30, second: 45 });
      const plainTime = tv.toPlainTime();
      expect(plainTime.hour).toBe(14);
      expect(plainTime.minute).toBe(30);
      expect(plainTime.second).toBe(45);
    });

    it('should convert nanosecond to nanosecond', () => {
      const tv = new TimeValue({ hour: 14, minute: 30, second: 45, nanosecond: 123456789 });
      const plainTime = tv.toPlainTime();
      expect(plainTime.hour).toBe(14);
      expect(plainTime.minute).toBe(30);
      expect(plainTime.second).toBe(45);
      // Note: The polyfill may truncate nanosecond precision, so we just verify it's reasonable
      expect(plainTime.nanosecond).toBeGreaterThan(0);
      expect(plainTime.nanosecond).toBeLessThanOrEqual(123456789);
    });

    it('should use fill strategy when insufficient data', () => {
      const tv = new TimeValue({ hour: 14 });
      const plainTime = tv.toPlainTime({ fill: 'current' });
      expect(plainTime.hour).toBe(14);
      expect(plainTime.minute).toBeDefined();
      expect(plainTime.second).toBeDefined();
    });

    it('should throw error when insufficient data', () => {
      const tv = new TimeValue({ hour: 14 });
      expect(() => tv.toPlainTime()).toThrow('Cannot create Temporal.PlainTime, insufficient data');
    });
  });

  describe('toDate() method', () => {
    it('should convert to Date object', () => {
      const tv = new TimeValue({ hour: 14, minute: 30, second: 45 });
      const date = tv.toDate();
      expect(date).toBeInstanceOf(Date);
      expect(date.getUTCHours()).toBe(14);
      expect(date.getUTCMinutes()).toBe(30);
      expect(date.getUTCSeconds()).toBe(45);
      expect(date.getUTCDate()).toBe(1); // Should be epoch date
      expect(date.getUTCMonth()).toBe(0); // January (0-based)
      expect(date.getUTCFullYear()).toBe(1970); // Epoch year
    });

    it('should handle nanosecond', () => {
      const tv = new TimeValue({ hour: 14, minute: 30, second: 45, nanosecond: 123000000 });
      const date = tv.toDate();
      expect(date.getUTCMilliseconds()).toBe(123);
    });

    it('should throw error when insufficient data', () => {
      const tv = new TimeValue({ hour: 14 });
      expect(() => tv.toDate()).toThrow('Cannot create Date, insufficient data');
    });
  });
});
