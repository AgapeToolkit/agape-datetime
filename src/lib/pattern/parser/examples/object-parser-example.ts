// Example usage of DateTimePattern with object options
import { DateTimePattern } from '../datetime-pattern';

// Instead of creating Intl.DateTimeFormat manually:
// const intlFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
// const pattern = new DateTimePattern(intlFormat, { locale: 'en-US' });

// You can now pass the options directly:
const pattern = new DateTimePattern({ month: 'short', day: 'numeric' }, { locale: 'en-US' });

// Parse a date string
const result = pattern.parse('Dec 25');
console.log('Parsed date:', result);
// Output: { month: 12, day: 25 }

// More complex example with time and timezone
const complexPattern = new DateTimePattern({
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3,
  timeZoneName: 'short'
}, { locale: 'en-US' });

const complexResult = complexPattern.parse('December 25, 2023 at 02:30:45.123 PM EST');
console.log('Complex parsed date:', complexResult);
// Output: { year: 2023, month: 12, day: 25, hour: 14, minute: 30, second: 45, nanosecond: 123000000, parsed: { timeZoneNameShort: 'EST' } }
