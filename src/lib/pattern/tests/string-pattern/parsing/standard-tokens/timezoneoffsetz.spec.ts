import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneOffsetZ', () => {
  it('should parse Z', () => {
    const pattern = new DateTimePattern('Z', { locale: 'en-US' });
    const value = pattern.parse('Z');
    expect(value.normalized.timeZoneOffset).toBe('+00:00');
  });
  it('should parse lowercase z', () => {
    const pattern = new DateTimePattern('Z', { locale: 'en-US', case: 'lowercase' });
    const value = pattern.parse('z');
    expect(value.normalized.timeZoneOffset).toBe('+00:00');
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ss.SSSZ', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00.000Z');
    expect(value.normalized.timeZoneOffset).toBe('+00:00');
    expect(value.normalized.year).toBe(2025);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.hour).toBe(12);
    expect(value.normalized.minute).toBe(0);
    expect(value.normalized.second).toBe(0);
    expect(value.normalized.fractionalSecond).toBe(0);
  });
});
