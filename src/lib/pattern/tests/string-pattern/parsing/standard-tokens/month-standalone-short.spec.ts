import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - monthStandaloneShort', () => {
  describe('en-US locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US' });
      const value = pattern.parse('Jan');
      expect(value.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US', case: 'uppercase' });
      const value = pattern.parse('JAN');
      expect(value.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US', case: 'lowercase' });
      const value = pattern.parse('jan');
      expect(value.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US', case: 'insensitive' });
      const value = pattern.parse('jAn');
      expect(value.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US' });
      const value = pattern.parse('Dec');
      expect(value.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US' });
      expect(() => pattern.parse('jan')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-US' });
      expect(() => pattern.parse('JAN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('Jan 05, 2025');
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('Jan 05, 2025');
      expect(value.month).toBe(1);
    });
  });

  describe('es-US locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'es-US' });
      const value = pattern.parse('ene');
      expect(value.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'es-US', case: 'uppercase' });
      const value = pattern.parse('ENE');
      expect(value.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'es-US', case: 'lowercase' });
      const value = pattern.parse('ene');
      expect(value.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'es-US', case: 'insensitive' });
      const value = pattern.parse('EnE');
      expect(value.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'es-US' });
      const value = pattern.parse('dic');
      expect(value.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'es-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'es-US' });
      expect(() => pattern.parse('ENE')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('ene 05, 2025');
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('ene 05, 2025');
      expect(value.month).toBe(1);
    });
  });

  describe('en-UK locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK' });
      const value = pattern.parse('Jan');
      expect(value.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK', case: 'uppercase' });
      const value = pattern.parse('JAN');
      expect(value.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK', case: 'lowercase' });
      const value = pattern.parse('jan');
      expect(value.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK', case: 'insensitive' });
      const value = pattern.parse('jAn');
      expect(value.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK' });
      const value = pattern.parse('Dec');
      expect(value.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK' });
      expect(() => pattern.parse('jan')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'en-UK' });
      expect(() => pattern.parse('JAN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('Jan 05, 2025');
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('Jan 05, 2025');
      expect(value.month).toBe(1);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'ru-RU' });
      const value = pattern.parse('янв.');
      expect(value.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'ru-RU', case: 'uppercase' });
      const value = pattern.parse('ЯНВ.');
      expect(value.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'ru-RU', case: 'lowercase' });
      const value = pattern.parse('янв.');
      expect(value.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'ru-RU', case: 'insensitive' });
      const value = pattern.parse('ЯнВ.');
      expect(value.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'ru-RU' });
      const value = pattern.parse('дек.');
      expect(value.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'ru-RU' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'ru-RU' });
      expect(() => pattern.parse('ЯНВ.')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('янв. 05, 2025');
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('янв. 05, 2025');
      expect(value.month).toBe(1);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('LLL月', { locale: 'ja-JP' });
      const value = pattern.parse('1月');
      expect(value.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('LLL月', { locale: 'ja-JP', case: 'uppercase' });
      const value = pattern.parse('1月');
      expect(value.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('LLL月', { locale: 'ja-JP', case: 'lowercase' });
      const value = pattern.parse('1月');
      expect(value.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('LLL月', { locale: 'ja-JP', case: 'insensitive' });
      const value = pattern.parse('1月');
      expect(value.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('LLL月', { locale: 'ja-JP' });
      const value = pattern.parse('12月');
      expect(value.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('LLL月', { locale: 'ja-JP' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('LLL月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('1月 05, 2025');
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('LLL月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('1月 05, 2025');
      expect(value.month).toBe(1);
    });
  });

  describe('de-DE locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'de-DE' });
      const value = pattern.parse('Jan');
      expect(value.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'de-DE', case: 'uppercase' });
      const value = pattern.parse('JAN');
      expect(value.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'de-DE', case: 'lowercase' });
      const value = pattern.parse('jan');
      expect(value.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'de-DE', case: 'insensitive' });
      const value = pattern.parse('jAn');
      expect(value.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'de-DE' });
      const value = pattern.parse('Dez');
      expect(value.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'de-DE' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'de-DE' });
      expect(() => pattern.parse('JAN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('Jan 05, 2025');
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('Jan 05, 2025');
      expect(value.month).toBe(1);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'fr-FR' });
      const value = pattern.parse('janv.');
      expect(value.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'fr-FR', case: 'uppercase' });
      const value = pattern.parse('JANV.');
      expect(value.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'fr-FR', case: 'lowercase' });
      const value = pattern.parse('janv.');
      expect(value.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'fr-FR', case: 'insensitive' });
      const value = pattern.parse('jAnV.');
      expect(value.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'fr-FR' });
      const value = pattern.parse('déc.');
      expect(value.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'fr-FR' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase January (default case)', () => {
      const pattern = new DateTimePattern('LLL', { locale: 'fr-FR' });
      expect(() => pattern.parse('JANV.')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('janv. 05, 2025');
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('LLL DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('janv. 05, 2025');
      expect(value.month).toBe(1);
    });
  });
});
