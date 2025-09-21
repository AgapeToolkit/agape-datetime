import { unicodeDateTimeTokenDefinitions } from './unicode-datetime-token-definitions';
import { ElasticNumberDateTimeToken } from '../tokens/standard/elastic-number-datetime-token';
import { SymbolDateTimeToken } from '../tokens/standard/symbol-datetime-token';

export const standardDateTimeTokenDefinitions = {
  calendarYear: new ElasticNumberDateTimeToken({
    id: 'calendarYear',
    char: 'y',
    unicode: unicodeDateTimeTokenDefinitions.calendarYear
  }),
  isoYear: new ElasticNumberDateTimeToken({
    id: 'isoYear',
    char: 'Y',
    unicode: unicodeDateTimeTokenDefinitions.isoYear
  }),
  signedIsoYear: new ElasticNumberDateTimeToken({
    id: 'signedIsoYear',
    char: 'Y',
    unicode: unicodeDateTimeTokenDefinitions.signedIsoYear
  }),
  negativeSignedIsoYear: new ElasticNumberDateTimeToken({
    id: 'year',
    char: 'Y',
    unicode: unicodeDateTimeTokenDefinitions.negativeSignedIsoYear
  }),
  day: new SymbolDateTimeToken({
    id: 'day',
    symbol: 'D',
    unicode: unicodeDateTimeTokenDefinitions.day
  }),
  dayPadded: new SymbolDateTimeToken({
    id: 'dayPadded',
    symbol: 'DD',
    unicode: unicodeDateTimeTokenDefinitions.dayPadded
  }),
  weekdayShort: new SymbolDateTimeToken({
    id: 'weekdayShort',
    symbol: 'DDD',
    unicode: unicodeDateTimeTokenDefinitions.weekdayShort
  }),
  weekdayLong: new SymbolDateTimeToken({
    id: 'weekdayLong',
    symbol: 'DDDD',
    unicode: unicodeDateTimeTokenDefinitions.weekdayLong
  }),
  weekdayNarrow: new SymbolDateTimeToken({
    id: 'weekdayNarrow',
    symbol: 'DDDDD',
    unicode: unicodeDateTimeTokenDefinitions.weekdayNarrow
  }),
  weekdayStandaloneShort: new SymbolDateTimeToken({
    id: 'weekdayStandaloneShort',
    symbol: 'CCC',
    unicode: unicodeDateTimeTokenDefinitions.weekdayStandaloneShort
  }),
  weekdayStandaloneLong: new SymbolDateTimeToken({
    id: 'weekdayStandaloneLong',
    symbol: 'CCCC',
    unicode: unicodeDateTimeTokenDefinitions.weekdayStandaloneLong
  }),
  weekdayStandaloneNarrow: new SymbolDateTimeToken({
    id: 'weekdayStandaloneNarrow',
    symbol: 'CCCCC',
    unicode: unicodeDateTimeTokenDefinitions.weekdayStandaloneNarrow
  }),
  hour: new SymbolDateTimeToken({
    id: 'hour',
    symbol: 'h',
    unicode: unicodeDateTimeTokenDefinitions.hour
  }),
  hourPadded: new SymbolDateTimeToken({
    id: 'hourPadded',
    symbol: 'hh',
    unicode: unicodeDateTimeTokenDefinitions.hourPadded
  }),
  twelveHour: new SymbolDateTimeToken({
    id: 'twelveHour',
    symbol: 'H',
    unicode: unicodeDateTimeTokenDefinitions.twelveHour
  }),
  twelveHourPadded: new SymbolDateTimeToken({
    id: 'hourPadded',
    symbol: 'HH',
    unicode: unicodeDateTimeTokenDefinitions.twelveHourPadded
  })
};
