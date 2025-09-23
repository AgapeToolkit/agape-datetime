import { DateTimePattern } from '../../../datetime-pattern';

describe('DateTimePattern - weekdayLong', () => {
  describe('en-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US' });
      const value = pattern.parse('Sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US', case: 'uppercase' });
      const value = pattern.parse('SUNDAY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US', case: 'lowercase' });
      const value = pattern.parse('sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US', case: 'insensitive' });
      const value = pattern.parse('sUnDaY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US' });
      const value = pattern.parse('Saturday');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US' });
      expect(() => pattern.parse('sunday')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-US' });
      expect(() => pattern.parse('SUNDAY')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'en-US' });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('es-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'es-US' });
      const value = pattern.parse('domingo');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'es-US', case: 'uppercase' });
      const value = pattern.parse('DOMINGO');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'es-US', case: 'lowercase' });
      const value = pattern.parse('domingo');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'es-US', case: 'insensitive' });
      const value = pattern.parse('DoMiNgO');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'es-US' });
      const value = pattern.parse('sábado');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'es-US' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'es-US' });
      expect(() => pattern.parse('DOMINGO')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('domingo, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'es-US' });
      const value = pattern.parse('domingo, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('en-UK locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK' });
      const value = pattern.parse('Sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK', case: 'uppercase' });
      const value = pattern.parse('SUNDAY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK', case: 'lowercase' });
      const value = pattern.parse('sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK', case: 'insensitive' });
      const value = pattern.parse('sUnDaY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK' });
      const value = pattern.parse('Saturday');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK' });
      expect(() => pattern.parse('sunday')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'en-UK' });
      expect(() => pattern.parse('SUNDAY')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'en-UK' });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ru-RU' });
      const value = pattern.parse('воскресенье');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ru-RU', case: 'uppercase' });
      const value = pattern.parse('ВОСКРЕСЕНЬЕ');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ru-RU', case: 'lowercase' });
      const value = pattern.parse('воскресенье');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ru-RU', case: 'insensitive' });
      const value = pattern.parse('ВоскРеСеНьЕ');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ru-RU' });
      const value = pattern.parse('суббота');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ru-RU' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ru-RU' });
      expect(() => pattern.parse('ВОСКРЕСЕНЬЕ')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('воскресенье, янв 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'ru-RU' });
      const value = pattern.parse('воскресенье, янв 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ja-JP' });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ja-JP', case: 'uppercase' });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ja-JP', case: 'lowercase' });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ja-JP', case: 'insensitive' });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ja-JP' });
      const value = pattern.parse('土曜日');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'ja-JP' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('日曜日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'ja-JP' });
      const value = pattern.parse('日曜日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('de-DE locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'de-DE' });
      const value = pattern.parse('Sonntag');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'de-DE', case: 'uppercase' });
      const value = pattern.parse('SONNTAG');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'de-DE', case: 'lowercase' });
      const value = pattern.parse('sonntag');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'de-DE', case: 'insensitive' });
      const value = pattern.parse('SoNnTaG');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'de-DE' });
      const value = pattern.parse('Samstag');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'de-DE' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'de-DE' });
      expect(() => pattern.parse('SONNTAG')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('Sonntag, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'de-DE' });
      const value = pattern.parse('Sonntag, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'fr-FR' });
      const value = pattern.parse('dimanche');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'fr-FR', case: 'uppercase' });
      const value = pattern.parse('DIMANCHE');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'fr-FR', case: 'lowercase' });
      const value = pattern.parse('dimanche');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'fr-FR', case: 'insensitive' });
      const value = pattern.parse('DiMaNcHe');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'fr-FR' });
      const value = pattern.parse('samedi');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'fr-FR' });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('DDDD', { locale: 'fr-FR' });
      expect(() => pattern.parse('DIMANCHE')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('dimanche, janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('DDDD, MMM DD, YYYY', { locale: 'fr-FR' });
      const value = pattern.parse('dimanche, janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });
});