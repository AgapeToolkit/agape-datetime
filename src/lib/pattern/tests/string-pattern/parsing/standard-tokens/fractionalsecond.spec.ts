import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - nanoseconds', () => {
  it('should parse 100', () => {
    const pattern = new DateTimePattern('SSS', { locale: 'en-US' });
    const value = pattern.parse('100');
    expect(value.nanoseconds).toBe(100000000);
  });
  it('should parse 0', () => {
    const pattern = new DateTimePattern('S', { locale: 'en-US' });
    const value = pattern.parse('0');
    expect(value.nanoseconds).toBe(0);
  });
  it('should parse padded 000001', () => {
    const pattern = new DateTimePattern('SSSSSS', { locale: 'en-US' });
    const value = pattern.parse('000001');
    expect(value.nanoseconds).toBe(1000);
  });
  it('should fail not padded', () => {
    const pattern = new DateTimePattern('SSSSSS', { locale: 'en-US' });
    expect(() => pattern.parse('100')).toThrow();
  });
  it('should be elastic', () => {
    const pattern = new DateTimePattern('SSS', { locale: 'en-US' });
    const value = pattern.parse('123456');
    expect(value.nanoseconds).toBe(123456000);
  });
  it('should be nonelastic', () => {
    const pattern = new DateTimePattern('SSS', { locale: 'en-US', elastic: false });
    expect(() => pattern.parse('123456')).toThrow();
  });
});
