import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneNameLongOffset', () => {
  it('should parse GMT-08:00', () => {
    const pattern = new DateTimePattern('GMT-XXX', { locale: 'en-US' });
    const value = pattern.parse('GMT-08:00');
    expect(value.timeZoneOffset).toBe('-08:00');
  });
  it('should parse GMT+05:00', () => {
    const pattern = new DateTimePattern('GMT-XXX', { locale: 'en-US' });
    const value = pattern.parse('GMT+05:00');
    expect(value.timeZoneOffset).toBe('+05:00');
  });
  it('should parse GMT-05:30', () => {
    const pattern = new DateTimePattern('GMT-XXX', { locale: 'en-US' });
    const value = pattern.parse('GMT-05:30');
    expect(value.timeZoneOffset).toBe('-05:30');
  });
  it('should parse GMT+09:30:00', () => {
    const pattern = new DateTimePattern('GMT-XXX', { locale: 'en-US' });
    const value = pattern.parse('GMT+09:30:00');
    expect(value.timeZoneOffset).toBe('+09:30');
  });
  it('should parse GMT-12:00:00', () => {
    const pattern = new DateTimePattern('GMT-XXX', { locale: 'en-US' });
    const value = pattern.parse('GMT-12:00:00');
    expect(value.timeZoneOffset).toBe('-12:00');
  });
  it('should be valid as part of a date', () => {
    const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ss.SSSGMT-XXX', { locale: 'en-US' });
    const value = pattern.parse('2025-01-01T12:00:00.000GMT-08:00');
    expect(value.timeZoneOffset).toBe('-08:00');
    expect(value.year).toBe(2025);
    expect(value.month).toBe(1);
    expect(value.day).toBe(1);
    expect(value.hour).toBe(12);
    expect(value.minute).toBe(0);
    expect(value.second).toBe(0);
    expect(value.nanosecond).toBe(0);
  });
  it('should fail PST', () => {
    const pattern = new DateTimePattern('GMT-XXX', { locale: 'en-US' });
    expect(() => pattern.parse('PST')).toThrow();
  });
  it('should fail Europe/New_York', () => {
    const pattern = new DateTimePattern('GMT-XXX', { locale: 'en-US' });
    expect(() => pattern.parse('Europe/New_York')).toThrow();
  });
});
