import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - dayPadded', () => {
  it('should parse a day', () => {
    const pattern = new DateTimePattern('dd', { locale: 'ru-RU', unicode: true });
    const value = pattern.parse('01');
    expect(value.normalized.day).toBe(1);
  });
  it('should fail if day out of range', () => {
    const pattern = new DateTimePattern('dd', { locale: 'ru-RU', unicode: true });
    expect(() => pattern.parse('32')).toThrow();
  });
  it('should be invalid if not padded', () => {
    const pattern = new DateTimePattern('dd', { locale: 'ru-RU', flexible: false, unicode: true });
    expect(() => pattern.parse('1')).toThrow();
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('MM/dd/yyyy', { locale: 'ru-RU', flexible: false, unicode: true });
    const value = pattern.parse('01/01/2025');
    expect(value.normalized.month).toBe(1);
    expect(value.normalized.day).toBe(1);
    expect(value.normalized.year).toBe(2025);
  });
  it('should be invalid as part of a date', () => {
    const pattern = new DateTimePattern('MM/dd/yyyy', { locale: 'ru-RU', flexible: false, unicode: true });
    expect(() => pattern.parse('01/32/2025')).toThrow();
  });
});
