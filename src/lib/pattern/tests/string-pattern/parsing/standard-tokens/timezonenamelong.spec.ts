import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneNameLong', () => {
  it('should parse Pacific Standard Time', () => {
    const pattern = new DateTimePattern('zzzz', { locale: 'en-US' });
    const value = pattern.parse('Pacific Standard Time');
    expect(value.parsed?.timeZoneNameLong).toBe('Pacific Standard Time');
  });
  it('should parse Pacific Daylight Time', () => {
    const pattern = new DateTimePattern('zzzz', { locale: 'en-US' });
    const value = pattern.parse('Pacific Daylight Time');
    expect(value.parsed?.timeZoneNameLong).toBe('Pacific Daylight Time');
  });
  it('should fail Ooga Booga', () => {
    const pattern = new DateTimePattern('zzzz', { locale: 'en-US' });
    expect(() => pattern.parse('Ooga Booga')).toThrow();
  });
  it('should fail Europe/New_York', () => {
    const pattern = new DateTimePattern('zzzz', { locale: 'en-US' });
    expect(() => pattern.parse('Europe/New_York')).toThrow();
  });
});
