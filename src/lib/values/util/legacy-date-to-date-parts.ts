import { DateTimeParts } from '../../types/datetime-parts';

export function legacyDateToDateParts(date: Date, timeZone: string): DateTimeParts {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    era: 'short',
    timeZone,
    timeZoneName: 'longOffset'
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(date)

  const [datePart, timePart] = formatted.split(', ')
  const [month, day, yearPart] = datePart.split('/');
  const [year, era] = yearPart.split(' ');
  const [hour, minute, second] = timePart.split(':')
  const milliseconds = date.getMilliseconds();

  const yearNumeric = era === 'AD' ? Number(year) : (Number(year) - 1) * -1;
  
  const timeZoneOffsetMatch = formatted.match(/([+-]\d{2}:\d{2})$/);
  const timeZoneOffset = timeZoneOffsetMatch ? timeZoneOffsetMatch[1] : undefined;

  return {
    year: yearNumeric,
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minute),
    second: Number(second),
    nanoseconds: milliseconds * 1_000_000,
    timeZone: timeZone,
    timeZoneOffset: timeZoneOffset,
  }

}
