import { DateTimeToken } from '../tokens/datetime-token';
import { ElasticNumberUnicodeDateTimeToken } from '../tokens/unicode/elastic-number-unicode-datetime-token';
import { SymbolUnicodeDateTimeToken } from '../tokens/unicode/symbol-unicode-datetime-token';
import { sortDateTimeTokenIndex } from './util';
import { unicodeDateTimeTokenDefinitions } from './unicode-datetime-token-definitions';
import { TokenIndexElasticEntry, TokenIndexEntry, TokenIndexRegexEntry, TokenIndexStringEntry } from './types';

function buildUnicodeDateTimeTokenIndex(definitions: Record<string, DateTimeToken>): TokenIndexEntry[] {
  const index: TokenIndexEntry[] = [];

  for (const key of Object.keys(definitions)) {
    const token: DateTimeToken = definitions[key];

    if (token instanceof ElasticNumberUnicodeDateTimeToken) {
      const regex = new RegExp('^' + token.getTokenRegex());
      const entry: TokenIndexElasticEntry = { kind: 'elastic', token, regex };
      index.push(entry);
      continue;
    }

    if (token instanceof SymbolUnicodeDateTimeToken) {
      if (typeof token.symbol === 'string') {
        if (token.symbol.length > 0) {
          const entry: TokenIndexStringEntry = { kind: 'string', token, string: token.symbol };
          index.push(entry);
        }
      }
      else {
        const source = token.symbol.source;
        const regex = new RegExp('^' + source);
        const entry: TokenIndexRegexEntry = { kind: 'regex', token, regex };
        index.push(entry);
      }
    }
  }

  return sortDateTimeTokenIndex(index);
}

export const unicodeDateTimeTokenIndex = buildUnicodeDateTimeTokenIndex(unicodeDateTimeTokenDefinitions);
