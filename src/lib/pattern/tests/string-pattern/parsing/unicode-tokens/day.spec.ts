import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - day (unicode)', () => {
  it('should parse a day', () => {
    const pattern = new DateTimePattern('d', { locale: 'ru-RU', unicode: true });
    const value = pattern.parse('1');
    expect(value.normalized.day).toBe(1);
  });
  it('should fail if day out of range', () => {
    const pattern = new DateTimePattern('d', { locale: 'ru-RU', unicode: true });
    expect(() => pattern.parse('32')).toThrow();
  });
  it('should parse a day padded', () => {
    const pattern = new DateTimePattern('d', { locale: 'ru-RU', unicode: true });
    const value = pattern.parse('01');
    expect(value.normalized.day).toBe(1);
  });
  it('should be invalid if padded and flexible is false', () => {
    const pattern = new DateTimePattern('d', { locale: 'ru-RU', flexible: false, unicode: true });
    expect(() => pattern.parse('01')).toThrow();
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('M/d/y', { locale: 'ru-RU', flexible: false, unicode: true });
    const value = pattern.parse('1/1/2025');
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.year).toBe(2025);
  });
});
