import { unicodeTokensToUseInStandardPatterns } from './unicode-datetime-token-definitions';
import { sortDateTimeTokenIndex } from './util';
import { DateTimeToken } from '../tokens/datetime-token';
import { ElasticNumberDateTimeToken } from '../tokens/standard/elastic-number-datetime-token';
import { SymbolDateTimeToken } from '../tokens/standard/symbol-datetime-token';

function buildStandardDateTimeTokenIndex(definitions: Record<string, DateTimeToken>, unicodeIndex: TokenIndexEntry[]) {
  const index: TokenIndexEntry[] = [];

  for (const key of Object.keys(definitions)) {
    const token: DateTimeToken = definitions[key];

    if (token instanceof ElasticNumberDateTimeToken) {
      const regex = new RegExp('^' + token.getTokenRegex());
      const entry: TokenIndexElasticEntry = { kind: 'elastic', token: token.unicode, regex };
      index.push(entry);
      continue;
    }

    if (token instanceof SymbolDateTimeToken) {
      if (typeof token.symbol === 'string') {
        if (token.symbol.length > 0) {
          const entry: TokenIndexStringEntry = { kind: 'string', token: token.unicode, string: token.symbol };
          index.push(entry);
        }
      }
      else {
        const source = token.symbol.source;
        const regex = new RegExp('^' + source);
        const entry: TokenIndexRegexEntry = { kind: 'regex', token: token.unicode, regex };
        index.push(entry);
      }
    }
  }

  const map: Record<string, true> = Object.fromEntries(unicodeTokensToUseInStandardPatterns.map(k => [k, true]))
  for (const entry of unicodeIndex) {
    if (map[entry.token.id]) index.push(entry);
  }

  return sortDateTimeTokenIndex(index);
}

export const standardDateTimeTokenIndex = buildStandardDateTimeTokenIndex(dateTimeTokenDefinitions, unicodeDateTimeTokenIndex);
