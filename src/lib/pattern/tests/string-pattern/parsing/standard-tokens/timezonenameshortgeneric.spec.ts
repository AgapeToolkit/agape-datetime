import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timeZoneNameShortGeneric', () => {
  it('should parse PT', () => {
    const pattern = new DateTimePattern('ZZZ', { locale: 'en-US' });
    const value = pattern.parse('PT');
    expect(value.parsed?.timeZoneNameShortGeneric).toBe('PT');
  });
  it('should parse ET', () => {
    const pattern = new DateTimePattern('ZZZ', { locale: 'en-US' });
    const value = pattern.parse('ET');
    expect(value.parsed?.timeZoneNameShortGeneric).toBe('ET');
  });
  it('should parse CT', () => {
    const pattern = new DateTimePattern('ZZZ', { locale: 'en-US' });
    const value = pattern.parse('CT');
    expect(value.parsed?.timeZoneNameShortGeneric).toBe('CT');
  });
  it('should parse MT', () => {
    const pattern = new DateTimePattern('ZZZ', { locale: 'en-US' });
    const value = pattern.parse('MT');
    expect(value.parsed?.timeZoneNameShortGeneric).toBe('MT');
  });
  it('should fail PST', () => {
    const pattern = new DateTimePattern('ZZZ', { locale: 'en-US' });
    expect(() => pattern.parse('PST')).toThrow();
  });
  it('should fail Europe/New_York', () => {
    const pattern = new DateTimePattern('ZZZ', { locale: 'en-US' });
    expect(() => pattern.parse('Europe/New_York')).toThrow();
  });
});
