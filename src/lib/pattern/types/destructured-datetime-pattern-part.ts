import { LiteralDateTimeToken } from '../tokens/literal-datetime-token';
import { UnicodeDateTimeToken } from '../tokens/unicode/unicode-datetime-token';

export interface DestructuredDateTimePatternPart {
  token: UnicodeDateTimeToken | LiteralDateTimeToken;
  length?: number;
}
