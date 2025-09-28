import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneOffsetWithoutZ_x', () => {
  it('should parse +05', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    const value = pattern.parse('+05');
    expect(value.timeZoneOffset).toBe('+05:00');
  });
  it('should parse -05', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    const value = pattern.parse('-05');
    expect(value.timeZoneOffset).toBe('-05:00');
  });
  it('should parse +00', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    const value = pattern.parse('+00');
    expect(value.timeZoneOffset).toBe('+00:00');
  });
  it('should parse -00', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    const value = pattern.parse('-00');
    expect(value.timeZoneOffset).toBe('-00:00');
  });
  it('should parse -0500', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    const value = pattern.parse('-0500');
    expect(value.timeZoneOffset).toBe('-05:00');
  });
  it('should parse -0530', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    const value = pattern.parse('-0530');
    expect(value.timeZoneOffset).toBe('-05:30');
  });
  it('should fail Z', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    expect(() => pattern.parse('Z')).toThrow();
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ss.SSSx', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00.000-05');
    expect(value.timeZoneOffset).toBe('-05:00');
    expect(value.year).toBe(2025);
    expect(value.month).toBe(1);
    expect(value.day).toBe(1);
    expect(value.hour).toBe(12);
    expect(value.minute).toBe(0);
    expect(value.second).toBe(0);
    expect(value.nanoseconds).toBe(0);
  });
  it('should fail +05:30', () => {
    const pattern = new DateTimePattern('x', { locale: 'en-US' });
    expect(() => pattern.parse('+05:30')).toThrow();
  });
});
