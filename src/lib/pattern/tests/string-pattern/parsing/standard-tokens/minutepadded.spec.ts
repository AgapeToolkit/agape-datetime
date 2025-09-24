import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - minutePadded', () => {
  it('should parse 01', () => {
    const pattern = new DateTimePattern('mm', { locale: 'en-US' });
    const value = pattern.parse('01');
    expect(value.normalized.minute).toBe(1);
  });
  it('should fail not padded', () => {
    const pattern = new DateTimePattern('mm', { locale: 'en-US' });
    expect(() => pattern.parse('1')).toThrow();
  });
  it('should parse 59', () => {
    const pattern = new DateTimePattern('mm', { locale: 'en-US' });
    const value = pattern.parse('59');
    expect(value.normalized.minute).toBe(59);
  });
  it('should fail 60', () => {
    const pattern = new DateTimePattern('mm', { locale: 'en-US' });
    expect(() => pattern.parse('60')).toThrow();
  });
  it('should be valid as part of a datetime', () => {
    const pattern = new DateTimePattern('YYYY-MM-DThh:mm', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00');
    expect(value.normalized.minute).toBe(0);
    expect(value.normalized.hour).toBe(12);
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.year).toBe(2025);
  });
});
