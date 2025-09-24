import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneOffsetWithoutZ_xxxxx', () => {
  it('should parse +00:00', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    const value = pattern.parse('+00:00');
    expect(value.normalized.timeZoneOffset).toBe('+00:00');
  });
  it('should parse -00:00', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    const value = pattern.parse('-00:00');
    expect(value.normalized.timeZoneOffset).toBe('-00:00');
  });
  it('should parse +05:00', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    const value = pattern.parse('+05:00');
    expect(value.normalized.timeZoneOffset).toBe('+05:00');
  });
  it('should parse -05:30', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    const value = pattern.parse('-05:30');
    expect(value.normalized.timeZoneOffset).toBe('-05:30');
  });
  it('should parse +12:34:56', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    const value = pattern.parse('+12:34:56');
    expect(value.normalized.timeZoneOffset).toBe('+12:34:56');
  });
  it('should parse -12:34:56', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    const value = pattern.parse('-12:34:56');
    expect(value.normalized.timeZoneOffset).toBe('-12:34:56');
  });
  it('should fail Z', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    expect(() => pattern.parse('Z')).toThrow();
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ss.SSSxxxxx', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00.000-12:34:56');
    expect(value.normalized.timeZoneOffset).toBe('-12:34:56');
    expect(value.normalized.year).toBe(2025);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.hour).toBe(12);
    expect(value.normalized.minute).toBe(0);
    expect(value.normalized.second).toBe(0);
    expect(value.normalized.fractionalSecond).toBe(0);
  });
  it('should fail +0530', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    expect(() => pattern.parse('+0530')).toThrow();
  });
  it('should fail +123456', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    expect(() => pattern.parse('+123456')).toThrow();
  });
  it('should fail +05', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    expect(() => pattern.parse('+05')).toThrow();
  });
  it('should fail +12:3', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    expect(() => pattern.parse('+12:3')).toThrow();
  });
  it('should fail +12:34:5', () => {
    const pattern = new DateTimePattern('xxxxx', { locale: 'en-US' });
    expect(() => pattern.parse('+12:34:5')).toThrow();
  });
});
