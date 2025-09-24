import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneOffsetWithZ_XXX', () => {
  it('should parse +00:00', () => {
    const pattern = new DateTimePattern('XXX', { locale: 'en-US' });
    const value = pattern.parse('+00:00');
    expect(value.normalized.timeZoneOffset).toBe('+00:00');
  });
  it('should parse -00:00', () => {
    const pattern = new DateTimePattern('XXX', { locale: 'en-US' });
    const value = pattern.parse('-00:00');
    expect(value.normalized.timeZoneOffset).toBe('-00:00');
  });
  it('should parse +05:00', () => {
    const pattern = new DateTimePattern('XXX', { locale: 'en-US' });
    const value = pattern.parse('+05:00');
    expect(value.normalized.timeZoneOffset).toBe('+05:00');
  });
  it('should parse -05:30', () => {
    const pattern = new DateTimePattern('XXX', { locale: 'en-US' });
    const value = pattern.parse('-05:30');
    expect(value.normalized.timeZoneOffset).toBe('-05:30');
  });
  it('should parse Z', () => {
    const pattern = new DateTimePattern('XXX', { locale: 'en-US' });
    const value = pattern.parse('Z');
    expect(value.normalized.timeZoneOffset).toBe('+00:00');
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ss.SSSXXX', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00.000-05:30');
    expect(value.normalized.timeZoneOffset).toBe('-05:30');
    expect(value.normalized.year).toBe(2025);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.hour).toBe(12);
    expect(value.normalized.minute).toBe(0);
    expect(value.normalized.second).toBe(0);
    expect(value.normalized.fractionalSecond).toBe(0);
  });
  it('should fail +0530', () => {
    const pattern = new DateTimePattern('XXX', { locale: 'en-US' });
    expect(() => pattern.parse('+0530')).toThrow();
  });
  it('should fail +05', () => {
    const pattern = new DateTimePattern('XXX', { locale: 'en-US' });
    expect(() => pattern.parse('+05')).toThrow();
  });
});
