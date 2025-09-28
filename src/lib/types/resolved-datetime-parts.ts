export interface ResolvedDateTimeParts {
  era?: number;
  calendarYear?: number;
  year?: number;
  month?: number;
  day?: number;
  weekday?: number;
  weekdayLocal?: number;
  dayPeriod?: number;
  twelveHour?: number;
  hour?: number;
  minute?: number;
  second?: number;
  nanosecond?: number;
  timeZoneOffset?: string;
  timeZone?: string;
  timeZoneNameShort?: string;
  timeZoneNameLong?: string;
  secondsTimestamp?: number;
  millisecondsTimestamp?: number;
  nanosecondsTimestamp?: number;
  isUtc?: boolean;
}
