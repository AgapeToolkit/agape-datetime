import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - dayPeriodNarrow', () => {
  describe('en-US locale', () => {
    describe('default case', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US' });
        const value = pattern.parse('a');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse p', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US' });
        const value = pattern.parse('p');
        expect(value.resolved.dayPeriod).toBe(1);
      });
      it('should fail uppercase A', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US' });
        expect(() => pattern.parse('A')).toThrow();
      });
      it('should be part of a valid time', () => {
        const pattern = new DateTimePattern('h:mm aaaaa', { locale: 'en-US' });
        const value = pattern.parse('6:30 a');
        expect(value.hour).toBe(6);
        expect(value.minute).toBe(30);
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('uppercase', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail lowercase a', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US', case: 'uppercase' });
        expect(() => pattern.parse('a')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('a');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should fail uppercase A', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US', case: 'lowercase' });
        expect(() => pattern.parse('A')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('a');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('es-US locale', () => {
    describe('default case', () => {
      it('should parse a.m.', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'es-US' });
        const value = pattern.parse('a.m.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse p.m.', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'es-US' });
        const value = pattern.parse('p.m.');
        expect(value.resolved.dayPeriod).toBe(1);
      });
    });
    describe('uppercase', () => {
      it('should parse A.M.', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('A.M.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('lowercase', () => {
      it('should parse a.m.', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('a.m.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('case insensitive', () => {
      it('should parse a.m.', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('a.m.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse A.M.', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('A.M.');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('en-UK locale', () => {
    describe('default case', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-UK' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse pm', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-UK' });
        const value = pattern.parse('pm');
        expect(value.resolved.dayPeriod).toBe(1);
      });
    });
    describe('uppercase', () => {
      it('should parse AM', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-UK', case: 'uppercase' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('lowercase', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-UK', case: 'lowercase' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('case insensitive', () => {
      it('should parse am', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('am');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse AM', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('AM');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
  describe('ja-JP locale', () => {
    describe('default case', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'ja-JP' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
      it('should parse 午後', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'ja-JP' });
        const value = pattern.parse('午後');
        expect(value.resolved.dayPeriod).toBe(1);
      });
    });
    describe('uppercase', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'ja-JP', case: 'uppercase' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('lowercase', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'ja-JP', case: 'lowercase' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
    describe('case insensitive', () => {
      it('should parse 午前', () => {
        const pattern = new DateTimePattern('aaaaa', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('午前');
        expect(value.resolved.dayPeriod).toBe(0);
      });
    });
  });
});
