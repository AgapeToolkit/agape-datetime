import { DateTimePattern } from '../../../datetime-pattern';

describe('DateTimePattern - signedIsoYear', () => {
  describe('single year pattern (+Y)', () => {
    it('should parse positive single digit year', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      const value = pattern.parse('+1');
      expect(value.normalized.year).toBe(1);
    });
    it('should parse year 0', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      const value = pattern.parse('+0');
      expect(value.normalized.year).toBe(0);
    });
    it('should parse negative year', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      const value = pattern.parse('-1');
      expect(value.normalized.year).toBe(-1);
    });
    it('should parse multi-digit year (elastic)', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      const value = pattern.parse('+123456');
      expect(value.normalized.year).toBe(123456);
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/DD/+Y', { locale: 'en-US' });
      const value = pattern.parse('01/01/+2025');
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the year', () => {
      const pattern = new DateTimePattern('MM/DD/+Y', { locale: 'en-US' });
      const value = pattern.parse('01/01/+1');
      expect(value.normalized.year).toBe(1);
    });
  });

  describe('padded year pattern (+YYYYYY)', () => {
    it('should parse padded positive year', () => {
      const pattern = new DateTimePattern('+YYYYYY', { locale: 'en-US' });
      const value = pattern.parse('+002025');
      expect(value.normalized.year).toBe(2025);
    });
    it('should parse padded year 0', () => {
      const pattern = new DateTimePattern('+YYYYYY', { locale: 'en-US' });
      const value = pattern.parse('+000000');
      expect(value.normalized.year).toBe(0);
    });
    it('should parse padded negative year', () => {
      const pattern = new DateTimePattern('+YYYYYY', { locale: 'en-US' });
      const value = pattern.parse('-002025');
      expect(value.normalized.year).toBe(-2025);
    });
    it('should fail if not padded', () => {
      const pattern = new DateTimePattern('+YYYYYY', { locale: 'en-US' });
      expect(() => pattern.parse('+1')).toThrow();
    });
    it('should fail without + sign', () => {
      const pattern = new DateTimePattern('+YYYYYY', { locale: 'en-US' });
      expect(() => pattern.parse('000001')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/DD/+YYYYYY', { locale: 'en-US' });
      const value = pattern.parse('01/01/+002025');
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('± sign pattern (±YYYY)', () => {
    it('should parse positive year with + sign', () => {
      const pattern = new DateTimePattern('±YYYY', { locale: 'en-US' });
      const value = pattern.parse('+0001');
      expect(value.normalized.year).toBe(1);
    });
    it('should parse negative year with - sign', () => {
      const pattern = new DateTimePattern('±YYYY', { locale: 'en-US' });
      const value = pattern.parse('-0001');
      expect(value.normalized.year).toBe(-1);
    });
    it('should parse year 0 with + sign', () => {
      const pattern = new DateTimePattern('±YYYY', { locale: 'en-US' });
      const value = pattern.parse('+0000');
      expect(value.normalized.year).toBe(0);
    });
    it('should parse year 0 with - sign', () => {
      const pattern = new DateTimePattern('±YYYY', { locale: 'en-US' });
      const value = pattern.parse('-0000');
      expect(value.normalized.year).toBe(0);
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/DD/±YYYY', { locale: 'en-US' });
      const value = pattern.parse('01/01/+2025');
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('non-elastic padded year pattern (+YYYY)', () => {
    it('should parse padded year', () => {
      const pattern = new DateTimePattern('+YYYY', { locale: 'en-US', elastic: false });
      const value = pattern.parse('+0001');
      expect(value.normalized.year).toBe(1);
    });
    it('should fail if not padded', () => {
      const pattern = new DateTimePattern('+YYYY', { locale: 'en-US', elastic: false });
      expect(() => pattern.parse('+1')).toThrow();
    });
    it('should fail with too many digits', () => {
      const pattern = new DateTimePattern('+YYYY', { locale: 'en-US', elastic: false });
      expect(() => pattern.parse('+123456')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MM/DD/+YYYY', { locale: 'en-US', elastic: false });
      const value = pattern.parse('01/01/+2025');
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('different locales', () => {
    it('should work with es-US locale', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'es-US' });
      const value = pattern.parse('+1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with ru-RU locale', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'ru-RU' });
      const value = pattern.parse('+1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with ja-JP locale', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'ja-JP' });
      const value = pattern.parse('+1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with de-DE locale', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'de-DE' });
      const value = pattern.parse('+1');
      expect(value.normalized.year).toBe(1);
    });
    it('should work with fr-FR locale', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'fr-FR' });
      const value = pattern.parse('+1');
      expect(value.normalized.year).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should fail empty string', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      expect(() => pattern.parse('')).toThrow();
    });
    it('should fail non-numeric input', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      expect(() => pattern.parse('+ab')).toThrow();
    });
    it('should fail partial numeric input', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      expect(() => pattern.parse('+1a')).toThrow();
    });
    it('should fail without sign', () => {
      const pattern = new DateTimePattern('+Y', { locale: 'en-US' });
      expect(() => pattern.parse('1')).toThrow();
    });
  });
});