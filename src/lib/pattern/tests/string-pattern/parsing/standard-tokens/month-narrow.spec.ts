import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - monthNarrow', () => {
  describe('en-US locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-US' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-US', case: 'uppercase' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-US', case: 'lowercase' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-US', case: 'insensitive' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-US' });
      const value = pattern.parse('D');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-US' });
      expect(() => pattern.parse('j')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('es-US locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'es-US' });
      const value = pattern.parse('E');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'es-US', case: 'uppercase' });
      const value = pattern.parse('E');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'es-US', case: 'lowercase' });
      const value = pattern.parse('e');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'es-US', case: 'insensitive' });
      const value = pattern.parse('e');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'es-US' });
      const value = pattern.parse('D');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'es-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('E 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('E 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('en-UK locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-UK' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-UK', case: 'uppercase' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-UK', case: 'lowercase' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-UK', case: 'insensitive' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-UK' });
      const value = pattern.parse('D');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-UK' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'en-UK' });
      expect(() => pattern.parse('j')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'ru-RU' });
      const value = pattern.parse('Я');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'ru-RU', case: 'uppercase' });
      const value = pattern.parse('Я');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'ru-RU', case: 'lowercase' });
      const value = pattern.parse('я');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'ru-RU', case: 'insensitive' });
      const value = pattern.parse('я');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'ru-RU' });
      const value = pattern.parse('Д');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'ru-RU' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('Я 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('Я 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM月', { locale: 'ja-JP' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMMM月', { locale: 'ja-JP', case: 'uppercase' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMMM月', { locale: 'ja-JP', case: 'lowercase' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMMM月', { locale: 'ja-JP', case: 'insensitive' });
      const value = pattern.parse('1月');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMMM月', { locale: 'ja-JP' });
      const value = pattern.parse('12月');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMMM月', { locale: 'ja-JP' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('1月 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('1月 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('de-DE locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'de-DE' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'de-DE', case: 'uppercase' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'de-DE', case: 'lowercase' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'de-DE', case: 'insensitive' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'de-DE' });
      const value = pattern.parse('D');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'de-DE' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse January (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'fr-FR' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (uppercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'fr-FR', case: 'uppercase' });
      const value = pattern.parse('J');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (lowercase)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'fr-FR', case: 'lowercase' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse January (case insensitive)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'fr-FR', case: 'insensitive' });
      const value = pattern.parse('j');
      expect(value.normalized.month).toBe(1);
    });
    it('should parse December (default case)', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'fr-FR' });
      const value = pattern.parse('D');
      expect(value.normalized.month).toBe(12);
    });
    it('should fail incorrect month', () => {
      const pattern = new DateTimePattern('MMMMM', { locale: 'fr-FR' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the month', () => {
      const pattern = new DateTimePattern('MMMMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('J 05, 2025');
      expect(value.normalized.month).toBe(1);
    });
  });
});
