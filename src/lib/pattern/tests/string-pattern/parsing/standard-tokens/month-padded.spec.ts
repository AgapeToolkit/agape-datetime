import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - monthPadded', () => {
  describe('padded month pattern (MM)', () => {
    it('should fail single digit month', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('1')).toThrow();
    });
    it('should parse padded month', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      const value = pattern.parse('01');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse month 12', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      const value = pattern.parse('12');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail month 13', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('13')).toThrow();
    });
    it('should fail month 00', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('00')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY', { locale: 'en-US' });
      const value = pattern.parse('01/01/2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.year).toBe(2025);
    });
    it('should fail invalid month in date', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY', { locale: 'en-US' });
      expect(() => pattern.parse('13/01/2025')).toThrow();
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY', { locale: 'en-US' });
      const value = pattern.parse('01/01/2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('non-flexible padded month pattern (MM)', () => {
    it('should parse padded month', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US', flexible: false });
      const value = pattern.parse('01');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse month 12', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US', flexible: false });
      const value = pattern.parse('12');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail month 13', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US', flexible: false });
      expect(() => pattern.parse('13')).toThrow();
    });
    it('should fail month 00', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US', flexible: false });
      expect(() => pattern.parse('00')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY', { locale: 'en-US', flexible: false });
      const value = pattern.parse('01/01/2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.year).toBe(2025);
    });
    it('should fail invalid month in date', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY', { locale: 'en-US', flexible: false });
      expect(() => pattern.parse('13/01/2025')).toThrow();
    });
  });

  describe('different locales', () => {
    it('should work with es-US locale', () => {
      const pattern = new DateTimePattern('MM', { locale: 'es-US' });
      const value = pattern.parse('01');
      expect(value.normalized.month).toBe(1);
    });
    it('should work with ru-RU locale', () => {
      const pattern = new DateTimePattern('MM', { locale: 'ru-RU' });
      const value = pattern.parse('01');
      expect(value.normalized.month).toBe(1);
    });
    it('should work with ja-JP locale', () => {
      const pattern = new DateTimePattern('MM', { locale: 'ja-JP' });
      const value = pattern.parse('01');
      expect(value.normalized.month).toBe(1);
    });
    it('should work with de-DE locale', () => {
      const pattern = new DateTimePattern('MM', { locale: 'de-DE' });
      const value = pattern.parse('01');
      expect(value.normalized.month).toBe(1);
    });
    it('should work with fr-FR locale', () => {
      const pattern = new DateTimePattern('MM', { locale: 'fr-FR' });
      const value = pattern.parse('01');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should fail empty string', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('')).toThrow();
    });
    it('should fail non-numeric input', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('ab')).toThrow();
    });
    it('should fail partial numeric input', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('1a')).toThrow();
    });
    it('should fail negative month', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('-01')).toThrow();
    });
    it('should fail very large month', () => {
      const pattern = new DateTimePattern('MM', { locale: 'en-US' });
      expect(() => pattern.parse('99')).toThrow();
    });
  });
});
