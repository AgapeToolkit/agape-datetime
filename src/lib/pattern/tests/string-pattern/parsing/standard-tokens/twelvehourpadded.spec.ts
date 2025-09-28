import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - twelveHourPadded', () => {
  it('should parse 01', () => {
    const pattern = new DateTimePattern('HH', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.hour).toBe(1);
  });
  it('should fail 13', () => {
    const pattern = new DateTimePattern('HH', { locale: 'en-US' });
    expect(() => pattern.parse('13')).toThrow();
  });
  it('should fail unpadded', () => {
    const pattern = new DateTimePattern('HH', { locale: 'en-US' });
    expect(() => pattern.parse('1')).toThrow();
  });
  it('should be valid as part of a datetime', () => {
    const pattern = new DateTimePattern('MMM D, YYYY HH:m a', { locale: 'en-US' });
    const value = pattern.parse('Mar 1, 2025 12:00 PM');
    expect(value.hour).toBe(12);
    expect(value.minute).toBe(0);
    expect(value.month).toBe(3);
    expect(value.day).toBe(1);
    expect(value.year).toBe(2025);
    expect(value.resolved.dayPeriod).toBe(1);
  });
});
