# DateTime Pattern Parsers

This directory contains parsers that convert different date/time format representations into `DestructuredDateTimePatternPart[]` arrays.

## Available Parsers

### 1. DateTimePatternStringParser
Converts string patterns (like `'MM/DD/YYYY'`) into destructured pattern parts.

**Usage:**
```typescript
const parser = new DateTimePatternStringParser('MM/DD/YYYY', true); // true for unicode
const parts = parser.parts; // DestructuredDateTimePatternPart[]
```

### 2. DateTimePatternIntlParser
Converts `Intl.DateTimeFormat` resolved options and `formatToParts` output into destructured pattern parts.

**Usage:**
```typescript
const intlFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});
const parser = new DateTimePatternIntlParser(intlFormat);
const parts = parser.parts; // DestructuredDateTimePatternPart[]
```

## Implementation Details

### Intl Parser Features

The `DateTimePatternIntlParser` provides comprehensive mapping from Intl.DateTimeFormat options to Unicode tokens:

#### Supported Format Parts
- **Era**: Maps to `eraShort`, `eraLong`, `eraNarrow` tokens
- **Year**: Maps to `calendarYear` token (2-digit year support needed)
- **Month**: Maps to contextual (`monthShort`, `monthLong`, `monthNarrow`) or standalone (`monthStandaloneShort`, etc.) tokens
- **Day**: Maps to `day` or `dayPadded` tokens
- **Weekday**: Maps to contextual or standalone weekday tokens
- **Hour**: Maps to 12-hour (`twelveHour`, `twelveHourPadded`) or 24-hour (`hour`, `hourPadded`) tokens
- **Minute**: Maps to `minute` or `minutePadded` tokens
- **Second**: Maps to `second` or `secondPadded` tokens
- **Day Period**: Maps to `dayPeriod`, `dayPeriodShort`, `dayPeriodLong`, `dayPeriodNarrow` tokens
- **Time Zone Name**: Maps to `timeZoneNameShort`, `timeZoneNameLong` tokens
- **Fractional Second**: Maps to `nanoseconds` token (digit-specific tokens needed)

#### Context Detection
The parser automatically detects whether to use standalone or contextual tokens for months and weekdays by analyzing the format structure:
- **Standalone**: Used when the component appears alone or with minimal other elements
- **Contextual**: Used when the component appears with other date elements

#### Error Handling
- Unmapped format parts are converted to literal tokens with `[UNMAPPED:type:value]` format
- Missing tokens fall back to the closest available token
- TODO comments mark areas needing additional implementation

## Missing Token Implementations

### High Priority
1. **2-digit Year Token**: Need `year2Digit` token for `year: "2-digit"`
2. **Fractional Second Tokens**: Need `fractionalSecond1`, `fractionalSecond2`, `fractionalSecond3` tokens
3. **Timezone Offset Tokens**: Need `timeZoneNameShortOffset`, `timeZoneNameLongOffset` tokens
4. **Timezone Generic Tokens**: Need `timeZoneNameShortGeneric`, `timeZoneNameLongGeneric` tokens

### Medium Priority
1. **Calendar System Support**: Tokens for different calendar systems (Buddhist, Islamic, etc.)
2. **Numbering System Support**: Tokens for different numbering systems (Arabic, Devanagari, etc.)
3. **Hour Cycle Support**: Tokens for different hour cycles (h11, h12, h23, h24)

### Low Priority
1. **Related Year Tokens**: For `relatedYear` format part type
2. **Year Name Tokens**: For `yearName` format part type

## Testing

The implementation includes comprehensive tests covering:
- Basic date/time formats
- Standalone vs contextual token usage
- 12-hour vs 24-hour time formats
- Era, weekday, and timezone formats
- Edge cases and error handling

Run tests with:
```bash
npx nx test datetime --testPathPattern=datetime-pattern-intl-parser.spec.ts
```

## Future Enhancements

1. **Complete Token Coverage**: Implement all missing tokens identified in the mapping document
2. **Calendar System Support**: Add support for non-Gregorian calendars
3. **Numbering System Support**: Add support for different numbering systems
4. **Performance Optimization**: Optimize context detection algorithm
5. **Extended Testing**: Add more comprehensive test cases for edge scenarios
