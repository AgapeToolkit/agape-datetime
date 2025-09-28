import { DateTimePatternIntlParser } from './datetime-pattern-intl-parser';
import { LiteralDateTimeToken } from '../tokens/literal-datetime-token';

describe('DateTimePatternIntlParser', () => {
  describe('basic functionality', () => {
    it('should parse a simple date format', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have year, month, day tokens plus literals
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('VerboseMonthUnicodeDateTimeToken'); // monthShort
      expect(tokenTypes).toContain('LiteralDateTimeToken'); // separators
    });

    it('should handle standalone month format', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        month: 'long'
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should use standalone month token since no other date elements
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('VerboseMonthUnicodeDateTimeToken');
    });

    it('should handle time format with 12-hour clock', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have hour, minute, and dayPeriod tokens
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('NumberUnicodeDateTimeToken'); // twelveHour
      expect(tokenTypes).toContain('NumberUnicodeDateTimeToken'); // minutePadded
      expect(tokenTypes).toContain('DayPeriodUnicodeDateTimeToken'); // dayPeriod
    });

    it('should handle time format with 24-hour clock', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have hour and minute tokens, no dayPeriod
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('NumberUnicodeDateTimeToken'); // hourPadded
      expect(tokenTypes).toContain('NumberUnicodeDateTimeToken'); // minutePadded
    });

    it('should handle weekday format', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have weekday token (contextual since it appears with other date elements)
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('VerboseWeekdayUnicodeDateTimeToken'); // weekdayLong
    });

    it('should handle standalone weekday format', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        weekday: 'short'
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have standalone weekday token
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('VerboseWeekdayUnicodeDateTimeToken'); // weekdayStandaloneShort
    });

    it('should handle era format', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        era: 'short',
        year: 'numeric'
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have era token
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('VerboseEraUnicodeDateTimeToken'); // eraShort
    });

    it('should handle timezone format', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        timeZoneName: 'short'
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have timezone token
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('VerboseTimeZoneNameUnicodeDateTimeToken'); // timeZoneNameShort
    });

    it('should handle fractional seconds', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      expect(parser.parts.length).toBeGreaterThan(0);
      
      // Should have fractional second token (currently using nanoseconds token)
      const tokenTypes = parser.parts.map(part => part.token.constructor.name);
      expect(tokenTypes).toContain('FractionalSecondUnicodeDateTimeToken'); // nanoseconds
    });
  });

  describe('edge cases', () => {
    it('should handle empty format', () => {
      const intlFormat = new Intl.DateTimeFormat('en-US', {});
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      // Should still have some parts (likely just literals)
      expect(parser.parts.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle unmapped format parts gracefully', () => {
      // This test would need to be updated when we encounter unmapped parts
      const intlFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const parser = new DateTimePatternIntlParser(intlFormat);
      
      expect(parser.parts).toBeDefined();
      
      // Check that we don't have any unmapped parts in this basic case
      const hasUnmapped = parser.parts.some(part => 
        part.token instanceof LiteralDateTimeToken && 
        (part.token as LiteralDateTimeToken).value.includes('[UNMAPPED:')
      );
      expect(hasUnmapped).toBe(false);
    });
  });
});
