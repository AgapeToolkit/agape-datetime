import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - isoYear', () => {
  describe('single year pattern (u)', () => {
    it('should parse single digit year', () => {
      const pattern = new DateTimePattern('u', { locale: 'en-US', unicode: true });
      const value = pattern.parse('1');
      expect(value.normalized.year).toBe(1);
    });
    it('should parse year 0', () => {
      const pattern = new DateTimePattern('u', { locale: 'en-US', unicode: true });
      const value = pattern.parse('0');
      expect(value.normalized.year).toBe(0);
    });
    it('should parse multi-digit year (elastic)', () => {
      const pattern = new DateTimePattern('u', { locale: 'en-US', unicode: true });
      const value = pattern.parse('123456');
      expect(value.normalized.year).toBe(123456);
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/dd/u', { locale: 'en-US', unicode: true });
      const value = pattern.parse('01/01/2025');
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the year', () => {
      const pattern = new DateTimePattern('MM/dd/u', { locale: 'en-US', unicode: true });
      const value = pattern.parse('01/01/1');
      expect(value.normalized.year).toBe(1);
    });
  });

  describe('padded year pattern (uuuu)', () => {
    it('should parse padded year', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', unicode: true });
      const value = pattern.parse('0001');
      expect(value.normalized.year).toBe(1);
    });
    it('should parse year 0', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', unicode: true });
      const value = pattern.parse('0000');
      expect(value.normalized.year).toBe(0);
    });
    it('should fail if not padded', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('1')).toThrow();
    });
    it('should fail with + sign', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('+0001')).toThrow();
    });
    it('should fail with - sign', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('-0001')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/dd/uuuu', { locale: 'en-US', unicode: true });
      const value = pattern.parse('01/01/2025');
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('non-elastic padded year pattern (uuuu)', () => {
    it('should parse padded year', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', elastic: false, unicode: true });
      const value = pattern.parse('0001');
      expect(value.normalized.year).toBe(1);
    });
    it('should fail if not padded', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', elastic: false, unicode: true });
      expect(() => pattern.parse('1')).toThrow();
    });
    it('should fail with too many digits', () => {
      const pattern = new DateTimePattern('uuuu', { locale: 'en-US', elastic: false, unicode: true });
      expect(() => pattern.parse('123456')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/dd/uuuu', { locale: 'en-US', elastic: false, unicode: true });
      const value = pattern.parse('01/01/2025');
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('different locales', () => {
    it('should work with es-US locale', () => {
      const pattern = new DateTimePattern('u', { locale: 'es-US', unicode: true });
      const value = pattern.parse('1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with ru-RU locale', () => {
      const pattern = new DateTimePattern('u', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with ja-JP locale', () => {
      const pattern = new DateTimePattern('u', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with de-DE locale', () => {
      const pattern = new DateTimePattern('u', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with fr-FR locale', () => {
      const pattern = new DateTimePattern('u', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('1');
      expect(value.normalized.year).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should fail empty string', () => {
      const pattern = new DateTimePattern('u', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('')).toThrow();
    });
    it('should fail non-numeric input', () => {
      const pattern = new DateTimePattern('u', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('ab')).toThrow();
    });
    it('should fail partial numeric input', () => {
      const pattern = new DateTimePattern('u', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('1a')).toThrow();
    });
    it('should fail negative year', () => {
      const pattern = new DateTimePattern('u', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('-1')).toThrow();
    });
  });
});
