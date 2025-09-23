import { DateTimePattern } from '../../../datetime-pattern';

describe('DateTimePattern - monthLong', () => {
  describe('en-US locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US' });
      const value = pattern.parse('January');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US', case: 'uppercase' });
      const value = pattern.parse('JANUARY');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US', case: 'lowercase' });
      const value = pattern.parse('january');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US', case: 'insensitive' });
      const value = pattern.parse('jAnUaRy');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US' });
      const value = pattern.parse('December');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US' });
      expect(() => pattern.parse('january')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-US' });
      expect(() => pattern.parse('JANUARY')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('January 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('January 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('es-US locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'es-US' });
      const value = pattern.parse('enero');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'es-US', case: 'uppercase' });
      const value = pattern.parse('ENERO');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'es-US', case: 'lowercase' });
      const value = pattern.parse('enero');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'es-US', case: 'insensitive' });
      const value = pattern.parse('EnErO');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'es-US' });
      const value = pattern.parse('diciembre');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'es-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'es-US' });
      expect(() => pattern.parse('ENERO')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('enero 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('enero 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('en-UK locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK' });
      const value = pattern.parse('January');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK', case: 'uppercase' });
      const value = pattern.parse('JANUARY');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK', case: 'lowercase' });
      const value = pattern.parse('january');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK', case: 'insensitive' });
      const value = pattern.parse('jAnUaRy');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK' });
      const value = pattern.parse('December');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK' });
      expect(() => pattern.parse('january')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'en-UK' });
      expect(() => pattern.parse('JANUARY')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('January 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('January 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'ru-RU' });
      const value = pattern.parse('января');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'ru-RU', case: 'uppercase' });
      const value = pattern.parse('ЯНВАРЯ');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'ru-RU', case: 'lowercase' });
      const value = pattern.parse('января');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'ru-RU', case: 'insensitive' });
      const value = pattern.parse('ЯнВаРя');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'ru-RU' });
      const value = pattern.parse('декабря');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'ru-RU' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'ru-RU' });
      expect(() => pattern.parse('ЯНВАРЯ')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('января 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('января 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMM月', { locale: 'ja-JP' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMM月', { locale: 'ja-JP', case: 'uppercase' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMM月', { locale: 'ja-JP', case: 'lowercase' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMM月', { locale: 'ja-JP', case: 'insensitive' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMM月', { locale: 'ja-JP' });
      const value = pattern.parse('12月');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMM月', { locale: 'ja-JP' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('1月 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('1月 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('de-DE locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'de-DE' });
      const value = pattern.parse('Januar');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'de-DE', case: 'uppercase' });
      const value = pattern.parse('JANUAR');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'de-DE', case: 'lowercase' });
      const value = pattern.parse('januar');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'de-DE', case: 'insensitive' });
      const value = pattern.parse('jAnUaR');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'de-DE' });
      const value = pattern.parse('Dezember');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'de-DE' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'de-DE' });
      expect(() => pattern.parse('JANUAR')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('Januar 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('Januar 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'fr-FR' });
      const value = pattern.parse('janvier');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'fr-FR', case: 'uppercase' });
      const value = pattern.parse('JANVIER');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'fr-FR', case: 'lowercase' });
      const value = pattern.parse('janvier');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'fr-FR', case: 'insensitive' });
      const value = pattern.parse('jAnViEr');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'fr-FR' });
      const value = pattern.parse('décembre');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'fr-FR' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMM', { locale: 'fr-FR' });
      expect(() => pattern.parse('JANVIER')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('janvier 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('janvier 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });
});