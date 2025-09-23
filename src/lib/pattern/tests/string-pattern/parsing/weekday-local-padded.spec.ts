import { DateTimePattern } from '../../../datetime-pattern';

describe('DateTimePattern - weekdayLocalPadded', () => {
  it('should parse local weekday 01 and normalize to ISO weekday', () => {
    const pattern = new DateTimePattern('ee', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.normalized.weekday).toBe(1); // ISO: Monday
  });
  it('should parse local weekday 07 and normalize to ISO weekday', () => {
    const pattern = new DateTimePattern('ee', { locale: 'en-US' });
    const value = pattern.parse('07');
    expect(value.normalized.weekday).toBe(7); // ISO: Sunday
  });
  it('should fail if local weekday out of range', () => {
    const pattern = new DateTimePattern('ee', { locale: 'en-US' });
    expect(() => pattern.parse('08')).toThrow();
  });
  it('should be invalid if not padded', () => {
    const pattern = new DateTimePattern('ee', { locale: 'en-US', flexible: false });
    expect(() => pattern.parse('1')).toThrow();
  });
  it('should be part of a valid date', () => {
    const pattern = new DateTimePattern('ee MMM D YYYY', { locale: 'en-US' });
    const value = pattern.parse('03 Jan 1 2025');
    expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.year).toBe(2025);
  });
  it('should be invalid if incorrect local weekday for date', () => {
    const pattern = new DateTimePattern('ee MMM D YYYY', { locale: 'en-US' });
    expect(() => pattern.parse('02 Jan 1 2025')).toThrow();
  });

  describe('multi-locale consistency', () => {
    const locales = ['es-US', 'en-UK', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR'];

    locales.forEach((locale) => {
      it(`weekdayLocalPadded (ee) should work consistently in ${locale}`, () => {
        const pattern = new DateTimePattern('ee', { locale });
        const value = pattern.parse('03');
        expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
      });
    });
  });
});
