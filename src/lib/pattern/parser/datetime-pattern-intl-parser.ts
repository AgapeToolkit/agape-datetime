import { DestructuredDateTimePatternPart } from '../types/destructured-datetime-pattern-part';
import { DateTimePatternParser } from './datetime-pattern-parser';
import { LiteralDateTimeToken } from '../tokens/literal-datetime-token';
import { unicodeDateTimeTokenDefinitions } from '../token-definitions/unicode-datetime-token-definitions';
import { UnicodeDateTimeToken } from '../tokens/unicode/unicode-datetime-token';

export class DateTimePatternIntlParser extends DateTimePatternParser {

  public readonly parts: DestructuredDateTimePatternPart[];

  constructor(private readonly intlFormat: Intl.DateTimeFormat) {
    super();
    this.parts = this.formatToParts(intlFormat);
  }

  private formatToParts(intlFormat: Intl.DateTimeFormat): DestructuredDateTimePatternPart[] {
    // Use a known date to get consistent formatToParts output
    const knownDate = new Date(2023, 11, 25, 14, 30, 45, 123); // Dec 25, 2023, 2:30:45.123 PM
    const formatParts = intlFormat.formatToParts(knownDate);
    const resolvedOptions = intlFormat.resolvedOptions();
    
    const parts: DestructuredDateTimePatternPart[] = [];
    
    for (const part of formatParts) {
      if (part.type === 'literal') {
        parts.push({ token: new LiteralDateTimeToken(part.value) });
      } else {
        const token = this.mapFormatPartToToken(part, resolvedOptions, formatParts);
        if (token) {
          parts.push({ token });
        } else {
          // Create a stub for unmapped parts
          parts.push({ token: new LiteralDateTimeToken(`[UNMAPPED:${part.type}:${part.value}]`) });
        }
      }
    }
    
    return parts;
  }

  private mapFormatPartToToken(
    part: Intl.DateTimeFormatPart, 
    resolvedOptions: Intl.ResolvedDateTimeFormatOptions,
    allParts: Intl.DateTimeFormatPart[]
  ): UnicodeDateTimeToken | null {
    switch (part.type) {
      case 'era':
        return this.mapEraToken(part.value, resolvedOptions.era);
      
      case 'year':
        return this.mapYearToken(part.value, resolvedOptions.year);
      
      case 'month':
        return this.mapMonthToken(part.value, resolvedOptions.month, allParts);
      
      case 'day':
        return this.mapDayToken(part.value, resolvedOptions.day);
      
      case 'weekday':
        return this.mapWeekdayToken(part.value, resolvedOptions.weekday, allParts);
      
      case 'hour':
        return this.mapHourToken(part.value, resolvedOptions.hour, resolvedOptions.hour12);
      
      case 'minute':
        return this.mapMinuteToken(part.value, resolvedOptions.minute);
      
      case 'second':
        return this.mapSecondToken(part.value, resolvedOptions.second);
      
      case 'dayPeriod':
        return this.mapDayPeriodToken(part.value, (resolvedOptions as any).dayPeriod);
      
      case 'timeZoneName':
        return this.mapTimeZoneNameToken(part.value, resolvedOptions.timeZoneName);
      
      case 'fractionalSecond':
        return this.mapFractionalSecondToken(part.value, (resolvedOptions as any).fractionalSecondDigits);
      
      default:
        // TODO: Handle other types like 'relatedYear', 'yearName', etc.
        return null;
    }
  }

  private mapEraToken(_value: string, eraOption?: string): UnicodeDateTimeToken {
    switch (eraOption) {
      case 'short':
        return unicodeDateTimeTokenDefinitions.eraShort;
      case 'long':
        return unicodeDateTimeTokenDefinitions.eraLong;
      case 'narrow':
        return unicodeDateTimeTokenDefinitions.eraNarrow;
      default:
        // Default to short if not specified
        return unicodeDateTimeTokenDefinitions.eraShort;
    }
  }

  private mapYearToken(_value: string, yearOption?: string): UnicodeDateTimeToken {
    // Check if it's a 2-digit year or full year
    if (yearOption === '2-digit') {
      // TODO: Need a 2-digit year token - currently using calendarYear
      return unicodeDateTimeTokenDefinitions.calendarYear;
    } else {
      return unicodeDateTimeTokenDefinitions.calendarYear;
    }
  }

  private mapMonthToken(_value: string, monthOption?: string, allParts?: Intl.DateTimeFormatPart[]): UnicodeDateTimeToken {
    // Determine if this is standalone context (month appears alone or with minimal other elements)
    const isStandalone = this.isStandaloneContext(allParts, 'month');
    
    switch (monthOption) {
      case 'numeric':
        return unicodeDateTimeTokenDefinitions.month;
      case '2-digit':
        return unicodeDateTimeTokenDefinitions.monthPadded;
      case 'short':
        return isStandalone ? unicodeDateTimeTokenDefinitions.monthStandaloneShort : unicodeDateTimeTokenDefinitions.monthShort;
      case 'long':
        return isStandalone ? unicodeDateTimeTokenDefinitions.monthStandaloneLong : unicodeDateTimeTokenDefinitions.monthLong;
      case 'narrow':
        return isStandalone ? unicodeDateTimeTokenDefinitions.monthStandaloneNarrow : unicodeDateTimeTokenDefinitions.monthNarrow;
      default:
        return unicodeDateTimeTokenDefinitions.month;
    }
  }

  private mapDayToken(_value: string, dayOption?: string): UnicodeDateTimeToken {
    switch (dayOption) {
      case 'numeric':
        return unicodeDateTimeTokenDefinitions.day;
      case '2-digit':
        return unicodeDateTimeTokenDefinitions.dayPadded;
      default:
        return unicodeDateTimeTokenDefinitions.day;
    }
  }

  private mapWeekdayToken(_value: string, weekdayOption?: string, allParts?: Intl.DateTimeFormatPart[]): UnicodeDateTimeToken {
    // Determine if this is standalone context
    const isStandalone = this.isStandaloneContext(allParts, 'weekday');
    
    switch (weekdayOption) {
      case 'short':
        return isStandalone ? unicodeDateTimeTokenDefinitions.weekdayStandaloneShort : unicodeDateTimeTokenDefinitions.weekdayShort;
      case 'long':
        return isStandalone ? unicodeDateTimeTokenDefinitions.weekdayStandaloneLong : unicodeDateTimeTokenDefinitions.weekdayLong;
      case 'narrow':
        return isStandalone ? unicodeDateTimeTokenDefinitions.weekdayStandaloneNarrow : unicodeDateTimeTokenDefinitions.weekdayNarrow;
      default:
        return unicodeDateTimeTokenDefinitions.weekdayShort;
    }
  }

  private mapHourToken(_value: string, hourOption?: string, hour12?: boolean): UnicodeDateTimeToken {
    if (hour12) {
      switch (hourOption) {
        case 'numeric':
          return unicodeDateTimeTokenDefinitions.twelveHour;
        case '2-digit':
          return unicodeDateTimeTokenDefinitions.twelveHourPadded;
        default:
          return unicodeDateTimeTokenDefinitions.twelveHour;
      }
    } else {
      switch (hourOption) {
        case 'numeric':
          return unicodeDateTimeTokenDefinitions.hour;
        case '2-digit':
          return unicodeDateTimeTokenDefinitions.hourPadded;
        default:
          return unicodeDateTimeTokenDefinitions.hour;
      }
    }
  }

  private mapMinuteToken(_value: string, minuteOption?: string): UnicodeDateTimeToken {
    switch (minuteOption) {
      case 'numeric':
        return unicodeDateTimeTokenDefinitions.minute;
      case '2-digit':
        return unicodeDateTimeTokenDefinitions.minutePadded;
      default:
        return unicodeDateTimeTokenDefinitions.minute;
    }
  }

  private mapSecondToken(_value: string, secondOption?: string): UnicodeDateTimeToken {
    switch (secondOption) {
      case 'numeric':
        return unicodeDateTimeTokenDefinitions.second;
      case '2-digit':
        return unicodeDateTimeTokenDefinitions.secondPadded;
      default:
        return unicodeDateTimeTokenDefinitions.second;
    }
  }

  private mapDayPeriodToken(_value: string, dayPeriodOption?: string): UnicodeDateTimeToken {
    switch (dayPeriodOption) {
      case 'short':
        return unicodeDateTimeTokenDefinitions.dayPeriodShort;
      case 'long':
        return unicodeDateTimeTokenDefinitions.dayPeriodLong;
      case 'narrow':
        return unicodeDateTimeTokenDefinitions.dayPeriodNarrow;
      default:
        return unicodeDateTimeTokenDefinitions.dayPeriod;
    }
  }

  private mapTimeZoneNameToken(_value: string, timeZoneNameOption?: string): UnicodeDateTimeToken {
    switch (timeZoneNameOption) {
      case 'short':
        return unicodeDateTimeTokenDefinitions.timeZoneNameShort;
      case 'long':
        return unicodeDateTimeTokenDefinitions.timeZoneNameLong;
      case 'shortOffset':
        // GMT-X
        return unicodeDateTimeTokenDefinitions.timeZoneNameShortOffset;
      case 'longOffset':
        // GMT-XXX
        return unicodeDateTimeTokenDefinitions.timeZoneNameLongOffset;
      case 'shortGeneric':
        // ZZZ
        return unicodeDateTimeTokenDefinitions.timeZoneNameShortGeneric;
      case 'longGeneric':
        // ZZZZ
        return unicodeDateTimeTokenDefinitions.timeZoneNameLongGeneric;
      default:
        return unicodeDateTimeTokenDefinitions.timeZoneNameShort;
    }
  }

  private mapFractionalSecondToken(_value: string, _fractionalSecondDigits?: number): UnicodeDateTimeToken {
    // TODO: Need fractional second tokens based on digits count
    // Currently using nanoseconds token for all cases
    return unicodeDateTimeTokenDefinitions.nanosecond;
  }

  private isStandaloneContext(allParts: Intl.DateTimeFormatPart[] | undefined, _type: string): boolean {
    if (!allParts) return false;
    
    // Count non-literal parts
    const nonLiteralParts = allParts.filter(p => p.type !== 'literal');
    
    // If there are very few non-literal parts, it's likely standalone
    if (nonLiteralParts.length <= 2) {
      return true;
    }
    
    // Check if the part appears with other date elements
    const hasDateElements = allParts.some(p => 
      p.type === 'day' || p.type === 'month' || p.type === 'year'
    );
    
    return !hasDateElements;
  }
}
