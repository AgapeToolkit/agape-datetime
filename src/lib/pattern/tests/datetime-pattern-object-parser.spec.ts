import { DateTimePattern } from '../datetime-pattern';

describe('DateTimePattern - Object Parser', () => {
  it('should parse with month and day options', () => {
    const pattern = new DateTimePattern({ month: 'short', day: 'numeric' }, { locale: 'en-US' });
    const value = pattern.parse('Dec 25');
    expect(value.month).toBe(12);
    expect(value.day).toBe(25);
  });

  it('should parse with year, month, and day options', () => {
    const pattern = new DateTimePattern({ year: 'numeric', month: 'long', day: 'numeric' }, { locale: 'en-US' });
    const value = pattern.parse('December 25, 2023');
    expect(value.year).toBe(2023);
    expect(value.month).toBe(12);
    expect(value.day).toBe(25);
  });

  it('should parse with time options', () => {
    const pattern = new DateTimePattern({ 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    }, { locale: 'en-US' });
    const value = pattern.parse('02:30:45 PM');
    expect(value.hour).toBe(14);
    expect(value.minute).toBe(30);
    expect(value.second).toBe(45);
  });

  it('should parse with timezone options', () => {
    const pattern = new DateTimePattern({ 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZoneName: 'short'
    }, { locale: 'en-US' });
    const value = pattern.parse('Dec 25, 2023, EST');
    expect(value.year).toBe(2023);
    expect(value.month).toBe(12);
    expect(value.day).toBe(25);
    expect(value.parsed?.timeZoneNameShort).toBe('EST');
  });

  it('should parse with fractional seconds', () => {
    const pattern = new DateTimePattern({ 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    }, { locale: 'en-US' });
    const value = pattern.parse('02:30:45.123 PM');
    expect(value.hour).toBe(14);
    expect(value.minute).toBe(30);
    expect(value.second).toBe(45);
    expect(value.nanosecond).toBe(123000000); // 123ms * 1,000,000 = 123,000,000 nanoseconds
  });

  it('should parse with weekday options', () => {
    const pattern = new DateTimePattern({ 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }, { locale: 'en-US' });
    const value = pattern.parse('Monday, December 25, 2023');
    expect(value.year).toBe(2023);
    expect(value.month).toBe(12);
    expect(value.day).toBe(25);
    expect(value.parsed?.weekdayLong).toBe('Monday');
  });

  it('should parse with era options', () => {
    const pattern = new DateTimePattern({ 
      era: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }, { locale: 'en-US' });
    const value = pattern.parse('Dec 25, 2023 AD');
    expect(value.year).toBe(2023);
    expect(value.month).toBe(12);
    expect(value.day).toBe(25);
    expect(value.parsed?.eraShort).toBe('AD');
  });

  it('should work with different locales', () => {
    const pattern = new DateTimePattern({ 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }, { locale: 'fr-FR' });
    const value = pattern.parse('25 décembre 2023');
    expect(value.year).toBe(2023);
    expect(value.month).toBe(12);
    expect(value.day).toBe(25);
  });

  it('should handle complex date-time patterns', () => {
    const pattern = new DateTimePattern({ 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      timeZoneName: 'short'
    }, { locale: 'en-US' });
    const value = pattern.parse('12/25/2023, 02:30:45.123 PM PST');
    expect(value.year).toBe(2023);
    expect(value.month).toBe(12);
    expect(value.day).toBe(25);
    expect(value.hour).toBe(14);
    expect(value.minute).toBe(30);
    expect(value.second).toBe(45);
    expect(value.nanosecond).toBe(123000000);
    expect(value.parsed?.timeZoneNameShort).toBe('PST');
  });
});
