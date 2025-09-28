import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - dayPeriod', () => {
  describe('en-US locale', () => {
    describe('default case', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse PM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US' });
        const value = pattern.parse('PM');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US' });
        expect(() => pattern.parse('am')).toThrow();
      });
      it('should fail lowercase pm', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US' });
        expect(() => pattern.parse('pm')).toThrow();
      });
      it('should be part of a valid time', () => {
        const pattern = new DateTimePattern('h:mm a', { locale: 'en-US' });
        const value = pattern.parse('6:30 AM');
        expect(value.hour).toBe(6);
        expect(value.minute).toBe(30);
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('uppercase', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'uppercase' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse pm', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('pm');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail uppercase AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'lowercase' });
        expect(() => pattern.parse('AM')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse Pm', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('Pm');
        expect(value.resolved.dayPeriod).toBe(1);
      });
    });
  });
  describe('es-US locale', () => {
    describe('default case', () => {
      it('should parse a.m.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US' });
        const value = pattern.parse('a.m.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse p.m.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US' });
        const value = pattern.parse('p.m.');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail uppercase A.M.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US' });
        expect(() => pattern.parse('A.M.')).toThrow();
      });
    });
    describe('uppercase', () => {
      it('should parse A.M.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('A.M.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail lowercase a.m.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US', case: 'uppercase' });
        expect(() => pattern.parse('a.m.')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse a.m.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('a.m.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail uppercase A.M.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US', case: 'lowercase' });
        expect(() => pattern.parse('A.M.')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse a.m.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('a.m.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse A.M.', () => {
        const pattern = new DateTimePattern('a', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('A.M.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('en-UK locale', () => {
    describe('default case', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse pm', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK' });
        const value = pattern.parse('pm');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail uppercase AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK' });
        expect(() => pattern.parse('AM')).toThrow();
      });
    });
    describe('uppercase', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK', case: 'uppercase' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK', case: 'uppercase' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK', case: 'lowercase' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail uppercase AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK', case: 'lowercase' });
        expect(() => pattern.parse('AM')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('ru-RU locale', () => {
    describe('default case', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse PM', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU' });
        const value = pattern.parse('PM');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('uppercase', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU', case: 'uppercase' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU', case: 'uppercase' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU', case: 'lowercase' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail uppercase AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU', case: 'lowercase' });
        expect(() => pattern.parse('AM')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('ja-JP locale', () => {
    describe('default case', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('a', { locale: 'ja-JP' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse 午後', () => {
        const pattern = new DateTimePattern('a', { locale: 'ja-JP' });
        const value = pattern.parse('午後');
        expect(value.resolved.dayPeriod).toBe(1);
      });
    });
    describe('uppercase', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('a', { locale: 'ja-JP', case: 'uppercase' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('lowercase', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('a', { locale: 'ja-JP', case: 'lowercase' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('case insensitive', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('a', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('de-DE locale', () => {
    describe('default case', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse PM', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE' });
        const value = pattern.parse('PM');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('uppercase', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE', case: 'uppercase' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE', case: 'uppercase' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE', case: 'lowercase' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail uppercase AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE', case: 'lowercase' });
        expect(() => pattern.parse('AM')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('fr-FR locale', () => {
    describe('default case', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse PM', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR' });
        const value = pattern.parse('PM');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('uppercase', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR', case: 'uppercase' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail lowercase am', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR', case: 'uppercase' });
        expect(() => pattern.parse('am')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR', case: 'lowercase' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail uppercase AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR', case: 'lowercase' });
        expect(() => pattern.parse('AM')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse AM', () => {
        const pattern = new DateTimePattern('a', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
});
