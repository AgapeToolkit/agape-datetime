import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - secondPadded', () => {
  it('should parse 01', () => {
    const pattern = new DateTimePattern('ss', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.second).toBe(1);
  });
  it('should fail not padded', () => {
    const pattern = new DateTimePattern('ss', { locale: 'en-US' });
    expect(() => pattern.parse('1')).toThrow();
  });
  it('should parse 59', () => {
    const pattern = new DateTimePattern('ss', { locale: 'en-US' });
    const value = pattern.parse('59');
    expect(value.second).toBe(59);
  });
  it('should fail 60', () => {
    const pattern = new DateTimePattern('ss', { locale: 'en-US' });
    expect(() => pattern.parse('60')).toThrow();
  });
  it('should be valid as part of a datetime', () => {
    const pattern = new DateTimePattern('YYYY-MM-DThh:mm:ss', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00');
    expect(value.second).toBe(0);
    expect(value.minute).toBe(0);
    expect(value.hour).toBe(12);
    expect(value.month).toBe(1);
    expect(value.day).toBe(1);
    expect(value.year).toBe(2025);
  });
});
