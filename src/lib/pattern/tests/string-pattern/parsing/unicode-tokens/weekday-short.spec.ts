import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayShort (unicode)', () => {
  describe('en-US locale', () => {
    it('should parse Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sun');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (uppercase)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', case: 'uppercase', unicode: true });
      const value = pattern.parse('SUN');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (lowercase)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', case: 'lowercase', unicode: true });
      const value = pattern.parse('sun');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Sunday (case insensitive)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', case: 'insensitive', unicode: true });
      const value = pattern.parse('sUn');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Saturday (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sat');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
    it('should fail lowercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('sun')).toThrow();
    });
    it('should fail uppercase Sunday (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'en-US', unicode: true });
      expect(() => pattern.parse('SUN')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('EEE, MMM dd, yyyy', { locale: 'en-US', unicode: true });
      const value = pattern.parse('Sun, Jan 05, 2025');
      expect(value.normalized.weekday).toBe(7);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(5);
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('es-US locale', () => {
    it('should parse domingo (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'es-US', unicode: true });
      const value = pattern.parse('dom');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse sábado (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'es-US', unicode: true });
      const value = pattern.parse('sáb');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'es-US', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('ru-RU locale', () => {
    it('should parse воскресенье (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('вс');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse суббота (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'ru-RU', unicode: true });
      const value = pattern.parse('сб');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'ru-RU', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('ja-JP locale', () => {
    it('should parse 日曜日 (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('日');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse 土曜日 (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'ja-JP', unicode: true });
      const value = pattern.parse('土');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'ja-JP', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('de-DE locale', () => {
    it('should parse Sonntag (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('So');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse Samstag (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'de-DE', unicode: true });
      const value = pattern.parse('Sa');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'de-DE', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });

  describe('fr-FR locale', () => {
    it('should parse dimanche (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('dim');
      expect(value.normalized.weekday).toBe(7);
    });
    it('should parse samedi (default case)', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'fr-FR', unicode: true });
      const value = pattern.parse('sam');
      expect(value.normalized.weekday).toBe(6);
    });
    it('should fail incorrect weekday', () => {
      const pattern = new DateTimePattern('EEE', { locale: 'fr-FR', unicode: true });
      expect(() => pattern.parse('Invalid')).toThrow();
    });
  });
});
