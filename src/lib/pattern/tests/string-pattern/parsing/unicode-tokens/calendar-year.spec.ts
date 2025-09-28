import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - calendarYear', () => {
  describe('single year pattern (y)', () => {
    it('should parse single digit year', () => {
      const pattern = new DateTimePattern('y', { locale: 'en-US', unicode: true });
      const value = pattern.parse('1');
      expect(value.year).toBe(1);
    });
    it('should parse multi-digit year (elastic)', () => {
      const pattern = new DateTimePattern('y', { locale: 'en-US', unicode: true });
      const value = pattern.parse('123456');
      expect(value.year).toBe(123456);
    });
    it('should fail year 0', () => {
      const pattern = new DateTimePattern('y', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('0')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/dd/y', { locale: 'en-US', unicode: true });
      const value = pattern.parse('01/01/2025');
      expect(value.year).toBe(2025);
    });
    it('should normalize the year', () => {
      const pattern = new DateTimePattern('MM/dd/y', { locale: 'en-US', unicode: true });
      const value = pattern.parse('01/01/1');
      expect(value.year).toBe(1);
    });
  });

  describe('four digit year pattern (yyyy)', () => {
    it('should parse padded year', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('0001');
      expect(value.year).toBe(1);
    });
    it('should parse normal 4-digit year', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('2025');
      expect(value.year).toBe(2025);
    });
    it('should fail unpadded year', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('1')).toThrow();
    });
    it('should fail year 0', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('0000')).toThrow();
    });
    it('should be elastic by default', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('123456');
      expect(value.year).toBe(123456);
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/dd/yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('01/01/2025');
      expect(value.year).toBe(2025);
    });
    it('should normalize the year', () => {
      const pattern = new DateTimePattern('MM/dd/yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('01/01/0001');
      expect(value.year).toBe(1);
    });
  });

  describe('non-elastic four digit year pattern (yyyy)', () => {
    it('should parse exact 4-digit year', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', elastic: false, unicode: true });
      const value = pattern.parse('2025');
      expect(value.year).toBe(2025);
    });
    it('should parse padded year', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', elastic: false, unicode: true });
      const value = pattern.parse('0001');
      expect(value.year).toBe(1);
    });
    it('should fail unpadded year', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', elastic: false, unicode: true });
      expect(() => pattern.parse('1')).toThrow();
    });
    it('should fail year 0', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', elastic: false, unicode: true });
      expect(() => pattern.parse('0000')).toThrow();
    });
    it('should fail longer year (non-elastic)', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', elastic: false, unicode: true });
      expect(() => pattern.parse('123456')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/dd/yyyy', { locale: 'en-US', elastic: false, unicode: true });
      const value = pattern.parse('01/01/2025');
      expect(value.year).toBe(2025);
    });
    it('should normalize the year', () => {
      const pattern = new DateTimePattern('MM/dd/yyyy', { locale: 'en-US', elastic: false, unicode: true });
      const value = pattern.parse('01/01/0001');
      expect(value.year).toBe(1);
    });
  });

  describe('different locales', () => {
    it('should work with es-US locale', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'es-US', unicode: true });
      const value = pattern.parse('2025');
      expect(value.year).toBe(2025);
    });
    it('should work with ru-RU locale', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('2025');
      expect(value.year).toBe(2025);
    });
    it('should work with ja-JP locale', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('2025');
      expect(value.year).toBe(2025);
    });
    it('should work with de-DE locale', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('2025');
      expect(value.year).toBe(2025);
    });
    it('should work with fr-FR locale', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('2025');
      expect(value.year).toBe(2025);
    });
  });

  describe('edge cases', () => {
    it('should handle very large years', () => {
      const pattern = new DateTimePattern('y', { locale: 'en-US', unicode: true });
      const value = pattern.parse('999999');
      expect(value.year).toBe(999999);
    });
    it('should not handle negative years', () => {
      const pattern = new DateTimePattern('y', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('-2025')).toThrow();
    });
    it('should fail empty string', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('')).toThrow();
    });
    it('should fail non-numeric input', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('abcd')).toThrow();
    });
    it('should fail partial numeric input', () => {
      const pattern = new DateTimePattern('yyyy', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('20ab')).toThrow();
    });
  });
});
