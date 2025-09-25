import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayNarrow', () => {
  describe('en-US locale', () => {
    it('should parse S (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse S (Saturday, uppercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse s (Saturday, lowercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse s (Saturday, case insensitive)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase s (Saturday, default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('s')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('es-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'es-US', unicode: true });
      const value = pattern.parse('D');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'es-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('D');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'es-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('d');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'es-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('d');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'es-US', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'es-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'es-US', unicode: true });
      const value = pattern.parse('D, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'es-US', unicode: true });
      const value = pattern.parse('D, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('en-UK locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-UK', case: 'uppercase', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-UK', case: 'lowercase', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-UK', case: 'insensitive', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('s')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('В');
      expect(value.normalized.weekday).toBe(2);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ru-RU', case: 'uppercase', unicode: true });
      const value = pattern.parse('В');
      expect(value.normalized.weekday).toBe(2);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ru-RU', case: 'lowercase', unicode: true });
      const value = pattern.parse('в');
      expect(value.normalized.weekday).toBe(2);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ru-RU', case: 'insensitive', unicode: true });
      const value = pattern.parse('в');
      expect(value.normalized.weekday).toBe(2);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('С');
      expect(value.normalized.weekday).toBe(3);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ru-RU', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('В, янв. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('В, янв. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ja-JP', case: 'uppercase', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ja-JP', case: 'lowercase', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ja-JP', case: 'insensitive', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('土');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'ja-JP', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEEE, MMM月 dd, yyy', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEEE, MMM月 dd, yyy', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('de-DE locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'de-DE', case: 'uppercase', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'de-DE', case: 'lowercase', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'de-DE', case: 'insensitive', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'de-DE', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('S, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('S, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('D');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'fr-FR', case: 'uppercase', unicode: true });
      const value = pattern.parse('D');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'fr-FR', case: 'lowercase', unicode: true });
      const value = pattern.parse('d');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'fr-FR', case: 'insensitive', unicode: true });
      const value = pattern.parse('d');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEEE', { locale: 'fr-FR', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('D, janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyy', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('D, janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });
});
