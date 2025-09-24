import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayLocal', () => {
  it('should parse local weekday 1 and normalize to ISO weekday', () => {
    const pattern = new DateTimePattern('e', { locale: 'en-US' });
    const value = pattern.parse('1');
    expect(value.normalized.weekday).toBe(1); // ISO: Monday
  });
  it('should parse local weekday 7 and normalize to ISO weekday', () => {
    const pattern = new DateTimePattern('e', { locale: 'en-US' });
    const value = pattern.parse('7');
    expect(value.normalized.weekday).toBe(7); // ISO: Sunday
  });
  it('should fail if local weekday out of range', () => {
    const pattern = new DateTimePattern('e', { locale: 'en-US' });
    expect(() => pattern.parse('8')).toThrow();
  });
  it('should be valid padded', () => {
    const pattern = new DateTimePattern('e', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.normalized.weekday).toBe(1); // ISO: Monday
  });
  it('should be invalid if not flexible and padded', () => {
    const pattern = new DateTimePattern('e', { locale: 'en-US', flexible: false });
    expect(() => pattern.parse('01')).toThrow();
  });
  it('should be part of a valid date', () => {
    const pattern = new DateTimePattern('e MMM D YYYY', { locale: 'en-US' });
    const value = pattern.parse('3 Jan 1 2025');
    expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
  });
  it('should fail if incorrect local weekday', () => {
    const pattern = new DateTimePattern('e MMM D YYYY', { locale: 'en-US' });
    expect(() => pattern.parse('2 Jan 1 2025')).toThrow();
  });

  describe('multi-locale consistency', () => {
    const locales = ['es-US', 'en-UK', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR'];

    locales.forEach((locale) => {
      it(`weekdayLocal (e) should work consistently in ${locale}`, () => {
        const pattern = new DateTimePattern('e', { locale });
        const value = pattern.parse('3');
        expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
      });
    });
  });
});
