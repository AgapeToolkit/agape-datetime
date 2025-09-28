import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneOffsetZ', () => {
  it('should parse Z', () => {
    const pattern = new DateTimePattern('Z', { locale: 'en-US' });
    const value = pattern.parse('Z');
    expect(value.timeZoneOffset).toBe('+00:00');
  });
  it('should parse lowercase z', () => {
    const pattern = new DateTimePattern('Z', { locale: 'en-US', case: 'lowercase' });
    const value = pattern.parse('z');
    expect(value.timeZoneOffset).toBe('+00:00');
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ss.SSSZ', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00.000Z');
    expect(value.timeZoneOffset).toBe('+00:00');
    expect(value.year).toBe(2025);
    expect(value.month).toBe(1);
    expect(value.day).toBe(1);
    expect(value.hour).toBe(12);
    expect(value.minute).toBe(0);
    expect(value.second).toBe(0);
    expect(value.nanosecond).toBe(0);
  });
});
