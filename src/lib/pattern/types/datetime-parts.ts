export interface DateTimeParts {
  year?: number;
  month?: number;
  day?: number;
  weekday?: number;
  hour?: number;
  minute?: number;
  second?: number;
  fractionalSecond?: number;
  timeZone?: string;
  timeZoneOffset?: string;
  secondsTimestamp?: number;
  millisecondsTimestamp?: number;
  nanosecondsTimestamp?: number;
  isUtc?: boolean;
}
