import { DateValue } from './date-value';
import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
import { setTemporal, Temporal } from '@agape/temporal';

describe('DateValue', () => {
  describe('Constructor', () => {
    it('should create empty instance when no parts provided', () => {
      const dv = new DateValue();
      expect(dv.year).toBeUndefined();
      expect(dv.month).toBeUndefined();
      expect(dv.day).toBeUndefined();
    });

    it('should create instance with DateParts', () => {
      const dv = new DateValue({ year: 2025, month: 1, day: 15 });
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should copy from another DateValue instance', () => {
      const original = new DateValue({ year: 2025, month: 1, day: 15 });
      const copy = new DateValue(original);
      expect(copy.year).toBe(2025);
      expect(copy.month).toBe(1);
      expect(copy.day).toBe(15);
      expect(copy).not.toBe(original);
    });
  });

  describe('Getters', () => {
    it('should return undefined for unset properties', () => {
      const dv = new DateValue();
      expect(dv.year).toBeUndefined();
      expect(dv.month).toBeUndefined();
      expect(dv.day).toBeUndefined();
      expect(dv.weekday).toBeUndefined();
    });

    it('should return set values', () => {
      const dv = new DateValue({ year: 2025, month: 1, day: 15, weekday: 3 });
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
      expect(dv.weekday).toBe(3);
    });
  });

  describe('getEra()', () => {
    it('should return 1 for positive year', () => {
      const dv = new DateValue({ year: 2025 });
      expect(dv.getEra()).toBe(1);
    });

    it('should return 0 for negative year', () => {
      const dv = new DateValue({ year: -2025 });
      expect(dv.getEra()).toBe(0);
    });

    it('should return undefined when year is undefined', () => {
      const dv = new DateValue();
      expect(dv.getEra()).toBeUndefined();
    });
  });

  describe('set()', () => {
    it('should set new parts', () => {
      const dv = new DateValue();
      dv.set({ year: 2025, month: 1, day: 15 });
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should merge with existing parts', () => {
      const dv = new DateValue({ year: 2025 });
      dv.set({ month: 1, day: 15 });
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });
  });

  describe('toParts()', () => {
    it('should return copy of parts', () => {
      const dv = new DateValue({ year: 2025, month: 1, day: 15 });
      const parts = dv.toParts();
      expect(parts).toEqual({ year: 2025, month: 1, day: 15 });
      // Verify it's a copy by modifying it
      parts.year = 2026;
      expect(dv.year).toBe(2025); // Original should be unchanged
    });
  });

  describe('from() static method', () => {
    beforeEach(() => {
      setTemporal(TemporalPolyfill);
    });

    afterEach(() => {
      setTemporal(null);
    });

    it('should create from DateValue instance', () => {
      const original = new DateValue({ year: 2025, month: 1, day: 15 });
      const copy = DateValue.from(original);
      expect(copy.year).toBe(2025);
      expect(copy.month).toBe(1);
      expect(copy.day).toBe(15);
      expect(copy).not.toBe(original);
    });

    it('should create from DateParts object', () => {
      const parts = { year: 2025, month: 1, day: 15 };
      const dv = DateValue.from(parts);
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should create from Date object', () => {
      const date = new Date('2025-01-15T00:00:00Z');
      const dv = DateValue.from(date);
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should create from Temporal.PlainDate', () => {
      const plainDate = Temporal.PlainDate.from('2025-01-15');
      const dv = DateValue.from(plainDate);
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should create from Temporal.PlainYearMonth', () => {
      const plainYearMonth = Temporal.PlainYearMonth.from('2025-01');
      const dv = DateValue.from(plainYearMonth);
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
    });

    it('should create from Temporal.PlainMonthDay', () => {
      const plainMonthDay = Temporal.PlainMonthDay.from('01-15');
      const dv = DateValue.from(plainMonthDay);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should throw error for unsupported input', () => {
      expect(() => DateValue.from(null)).toThrow('Cannot create DateValue from input: null');
      expect(() => DateValue.from(123)).toThrow('Cannot create DateValue from input: 123');
    });
  });

  describe('from() string parsing', () => {
    it('should parse year only', () => {
      const dv = DateValue.from('2025');
      expect(dv.year).toBe(2025);
      expect(dv.month).toBeUndefined();
      expect(dv.day).toBeUndefined();
    });

    it('should parse year with sign', () => {
      const dv = DateValue.from('+2025');
      expect(dv.year).toBe(2025);
      
      const dvNeg = DateValue.from('-2025');
      expect(dvNeg.year).toBe(-2025);
    });

    it('should parse month-day', () => {
      const dv = DateValue.from('01-15');
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
      
      const dv2 = DateValue.from('12-25');
      expect(dv2.month).toBe(12);
      expect(dv2.day).toBe(25);
    });

    it('should parse year-month', () => {
      const dv = DateValue.from('2025-01');
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBeUndefined();
    });

    it('should parse date', () => {
      const dv = DateValue.from('2025-01-15');
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should handle non-padded values', () => {
      const dv = DateValue.from('2025-1-15');
      expect(dv.year).toBe(2025);
      expect(dv.month).toBe(1);
      expect(dv.day).toBe(15);
    });

    it('should throw error for invalid string', () => {
      expect(() => DateValue.from('invalid')).toThrow('Cannot parse date string: invalid');
    });
  });

  describe('Temporal conversion methods', () => {
    beforeEach(() => {
      setTemporal(TemporalPolyfill);
    });

    afterEach(() => {
      setTemporal(null);
    });

    it('should convert to Temporal.PlainDate', () => {
      const dv = new DateValue({ year: 2025, month: 1, day: 15 });
      const plainDate = dv.toPlainDate();
      expect(plainDate.year).toBe(2025);
      expect(plainDate.month).toBe(1);
      expect(plainDate.day).toBe(15);
    });

    it('should convert to Temporal.PlainYearMonth', () => {
      const dv = new DateValue({ year: 2025, month: 1 });
      const plainYearMonth = dv.toPlainYearMonth();
      expect(plainYearMonth.year).toBe(2025);
      expect(plainYearMonth.month).toBe(1);
    });

    it('should convert to Temporal.PlainMonthDay', () => {
      const dv = new DateValue({ month: 1, day: 15 });
      const plainMonthDay = dv.toPlainMonthDay();
      expect(plainMonthDay.monthCode).toBe('M01');
      expect(plainMonthDay.day).toBe(15);
    });

    it('should use fill strategy when insufficient data', () => {
      const dv = new DateValue({ year: 2025 });
      const plainDate = dv.toPlainDate({ fill: 'current' });
      expect(plainDate.year).toBe(2025);
      expect(plainDate.month).toBeDefined();
      expect(plainDate.day).toBeDefined();
    });

    it('should throw error when insufficient data', () => {
      const dv = new DateValue({ year: 2025 });
      expect(() => dv.toPlainDate()).toThrow('Cannot create Temporal.PlainDate, insufficient data');
    });
  });

  describe('toDate() method', () => {
    it('should convert to Date object', () => {
      const dv = new DateValue({ year: 2025, month: 1, day: 15 });
      const date = dv.toDate();
      expect(date).toBeInstanceOf(Date);
      expect(date.getUTCFullYear()).toBe(2025);
      expect(date.getUTCMonth()).toBe(0); // JavaScript months are 0-based
      expect(date.getUTCDate()).toBe(15);
    });

    it('should throw error when insufficient data', () => {
      const dv = new DateValue({ year: 2025 });
      expect(() => dv.toDate()).toThrow('Cannot create Date, insufficient data');
    });
  });
});
