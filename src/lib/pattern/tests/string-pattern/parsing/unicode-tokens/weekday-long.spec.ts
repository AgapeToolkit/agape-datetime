import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayLong', () => {
  describe('en-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('SUNDAY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('sUnDaY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Saturday');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('sunday')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('SUNDAY')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('es-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'es-US', unicode: true });
      const value = pattern.parse('domingo');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'es-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('DOMINGO');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'es-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('domingo');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'es-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('DoMiNgO');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'es-US', unicode: true });
      const value = pattern.parse('sábado');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'es-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'es-US', unicode: true });
      expect(() => pattern.parse('DOMINGO')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'es-US', unicode: true });
      const value = pattern.parse('domingo, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'es-US', unicode: true });
      const value = pattern.parse('domingo, ene 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('en-UK locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', case: 'uppercase', unicode: true });
      const value = pattern.parse('SUNDAY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', case: 'lowercase', unicode: true });
      const value = pattern.parse('sunday');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', case: 'insensitive', unicode: true });
      const value = pattern.parse('sUnDaY');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Saturday');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('sunday')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'en-UK', unicode: true });
      expect(() => pattern.parse('SUNDAY')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'en-UK', unicode: true });
      const value = pattern.parse('Sunday, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ru-RU locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('воскресенье');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ru-RU', case: 'uppercase', unicode: true });
      const value = pattern.parse('ВОСКРЕСЕНЬЕ');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ru-RU', case: 'lowercase', unicode: true });
      const value = pattern.parse('воскресенье');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ru-RU', case: 'insensitive', unicode: true });
      const value = pattern.parse('ВоскРеСеНьЕ');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('суббота');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ru-RU', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ru-RU', unicode: true });
      expect(() => pattern.parse('ВОСКРЕСЕНЬЕ')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('воскресенье, янв. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('воскресенье, янв. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('ja-JP locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ja-JP', case: 'uppercase', unicode: true });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ja-JP', case: 'lowercase', unicode: true });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ja-JP', case: 'insensitive', unicode: true });
      const value = pattern.parse('日曜日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('土曜日');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'ja-JP', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEE, MMM月 dd, yyyy', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日曜日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEE, MMM月 dd, yyyy', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日曜日, 1月 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('de-DE locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('Sonntag');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'de-DE', case: 'uppercase', unicode: true });
      const value = pattern.parse('SONNTAG');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'de-DE', case: 'lowercase', unicode: true });
      const value = pattern.parse('sonntag');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'de-DE', case: 'insensitive', unicode: true });
      const value = pattern.parse('SoNnTaG');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('Samstag');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'de-DE', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'de-DE', unicode: true });
      expect(() => pattern.parse('SONNTAG')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('Sonntag, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('Sonntag, Jan. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });

  describe('fr-FR locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('dimanche');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'fr-FR', case: 'uppercase', unicode: true });
      const value = pattern.parse('DIMANCHE');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'fr-FR', case: 'lowercase', unicode: true });
      const value = pattern.parse('dimanche');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'fr-FR', case: 'insensitive', unicode: true });
      const value = pattern.parse('DiMaNcHe');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('samedi');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'fr-FR', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEEE', { locale: 'fr-FR', unicode: true });
      expect(() => pattern.parse('DIMANCHE')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('dimanche, janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('EEEE, MMM dd, yyyy', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('dimanche, janv. 05, 2025');
      expect(value.normalized.weekday).toBe(7);
    });
  });
});
