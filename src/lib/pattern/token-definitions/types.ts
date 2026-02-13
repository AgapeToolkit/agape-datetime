import { SymbolUnicodeDateTimeToken } from '../tokens/unicode/symbol-unicode-datetime-token';
import { ElasticNumberUnicodeDateTimeToken } from '../tokens/unicode/elastic-number-unicode-datetime-token';

export interface TokenIndexStringEntry {

  kind: 'string';

  token: SymbolUnicodeDateTimeToken;

  string: string;
}

export interface TokenIndexRegexEntry {

  kind: 'regex';

  token: SymbolUnicodeDateTimeToken;

  regex: RegExp;
}

export interface TokenIndexElasticEntry {
  kind: 'elastic';

  token: ElasticNumberUnicodeDateTimeToken;

  regex: RegExp;
}

export type TokenIndexEntry = TokenIndexStringEntry | TokenIndexRegexEntry | TokenIndexElasticEntry;
