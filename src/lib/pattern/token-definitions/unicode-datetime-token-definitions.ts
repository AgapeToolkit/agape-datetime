import { VerboseEraUnicodeDateTimeToken } from '../tokens/unicode/verbose-era-unicode-datetime-token';
import { ElasticCalendarYearUnicodeDateTimeToken } from '../tokens/unicode/elastic-calendar-year-unicode-datetime-token';
import { ElasticNumberUnicodeDateTimeToken } from '../tokens/unicode/elastic-number-unicode-datetime-token';
import { NumberUnicodeDateTimeToken } from '../tokens/unicode/number-unicode-datetime-token';
import { VerboseMonthUnicodeDateTimeToken } from '../tokens/unicode/verbose-month-unicode-datetime-token';
import { VerboseWeekdayUnicodeDateTimeToken } from '../tokens/unicode/verbose-weekday-unicode-datetime-token';
import { DayPeriodUnicodeDateTimeToken } from '../tokens/unicode/day-period-unicode-datetime-token';
import { FractionalSecondUnicodeDateTimeToken } from '../tokens/unicode/fractional-second-unicode-datetime-token';
import { TimeZoneOffsetUnicodeDateTimeToken } from '../tokens/unicode/timezone-offset-unicode-datetime-token';
import { TimeZoneIdUnicodeDateTimeToken } from '../tokens/unicode/timezone-id-unicode-datetime-token';
import { VerboseTimeZoneNameUnicodeDateTimeToken } from '../tokens/unicode/verbose-timezone-name-unicode-datetime-token';

export const unicodeDateTimeTokenDefinitions = {
  eraShort: new VerboseEraUnicodeDateTimeToken({
    id: 'eraShort',
    symbol: /G{1,3}/,
    variation: 'short',
  }),
  eraLong: new VerboseEraUnicodeDateTimeToken({
    id: 'eraLong',
    symbol: 'GGGG',
    variation: 'long',
  }),
  eraNarrow: new VerboseEraUnicodeDateTimeToken({
    id: 'eraNarrow',
    symbol: 'GGGGG',
    variation: 'narrow',
  }),
  commonEraShort: new VerboseEraUnicodeDateTimeToken({
    id: 'commonEraShort',
    symbol: /g{1,3}/,
    variation: 'short',
    common: true,
  }),
  commonEraLong: new VerboseEraUnicodeDateTimeToken({
    id: 'commonEraLong',
    symbol: 'gggg',
    variation: 'long',
    common: true,
  }),
  commonEraNarrow: new VerboseEraUnicodeDateTimeToken({
    id: 'commonEraNarrow',
    symbol: 'ggggg',
    variation: 'narrow',
    common: true,
  }),
  calendarYear: new ElasticCalendarYearUnicodeDateTimeToken({
    id: 'calendarYear',
    char: 'y',
  }),
  isoYear: new ElasticNumberUnicodeDateTimeToken({
    id: 'isoYear',
    name: 'year',
    char: 'u',
  }),
  signedIsoYear: new ElasticNumberUnicodeDateTimeToken({
    id: 'signedIsoYear',
    name: 'year',
    char: 'u',
    prefix: '+',
  }),
  negativeSignedIsoYear: new ElasticNumberUnicodeDateTimeToken({
    id: 'signedIsoYear',
    name: 'year',
    char: 'u',
    prefix: '-',
  }),
  month: new NumberUnicodeDateTimeToken({
    id: 'month',
    symbol: 'M',
    regex: `0?[1-9]|1[0-2]`,
    fixedWidthRegex: '[1-9]|1[0-2]',
  }),
  monthPadded: new NumberUnicodeDateTimeToken({
    id: 'monthPadded',
    name: 'month',
    symbol: 'MM',
    regex: `0[1-9]|1[0-2]`,
  }),
  monthShort: new VerboseMonthUnicodeDateTimeToken({
    id: 'monthShort',
    symbol: 'MMM',
    variation: 'short',
  }),
  monthLong: new VerboseMonthUnicodeDateTimeToken({
    id: 'monthLong',
    symbol: 'MMMM',
    variation: 'long',
  }),
  monthNarrow: new VerboseMonthUnicodeDateTimeToken({
    id: 'monthNarrow',
    symbol: 'MMMMM',
    variation: 'narrow',
  }),
  monthStandaloneShort: new VerboseMonthUnicodeDateTimeToken({
    id: 'monthStandaloneShort',
    symbol: 'LLL',
    variation: 'short',
    standalone: true,
  }),
  monthStandaloneLong: new VerboseMonthUnicodeDateTimeToken({
    id: 'monthStandaloneLong',
    symbol: 'LLLL',
    variation: 'long',
    standalone: true,
  }),
  monthStandaloneNarrow: new VerboseMonthUnicodeDateTimeToken({
    id: 'monthStandaloneNarrow',
    symbol: 'LLLLL',
    variation: 'narrow',
    standalone: true,
  }),
  day: new NumberUnicodeDateTimeToken({
    id: 'day',
    symbol: 'd',
    regex: `0?[1-9]|[12][0-9]|3[01]`,
    fixedWidthRegex: `[1-9]|[12][0-9]|3[01]`,
  }),
  dayPadded: new NumberUnicodeDateTimeToken({
    id: 'dayPadded',
    name: 'day',
    symbol: 'dd',
    regex: `0[1-9]|[12][0-9]|3[01]`,
  }),
  weekdayShort: new VerboseWeekdayUnicodeDateTimeToken({
    id: 'weekdayShort',
    symbol: 'EEE',
    variation: 'short',
  }),
  weekdayLong: new VerboseWeekdayUnicodeDateTimeToken({
    id: 'weekdayLong',
    symbol: 'EEEE',
    variation: 'long',
  }),
  weekdayNarrow: new VerboseWeekdayUnicodeDateTimeToken({
    id: 'weekdayNarrow',
    symbol: 'EEEEE',
    variation: 'narrow',
  }),
  weekdayStandaloneShort: new VerboseWeekdayUnicodeDateTimeToken({
    id: 'weekdayStandaloneShort',
    symbol: 'ccc',
    variation: 'short',
    standalone: true,
  }),
  weekdayStandaloneLong: new VerboseWeekdayUnicodeDateTimeToken({
    id: 'weekdayStandaloneLong',
    symbol: 'cccc',
    variation: 'long',
    standalone: true,
  }),
  weekdayStandaloneNarrow: new VerboseWeekdayUnicodeDateTimeToken({
    id: 'weekdayStandaloneNarrow',
    symbol: 'ccccc',
    variation: 'narrow',
    standalone: true,
  }),
  weekday: new NumberUnicodeDateTimeToken({
    id: 'weekday',
    symbol: 'i',
    regex: `0?[1-7]`,
    fixedWidthRegex: `[1-7]`,
  }),
  weekdayPadded: new NumberUnicodeDateTimeToken({
    id: 'weekdayPadded',
    name: 'weekday',
    symbol: 'ii',
    regex: `0[1-7]`,
  }),
  weekdayLocal: new NumberUnicodeDateTimeToken({
    id: 'weekdayLocal',
    symbol: 'e',
    regex: `0?[1-7]`,
    fixedWidthRegex: `[1-7]`,
  }),
  weekdayLocalPadded: new NumberUnicodeDateTimeToken({
    id: 'weekdayLocalPadded',
    name: 'weekdayLocal',
    symbol: 'ee',
    regex: `0[1-7]`,
  }),
  dayPeriod: new DayPeriodUnicodeDateTimeToken({
    id: 'dayPeriod',
    symbol: /a{1,2}/,
    variation: 'default',
  }),
  dayPeriodShort: new DayPeriodUnicodeDateTimeToken({
    id: 'dayPeriodShort',
    symbol: 'aaa',
    variation: 'short',
  }),
  dayPeriodLong: new DayPeriodUnicodeDateTimeToken({
    id: 'dayPeriodLong',
    symbol: 'aaaa',
    variation: 'long',
  }),
  dayPeriodNarrow: new DayPeriodUnicodeDateTimeToken({
    id: 'dayPeriodNarrow',
    symbol: 'aaaaa',
    variation: 'narrow',
  }),
  twelveHour: new NumberUnicodeDateTimeToken({
    id: 'twelveHour',
    symbol: 'h',
    regex: `0?[1-9]|1[0-2]`,
    fixedWidthRegex: `[1-9]|1[0-2]`,
  }),
  twelveHourPadded: new NumberUnicodeDateTimeToken({
    id: 'twelveHourPadded',
    name: 'twelveHour',
    symbol: 'hh',
    regex: `0[1-9]|1[0-2]`,
  }),
  hour: new NumberUnicodeDateTimeToken({
    id: 'hour',
    symbol: 'H',
    regex: `0?[0-9]|1[0-9]|2[0-3]`,
    fixedWidthRegex: `[0-9]|1[0-9]|2[0-3]`,
  }),
  hourPadded: new NumberUnicodeDateTimeToken({
    id: 'hourPadded',
    name: 'hour',
    symbol: 'HH',
    regex: `0[0-9]|1[0-9]|2[0-3]`,
  }),
  minute: new NumberUnicodeDateTimeToken({
    id: 'minute',
    symbol: 'm',
    regex: `0?[0-9]|[1-5][0-9]`,
    fixedWidthRegex: `[0-9]|[1-5][0-9]`,
  }),
  minutePadded: new NumberUnicodeDateTimeToken({
    id: 'minutePadded',
    name: 'minute',
    symbol: 'mm',
    regex: `[0-5][0-9]`,
  }),
  second: new NumberUnicodeDateTimeToken({
    id: 'second',
    symbol: 's',
    regex: `0?[0-9]|[1-5][0-9]`,
    fixedWidthRegex: `[0-9]|[1-5][0-9]`,
  }),
  secondPadded: new NumberUnicodeDateTimeToken({
    id: 'secondPadded',
    name: 'second',
    symbol: 'ss',
    regex: `[0-5][0-9]`,
  }),
  fractionalSecond: new FractionalSecondUnicodeDateTimeToken({
    id: 'fractionalSecond',
    char: 'S',
  }),
  timeZoneOffsetZ: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetZ',
    symbol: 'Z',
    regex: 'Z',
  }),
  timeZoneOffsetWithZ_X: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithZ_X',
    symbol: 'X', // “Z” or ±HH or ±HHMM  (e.g., Z, -08, +0530)
    regex: `(?:Z|[+-](?:0[0-9]|1[0-4])(?:[0-5][0-9])?)`,
  }),
  timeZoneOffsetWithZ_XX: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithZ_XX',
    symbol: 'XX', // “Z” or ±HHMM  (e.g., Z, -0800, +0530)
    regex: `(?:Z|[+-](?:0[0-9]|1[0-4])[0-5][0-9])`,
  }),
  timeZoneOffsetWithZ_XXX: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithZ_XXX',
    symbol: 'XXX', // “Z” or ±HH:MM  (e.g., Z, -08:00, +05:30)
    regex: `(?:Z|[+-](?:0[0-9]|1[0-4]):[0-5][0-9])`,
  }),
  timeZoneOffsetWithZ_XXXX: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithZ_XXXX',
    symbol: 'XXXX', // “Z” or ±HHMM or ±HHMMSS  (e.g., Z, -0800, +0530, +123456)
    regex: `(?:Z|[+-](?:0[0-9]|1[0-4])(?:[0-5][0-9]){1,2})`,
  }),
  timeZoneOffsetWithZ_XXXXX: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithZ_XXXXX',
    symbol: 'XXXXX', // “Z” or ±HH:MM or ±HH:MM:SS  (e.g., Z, -08:00, +05:30, +12:34:56)
    regex: `(?:Z|[+-](?:0[0-9]|1[0-4]):[0-5][0-9](?::[0-5][0-9])?)`,
  }),
  timeZoneOffsetWithoutZ_x: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithoutZ_x',
    symbol: 'x', //±HH or ±HHMM  (e.g., -08, +0530, +00)
    regex: `[+-](?:0[0-9]|1[0-4])(?:[0-5][0-9])?`,
  }),
  timeZoneOffsetWithoutZ_xx: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithoutZ_xx',
    symbol: 'xx', // “±HHMM  (e.g., -0800, +0530, +0000)
    regex: `[+-](?:0[0-9]|1[0-4])[0-5][0-9]`,
  }),
  timeZoneOffsetWithoutZ_xxx: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithoutZ_xxx',
    symbol: 'xxx', // ±HH:MM  (e.g., -08:00, +05:30, +00:00)
    regex: `[+-](?:0[0-9]|1[0-4]):[0-5][0-9]`,
  }),
  timeZoneOffsetWithoutZ_xxxx: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithoutZ_xxxx',
    symbol: 'xxxx', // ±HHMM or ±HHMMSS  (e.g., -0800, +0530, +0000, +123456)
    regex: `[+-](?:0[0-9]|1[0-4])(?:[0-5][0-9]){1,2}`,
  }),
  timeZoneOffsetWithoutZ_xxxxx: new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timeZoneOffsetWithoutZ_xxxxx',
    symbol: 'xxxxx', // ±HH:MM or ±HH:MM:SS  (e.g., -08:00, +05:30, +00:00, +12:34:56)
    regex: `[+-](?:0[0-9]|1[0-4]):[0-5][0-9](?::[0-5][0-9])?`,
  }),
  timeZoneId: new TimeZoneIdUnicodeDateTimeToken({
    id: 'timeZoneId',
    symbol: 'V',
    regex: `(?:UTC|GMT|[A-Za-z][A-Za-z0-9._+-]*(?:\\/[A-Za-z0-9._+-]+)+)`,
  }),
  timeZoneNameShort: new VerboseTimeZoneNameUnicodeDateTimeToken({
    id: 'timeZoneNameShort',
    name: 'timeZoneNameShort',
    symbol: /z{1,3}/,
    variation: 'short',
    regex: `(?:[A-Z]{2,5}|(?:UTC|GMT)(?:[+\\u2212-](?:(?:0[0-9]|1[0-4])(?::?[0-5][0-9])?))?)`,
  }),
  timeZoneNameLong: new VerboseTimeZoneNameUnicodeDateTimeToken({
    id: 'timeZoneNameLong',
    symbol: 'zzzz',
    variation: 'long',
    regex: `(?:(?:UTC|GMT)(?:[+\\u2212-](?:1[0-4]|0?\\d)(?::[0-5]\\d)?)?|[\\p{L}\\p{M}\\p{N}\\p{Pc}\\p{Pd}\\p{Po} ]{3,})`,
  }),
  secondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'secondsTimestamp',
    name: 'secondsTimestamp',
    char: 't',
  }),
  signedSecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'signedSecondsTimestamp',
    name: 'secondsTimestamp',
    char: 't',
    prefix: '+',
  }),
  negativeSignedSecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'negativeSignedSecondsTimestamp',
    name: 'secondsTimestamp',
    char: 't',
    prefix: '-',
  }),
  millisecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'millisecondsTimestamp',
    name: 'millisecondsTimestamp',
    char: 'n',
  }),
  signedMillisecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'signedMillisecondsTimestamp',
    name: 'millisecondsTimestamp',
    char: 'n',
    prefix: '+',
  }),
  negativeSignedMillisecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'negativeSignedMillisecondsTimestamp',
    name: 'millisecondsTimestamp',
    char: 'n',
    prefix: '-',
  }),
  nanosecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'nanosecondsTimestamp',
    name: 'nanosecondsTimestamp',
    char: 'N',
  }),
  signedNanosecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'signedNanosecondsTimestamp',
    name: 'nanosecondsTimestamp',
    char: 'N',
    prefix: '+',
  }),
  negativeSignedNanosecondsTimestamp: new ElasticNumberUnicodeDateTimeToken({
    id: 'negativeSignedNanosecondsTimestamp',
    name: 'nanosecondsTimestamp',
    char: 'N',
    prefix: '-',
  }),
} as const;


