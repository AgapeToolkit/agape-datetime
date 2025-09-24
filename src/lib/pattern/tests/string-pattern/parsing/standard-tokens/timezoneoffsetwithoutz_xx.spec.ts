import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneOffsetWithoutZ_xx', () => {
  it('should parse +0000', () => {
    const pattern = new DateTimePattern('xx', { locale: 'en-US' });
    const value = pattern.parse('+0000');
    expect(value.normalized.timeZoneOffset).toBe('+00:00');
  });
  it('should parse -0000', () => {
    const pattern = new DateTimePattern('xx', { locale: 'en-US' });
    const value = pattern.parse('-0000');
    expect(value.normalized.timeZoneOffset).toBe('-00:00');
  });
  it('should parse -0500', () => {
    const pattern = new DateTimePattern('xx', { locale: 'en-US' });
    const value = pattern.parse('-0500');
    expect(value.normalized.timeZoneOffset).toBe('-05:00');
  });
  it('should parse -0530', () => {
    const pattern = new DateTimePattern('xx', { locale: 'en-US' });
    const value = pattern.parse('-0530');
    expect(value.normalized.timeZoneOffset).toBe('-05:30');
  });
  it('should fail Z', () => {
    const pattern = new DateTimePattern('xx', { locale: 'en-US' });
    expect(() => pattern.parse('Z')).toThrow();
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ss.SSSxx', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00.000-0530');
    expect(value.normalized.timeZoneOffset).toBe('-05:30');
    expect(value.normalized.year).toBe(2025);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.hour).toBe(12);
    expect(value.normalized.minute).toBe(0);
    expect(value.normalized.second).toBe(0);
    expect(value.normalized.fractionalSecond).toBe(0);
  });
  it('should fail +05:30', () => {
    const pattern = new DateTimePattern('xx', { locale: 'en-US' });
    expect(() => pattern.parse('+05:30')).toThrow();
  });
  it('should fail +05', () => {
    const pattern = new DateTimePattern('xx', { locale: 'en-US' });
    expect(() => pattern.parse('+05')).toThrow();
  });
});
