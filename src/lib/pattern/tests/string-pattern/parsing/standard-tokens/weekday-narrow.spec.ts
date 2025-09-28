import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayNarrow', () => {
  describe('en-US locale', () => {
    it('should parse S (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-US' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(7);
    });
    it('should parse S (Saturday, uppercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-US', case: 'uppercase' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(7);
    });
    it('should parse s (Saturday, lowercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-US', case: 'lowercase' });
      const value = pattern.parse('s');
      expect(value.weekday).toBe(7);
    });
    it('should parse s (Saturday, case insensitive)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-US', case: 'insensitive' });
      const value = pattern.parse('s');
      expect(value.weekday).toBe(6);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-US' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase s (Saturday, default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-US' });
      expect(() => pattern.parse('s')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('es-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'es-US' });
      const value = pattern.parse('D');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'es-US', case: 'uppercase' });
      const value = pattern.parse('D');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'es-US', case: 'lowercase' });
      const value = pattern.parse('d');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'es-US', case: 'insensitive' });
      const value = pattern.parse('d');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'es-US' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'es-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('D, ene 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('D, ene 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('en-UK locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-UK' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-UK', case: 'uppercase' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-UK', case: 'lowercase' });
      const value = pattern.parse('s');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-UK', case: 'insensitive' });
      const value = pattern.parse('s');
      expect(value.weekday).toBe(6);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-UK' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-UK' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'en-UK' });
      expect(() => pattern.parse('s')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ru-RU' });
      const value = pattern.parse('В');
      expect(value.weekday).toBe(2);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ru-RU', case: 'uppercase' });
      const value = pattern.parse('В');
      expect(value.weekday).toBe(2);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ru-RU', case: 'lowercase' });
      const value = pattern.parse('в');
      expect(value.weekday).toBe(2);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ru-RU', case: 'insensitive' });
      const value = pattern.parse('в');
      expect(value.weekday).toBe(2);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ru-RU' });
      const value = pattern.parse('С');
      expect(value.weekday).toBe(3);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ru-RU' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('В, янв. 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('В, янв. 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ja-JP' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ja-JP', case: 'uppercase' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ja-JP', case: 'lowercase' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ja-JP', case: 'insensitive' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ja-JP' });
      const value = pattern.parse('土');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'ja-JP' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDDD, MMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDDD, MMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('de-DE locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'de-DE' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'de-DE', case: 'uppercase' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'de-DE', case: 'lowercase' });
      const value = pattern.parse('s');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'de-DE', case: 'insensitive' });
      const value = pattern.parse('s');
      expect(value.weekday).toBe(6);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'de-DE' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'de-DE' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('S, Jan. 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('S, Jan. 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'fr-FR' });
      const value = pattern.parse('D');
      expect(value.weekday).toBe(6);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'fr-FR', case: 'uppercase' });
      const value = pattern.parse('D');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'fr-FR', case: 'lowercase' });
      const value = pattern.parse('d');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'fr-FR', case: 'insensitive' });
      const value = pattern.parse('d');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'fr-FR' });
      const value = pattern.parse('S');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDDD', { locale: 'fr-FR' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('D, janv. 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDDD, MMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('D, janv. 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });
});
