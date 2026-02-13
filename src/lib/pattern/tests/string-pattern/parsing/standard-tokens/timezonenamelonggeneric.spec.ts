import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneNameLongGeneric', () => {
  it('should parse Pacific Time', () => {
    const pattern = new DateTimePattern('ZZZZ', { locale: 'en-US' });
    const value = pattern.parse('Pacific Time');
    expect(value.parsed?.timeZoneNameLongGeneric).toBe('Pacific Time');
  });
  it('should parse Eastern Time', () => {
    const pattern = new DateTimePattern('ZZZZ', { locale: 'en-US' });
    const value = pattern.parse('Eastern Time');
    expect(value.parsed?.timeZoneNameLongGeneric).toBe('Eastern Time');
  });
  it('should parse Central Time', () => {
    const pattern = new DateTimePattern('ZZZZ', { locale: 'en-US' });
    const value = pattern.parse('Central Time');
    expect(value.parsed?.timeZoneNameLongGeneric).toBe('Central Time');
  });
  it('should parse Mountain Time', () => {
    const pattern = new DateTimePattern('ZZZZ', { locale: 'en-US' });
    const value = pattern.parse('Mountain Time');
    expect(value.parsed?.timeZoneNameLongGeneric).toBe('Mountain Time');
  });
  it('should fail Pacific Standard Time', () => {
    const pattern = new DateTimePattern('ZZZZ', { locale: 'en-US' });
    expect(() => pattern.parse('Pacific Standard Time')).toThrow();
  });
  it('should fail Europe/New_York', () => {
    const pattern = new DateTimePattern('ZZZZ', { locale: 'en-US' });
    expect(() => pattern.parse('Europe/New_York')).toThrow();
  });
});
