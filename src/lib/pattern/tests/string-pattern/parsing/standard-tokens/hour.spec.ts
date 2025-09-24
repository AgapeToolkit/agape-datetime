import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - hour', () => {
  it('should parse 1', () => {
    const pattern = new DateTimePattern('h', { locale: 'en-US' });
    const value = pattern.parse('1');
    expect(value.normalized.hour).toBe(1);
  });
  it('should parse padded 01', () => {
    const pattern = new DateTimePattern('h', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.normalized.hour).toBe(1);
  });
  it('should parse 23', () => {
    const pattern = new DateTimePattern('h', { locale: 'en-US' });
    const value = pattern.parse('23');
    expect(value.normalized.hour).toBe(23);
  });
  it('should fail flexible false and padded', () => {
    const pattern = new DateTimePattern('h', { locale: 'en-US', flexible: false });
    expect(() => pattern.parse('01')).toThrow();
  });
  it('should fail out of range', () => {
    const pattern = new DateTimePattern('h', { locale: 'en-US' });
    expect(() => pattern.parse('24')).toThrow();
  });
  it('should be valid as part of a datetime', () => {
    const pattern = new DateTimePattern('Y-M-DTh:m', { locale: 'en-US' });
    const value = pattern.parse('2015-1-1T12:0');
    expect(value.normalized.hour).toBe(12);
    expect(value.normalized.minute).toBe(0);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.year).toBe(2015);
  });
});
