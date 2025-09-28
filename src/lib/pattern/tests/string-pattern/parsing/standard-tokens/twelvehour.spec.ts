import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - twelveHour', () => {
  it('should parse 1', () => {
    const pattern = new DateTimePattern('H', { locale: 'en-US' });
    const value = pattern.parse('1');
    expect(value.hour).toBe(1);
  });
  it('should parse padded 01', () => {
    const pattern = new DateTimePattern('H', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.hour).toBe(1);
  });
  it('should fail 13', () => {
    const pattern = new DateTimePattern('H', { locale: 'en-US' });
    expect(() => pattern.parse('13')).toThrow();
  });
  it('should fail flexible false and padded', () => {
    const pattern = new DateTimePattern('H', { locale: 'en-US', flexible: false });
    expect(() => pattern.parse('01')).toThrow();
  });
  it('should be valid as part of a datetime', () => {
    const pattern = new DateTimePattern('MMM D, YYYY H:m a', { locale: 'en-US' });
    const value = pattern.parse('Mar 1, 2025 12:00 PM');
    expect(value.hour).toBe(12);
    expect(value.minute).toBe(0);
    expect(value.month).toBe(3);
    expect(value.day).toBe(1);
    expect(value.year).toBe(2025);
    expect(value.resolved.dayPeriod).toBe(1);
  });
});
