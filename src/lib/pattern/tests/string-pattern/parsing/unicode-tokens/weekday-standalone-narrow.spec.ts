import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayStandaloneNarrow (unicode)', () => {
  describe('en-US locale', () => {
    it('should parse S (Saturday, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse S (Saturday, uppercase)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'en-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse s (Saturday, lowercase)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'en-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse s (Saturday, case insensitive)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'en-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse S (Saturday, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase s (Saturday, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('s')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ccccc, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(6);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
    it('should normalize the weekday', () => {
      const pattern = new DateTimePattern('ccccc, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('S, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(6);
    });
  });

  describe('es-US locale', () => {
    it('should parse s (sábado, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'es-US', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse d (domingo, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'es-US', unicode: true });
      const value = pattern.parse('d');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'es-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('ru-RU locale', () => {
    it('should parse с (суббота, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('с');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse в (воскресенье, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('в');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'ru-RU', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('ja-JP locale', () => {
    it('should parse 土 (土曜日, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('土');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse 日 (日曜日, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'ja-JP', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('de-DE locale', () => {
    it('should parse S (Samstag, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse S (Sonntag, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('S');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'de-DE', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('fr-FR locale', () => {
    it('should parse s (samedi, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('s');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should parse d (dimanche, default case)', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('d');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('ccccc', { locale: 'fr-FR', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });
});
