import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayStandaloneShort', () => {
  describe('en-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sun');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('SUN');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('sun');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('sUn');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sat');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('sun')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('SUN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('es-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'es-US', unicode: true });
      const value = pattern.parse('dom');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'es-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('DOM');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'es-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('dom');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'es-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('DoM');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'es-US', unicode: true });
      const value = pattern.parse('sáb');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'es-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'es-US', unicode: true });
      expect(() => pattern.parse('DOM')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'es-US', unicode: true });
      const value = pattern.parse('dom, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'es-US', unicode: true });
      const value = pattern.parse('dom, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('en-UK locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Sun');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', case: 'uppercase', unicode: true });
      const value = pattern.parse('SUN');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', case: 'lowercase', unicode: true });
      const value = pattern.parse('sun');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', case: 'insensitive', unicode: true });
      const value = pattern.parse('sUn');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Sat');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('sun')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('SUN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('вс');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ru-RU', case: 'uppercase', unicode: true });
      const value = pattern.parse('ВС');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ru-RU', case: 'lowercase', unicode: true });
      const value = pattern.parse('вс');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ru-RU', case: 'insensitive', unicode: true });
      const value = pattern.parse('Вс');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('сб');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ru-RU', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ru-RU', unicode: true });
      expect(() => pattern.parse('ВС')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('вс, янв. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('вс, янв. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ja-JP', case: 'uppercase', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ja-JP', case: 'lowercase', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ja-JP', case: 'insensitive', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('土');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'ja-JP', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccc, MMM月 dd, yyyy', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccc, MMM月 dd, yyyy', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('de-DE locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('So');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'de-DE', case: 'uppercase', unicode: true });
      const value = pattern.parse('SO');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'de-DE', case: 'lowercase', unicode: true });
      const value = pattern.parse('so');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'de-DE', case: 'insensitive', unicode: true });
      const value = pattern.parse('sO');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('Sa');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'de-DE', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'de-DE', unicode: true });
      expect(() => pattern.parse('SO')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('So, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('So, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('dim.');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'fr-FR', case: 'uppercase', unicode: true });
      const value = pattern.parse('DIM.');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'fr-FR', case: 'lowercase', unicode: true });
      const value = pattern.parse('dim.');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'fr-FR', case: 'insensitive', unicode: true });
      const value = pattern.parse('DiM.');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('sam.');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'fr-FR', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('ccc', { locale: 'fr-FR', unicode: true });
      expect(() => pattern.parse('DIM.')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('dim., janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccc, MMM dd, yyyy', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('dim., janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });
});
