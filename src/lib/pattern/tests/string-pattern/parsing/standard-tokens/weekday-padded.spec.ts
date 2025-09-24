import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayPadded', () => {
  it('should parse the day of week 1', () => {
    const pattern = new DateTimePattern('ii', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.normalized.weekday).toBe(1);
  });
  it('should parse the day of week 03', () => {
    const pattern = new DateTimePattern('ii', { locale: 'en-US' });
    const value = pattern.parse('03');
    expect(value.normalized.weekday).toBe(3);
  });
  it('should fail if day of week out of range', () => {
    const pattern = new DateTimePattern('ii', { locale: 'en-US' });
    expect(() => pattern.parse('08')).toThrow();
  });
  it('should be invalid if not padded', () => {
    const pattern = new DateTimePattern('ii', { locale: 'en-US', flexible: false });
    expect(() => pattern.parse('1')).toThrow();
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
