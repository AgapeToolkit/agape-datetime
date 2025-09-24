import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekday', () => {
  it('should parse the day of week 1', () => {
    const pattern = new DateTimePattern('i', { locale: 'en-US' });
    const value = pattern.parse('1');
    expect(value.normalized.weekday).toBe(1);
  });
  it('should parse the day of week 3', () => {
    const pattern = new DateTimePattern('i', { locale: 'en-US' });
    const value = pattern.parse('3');
    expect(value.normalized.weekday).toBe(3);
  });
  it('should fail if day of week out of range', () => {
    const pattern = new DateTimePattern('i', { locale: 'en-US' });
    expect(() => pattern.parse('8')).toThrow();
  });
  it('should be valid padded', () => {
    const pattern = new DateTimePattern('i', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.normalized.weekday).toBe(1);
  });
  it('should be invalid if not flexible and padded', () => {
    const pattern = new DateTimePattern('i', { locale: 'en-US', flexible: false });
    expect(() => pattern.parse('01')).toThrow();
  });
  it('should be part of a date', () => {
    const pattern = new DateTimePattern('i MMM D YYYY', { locale: 'en-US' });
    const value = pattern.parse('3 Jan 1 2025');
    expect(value.normalized.weekday).toBe(3);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.year).toBe(2025);
  });
  it('should be invalid if incorrect day of week', () => {
    const pattern = new DateTimePattern('i MMM D YYYY', { locale: 'en-US' });
    expect(() => pattern.parse('2 Jan 1 2025')).toThrow();
  });
  describe('multi-locale consistency', () => {
    const locales = ['es-US', 'en-UK', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR'];

    locales.forEach((locale) => {
      it(`weekdayPadded (ii) should work consistently in ${locale}`, () => {
        const pattern = new DateTimePattern('ii', { locale });
        const value = pattern.parse('03');
        expect(value.normalized.weekday).toBe(3);
      });
    });
  });
});
