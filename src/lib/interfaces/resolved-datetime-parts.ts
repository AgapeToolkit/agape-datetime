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
  fractionalSecond?: number;
  timezoneOffset?: string;
  timezoneId?: string;
  timezoneNameShort?: string;
  timezoneNameLong?: string;
  secondsTimestamp?: number;
  millisecondsTimestamp?: number;
  nanosecondsTimestamp?: number;
  isUtc?: boolean;
}
