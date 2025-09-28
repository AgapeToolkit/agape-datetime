export interface DateTimeParts {
  year?: number;
  month?: number;
  day?: number;
  weekday?: number;
  hour?: number;
  minute?: number;
  second?: number;
  nanosecond?: number; // 0 to 999,999,999 (integer)
  timeZone?: string;
  timeZoneOffset?: string;
  secondsTimestamp?: number;
  millisecondsTimestamp?: number;
  nanosecondsTimestamp?: bigint;
}
