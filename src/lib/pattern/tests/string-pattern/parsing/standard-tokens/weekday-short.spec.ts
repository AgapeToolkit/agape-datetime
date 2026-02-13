import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayShort', () => {
  describe('en-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US' });
      const value = pattern.parse('Sun');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US', case: 'uppercase' });
      const value = pattern.parse('SUN');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US', case: 'lowercase' });
      const value = pattern.parse('sun');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US', case: 'insensitive' });
      const value = pattern.parse('sUn');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US' });
      const value = pattern.parse('Sat');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US' });
      expect(() => pattern.parse('sun')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-US' });
      expect(() => pattern.parse('SUN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('es-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'es-US' });
      const value = pattern.parse('dom');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'es-US', case: 'uppercase' });
      const value = pattern.parse('DOM');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'es-US', case: 'lowercase' });
      const value = pattern.parse('dom');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'es-US', case: 'insensitive' });
      const value = pattern.parse('DoM');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'es-US' });
      const value = pattern.parse('sáb');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'es-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'es-US' });
      expect(() => pattern.parse('DOM')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('dom, ene 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('dom, ene 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('en-UK locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK' });
      const value = pattern.parse('Sun');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK', case: 'uppercase' });
      const value = pattern.parse('SUN');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK', case: 'lowercase' });
      const value = pattern.parse('sun');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK', case: 'insensitive' });
      const value = pattern.parse('sUn');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK' });
      const value = pattern.parse('Sat');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK' });
      expect(() => pattern.parse('sun')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'en-UK' });
      expect(() => pattern.parse('SUN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ru-RU' });
      const value = pattern.parse('вс');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ru-RU', case: 'uppercase' });
      const value = pattern.parse('ВС');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ru-RU', case: 'lowercase' });
      const value = pattern.parse('вс');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ru-RU', case: 'insensitive' });
      const value = pattern.parse('Вс');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ru-RU' });
      const value = pattern.parse('сб');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ru-RU' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ru-RU' });
      expect(() => pattern.parse('ВС')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('вс, янв. 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('вс, янв. 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ja-JP' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ja-JP', case: 'uppercase' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ja-JP', case: 'lowercase' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ja-JP', case: 'insensitive' });
      const value = pattern.parse('日');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ja-JP' });
      const value = pattern.parse('土');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'ja-JP' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDD, MMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDD, MMM月 DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('日, 1月 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('de-DE locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'de-DE' });
      const value = pattern.parse('So.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'de-DE', case: 'uppercase' });
      const value = pattern.parse('SO.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'de-DE', case: 'lowercase' });
      const value = pattern.parse('so.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'de-DE', case: 'insensitive' });
      const value = pattern.parse('sO.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'de-DE' });
      const value = pattern.parse('Sa.');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'de-DE' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'de-DE' });
      expect(() => pattern.parse('SO')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('So., Jan. 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('So., Jan. 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'fr-FR' });
      const value = pattern.parse('dim.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'fr-FR', case: 'uppercase' });
      const value = pattern.parse('DIM.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'fr-FR', case: 'lowercase' });
      const value = pattern.parse('dim.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'fr-FR', case: 'insensitive' });
      const value = pattern.parse('DiM.');
      expect(value.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'fr-FR' });
      const value = pattern.parse('sam.');
      expect(value.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'fr-FR' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDD', { locale: 'fr-FR' });
      expect(() => pattern.parse('DIM')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('dim., janv. 05, 2025');
      expect(value.weekday).toBe(7);
      expect(value.month).toBe(1);
      expect(value.day).toBe(5);
      expect(value.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDD, MMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('dim., janv. 05, 2025');
      expect(value.weekday).toBe(7);
    });
  });
});
