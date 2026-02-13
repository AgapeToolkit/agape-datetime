import { DateTimePatternParser } from './datetime-pattern-parser';
import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';
import { LiteralDateTimeToken } from '../tokens/literal-datetime-token';
import { unicodeDateTimeTokenIndex } from '../token-definitions/unicode-datetime-token-index';
import { standardDateTimeTokenIndex } from '../token-definitions/standard-datetime-token-index';
import { TokenIndexElasticEntry, TokenIndexRegexEntry, TokenIndexStringEntry } from '../token-definitions/types';
import { ElasticNumberUnicodeDateTimeToken } from '../tokens/unicode/elastic-number-unicode-datetime-token';

export class DateTimePatternStringParser extends DateTimePatternParser {

  public readonly parts: DestructuredDateTimePatternPart[];

  constructor(private readonly pattern: string, unicode: boolean = false) {
    super();
    this.parts = this.formatToParts(pattern, unicode);
  }

  private pushLiteral(parts: DestructuredDateTimePatternPart[], text: string): void {
    if (text.length === 0) return;
    const last = parts[parts.length - 1];
    if (last) {
      if (last.token instanceof LiteralDateTimeToken) {
        last.token.value += text;
        return;
      }
    }

    parts.push({ token: new LiteralDateTimeToken(text) });
  }

  private formatToParts(pattern: string, unicode: boolean): DestructuredDateTimePatternPart[] {
    const index = unicode ? unicodeDateTimeTokenIndex : standardDateTimeTokenIndex;

    const stringEntries: TokenIndexStringEntry[] = index.filter(e => e.kind === 'string');
    const regexEntries: Array<TokenIndexRegexEntry | TokenIndexElasticEntry>  = index.filter(e => e.kind === 'regex' || e.kind === 'elastic');

    const parts: DestructuredDateTimePatternPart[] = [];
    let i = 0;

    while (i < pattern.length) {
      const character = pattern[i];

      // Handle escaped quote: \'
      if (character === '\\' && i + 1 < pattern.length && pattern[i + 1] === '\'') {
        this.pushLiteral(parts, '\'');
        i += 2;
        continue;
      }

      // Handle single-quoted literal sections
      if (character === '\'') {
        i++;
        let literal = '';
        while (i < pattern.length) {
          if (pattern[i] === '\\' && i + 1 < pattern.length && pattern[i + 1] === '\'') {
            // escaped quote inside literal
            literal += '\'';
            i += 2;
            continue;
          }
          if (pattern[i] === '\'') {
            i++; // consume closing quote
            break;
          }
          literal += pattern[i++];
        }
        this.pushLiteral(parts, literal);
        continue;
      }

      // Try fixed-string symbols (greedy, already sorted by length desc)
      let matched = false;
      for (const entry of stringEntries) {
        const sym = entry.string;
        if (pattern.startsWith(sym, i)) {

          parts.push({ token: entry.token });
          i += sym.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;

      // try regexes
      const slice = pattern.slice(i);
      for (const entry of regexEntries) {
        const match = entry.regex.exec(slice);
        if (match) {
          if (entry.token instanceof ElasticNumberUnicodeDateTimeToken && !entry.token.getTokenQualifier(parts)) {
            continue;
          }
          else {
            if (entry.kind === 'elastic') {
              const length = entry.token.getTokenLength(match[0]);
              parts.push({ token: entry.token, length });
            }
            else {
              parts.push({ token: entry.token });
            }
            i += match[0].length;
            matched = true;
            break;          }
        }
      }
      if (matched) continue;

      // Nothing matched: treat the single character as a literal.
      this.pushLiteral(parts, character);
      i++;
    }

    return parts
  }
}
