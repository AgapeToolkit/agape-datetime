export interface NormalizedDateTimeParts {
  year?: number;
  month?: number;
  day?: number;
  weekday?: number;
  hour?: number;
  minute?: number;
  second?: number;
  fractionalSecond?: number;
  timezoneOffset?: string;
  timezoneId?: string;
  secondsTimestamp?: number;
  millisecondsTimestamp?: number;
  nanosecondsTimestamp?: number;
  isUtc?: boolean;
}
