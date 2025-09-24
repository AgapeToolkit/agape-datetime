import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneNameShort', () => {
  it('should parse PST', () => {
    const pattern = new DateTimePattern('z', { locale: 'en-US' });
    const value = pattern.parse('PST');
    expect(value.parsed.timeZoneNameShort).toBe('PST');
  });
  it('should parse PDT', () => {
    const pattern = new DateTimePattern('z', { locale: 'en-US' });
    const value = pattern.parse('PDT');
    expect(value.parsed.timeZoneNameShort).toBe('PDT');
  });
  it('should fail TUR', () => {
    const pattern = new DateTimePattern('z', { locale: 'en-US' });
    expect(() => pattern.parse('TUR')).toThrow();
  });
  it('should fail Europe/New_York', () => {
    const pattern = new DateTimePattern('z', { locale: 'en-US' });
    expect(() => pattern.parse('Europe/New_York')).toThrow();
  });
});
