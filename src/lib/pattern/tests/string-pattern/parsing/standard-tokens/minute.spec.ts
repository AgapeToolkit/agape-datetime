import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - minute', () => {
  it('should parse 1', () => {
    const pattern = new DateTimePattern('m', { locale: 'en-US' });
    const value = pattern.parse('1');
    expect(value.normalized.minute).toBe(1);
  });
  it('should parse padded 01', () => {
    const pattern = new DateTimePattern('m', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.normalized.minute).toBe(1);
  });
  it('should parse 59', () => {
    const pattern = new DateTimePattern('m', { locale: 'en-US' });
    const value = pattern.parse('59');
    expect(value.normalized.minute).toBe(59);
  });
  it('should fail 60', () => {
    const pattern = new DateTimePattern('m', { locale: 'en-US' });
    expect(() => pattern.parse('60')).toThrow();
  });
  it('should fail flexible false and padded', () => {
    const pattern = new DateTimePattern('m', { locale: 'en-US', flexible: false });
    expect(() => pattern.parse('01')).toThrow();
  });
  it('should be valid as part of a datetime', () => {
    const pattern = new DateTimePattern('Y-M-DTh:m', { locale: 'en-US' });
    const value = pattern.parse('2025-1-1T12:0');
    expect(value.normalized.minute).toBe(0);
    expect(value.normalized.hour).toBe(12);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.year).toBe(2025);
  });
});
