import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - timezoneID', () => {
  it('should parse America/New_York', () => {
    const pattern = new DateTimePattern('V', { locale: 'en-US' });
    const value = pattern.parse('America/New_York');
    expect(value.timeZone).toBe('America/New_York');
  });
  it('should fail Europe/New_York', () => {
    const pattern = new DateTimePattern('V', { locale: 'en-US' });
    expect(() => pattern.parse('Europe/New_York')).toThrow();
  });
});
