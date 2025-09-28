# Intl.DateTimeFormat Options to Unicode Token Mapping

This document provides a comprehensive mapping of all Intl.DateTimeFormat options and their values to the corresponding Unicode tokens in the datetime pattern system.

## Complete List of Intl.DateTimeFormat Options

### Core Formatting Options

| Option | Possible Values | Default | Status |
|--------|----------------|---------|--------|
| `localeMatcher` | `"lookup"`, `"best fit"` | `"best fit"` | ✅ Handled by Intl |
| `timeZone` | IANA timezone names | Runtime default | ✅ Handled by Intl |
| `hour12` | `true`, `false` | Locale-dependent | ✅ Mapped to hour tokens |
| `formatMatcher` | `"basic"`, `"best fit"` | `"best fit"` | ✅ Handled by Intl |

### Date/Time Component Options

| Option | Possible Values | Default | Unicode Token Mapping | Status |
|--------|----------------|---------|----------------------|--------|
| `weekday` | `"narrow"`, `"short"`, `"long"` | - | `weekdayNarrow`, `weekdayShort`, `weekdayLong` | ✅ Implemented |
| `era` | `"narrow"`, `"short"`, `"long"` | - | `eraNarrow`, `eraShort`, `eraLong` | ✅ Implemented |
| `year` | `"numeric"`, `"2-digit"` | `"numeric"` | `calendarYear` | ⚠️ Needs 2-digit year token |
| `month` | `"numeric"`, `"2-digit"`, `"narrow"`, `"short"`, `"long"` | `"numeric"` | `month`, `monthPadded`, `monthNarrow`, `monthShort`, `monthLong` | ✅ Implemented |
| `day` | `"numeric"`, `"2-digit"` | `"numeric"` | `day`, `dayPadded` | ✅ Implemented |
| `hour` | `"numeric"`, `"2-digit"` | `"numeric"` | `hour`, `hourPadded`, `twelveHour`, `twelveHourPadded` | ✅ Implemented |
| `minute` | `"numeric"`, `"2-digit"` | `"numeric"` | `minute`, `minutePadded` | ✅ Implemented |
| `second` | `"numeric"`, `"2-digit"` | `"numeric"` | `second`, `secondPadded` | ✅ Implemented |
| `timeZoneName` | `"short"`, `"long"`, `"shortOffset"`, `"longOffset"`, `"shortGeneric"`, `"longGeneric"` | - | Various timezone tokens | ⚠️ Missing offset/generic tokens |
| `dayPeriod` | `"narrow"`, `"short"`, `"long"` | - | `dayPeriodNarrow`, `dayPeriodShort`, `dayPeriodLong` | ✅ Implemented |
| `fractionalSecondDigits` | `1`, `2`, `3` | - | `nanoseconds` | ⚠️ Needs digit-specific tokens |

### Advanced Options

| Option | Possible Values | Default | Status |
|--------|----------------|---------|--------|
| `calendar` | `"buddhist"`, `"chinese"`, `"coptic"`, `"ethiopic"`, `"gregory"`, `"hebrew"`, `"indian"`, `"islamic"`, `"japanese"`, `"persian"`, `"roc"` | `"gregory"` | ❌ Not implemented |
| `numberingSystem` | `"arab"`, `"arabext"`, `"bali"`, `"beng"`, `"deva"`, `"fullwide"`, `"gujr"`, `"guru"`, `"hanidec"`, `"khmr"`, `"knda"`, `"laoo"`, `"latn"`, `"limb"`, `"mlym"`, `"mong"`, `"mymr"`, `"orya"`, `"tamldec"`, `"telu"`, `"thai"`, `"tibt"` | `"latn"` | ❌ Not implemented |
| `hourCycle` | `"h11"`, `"h12"`, `"h23"`, `"h24"` | Locale-dependent | ❌ Not implemented |

## Standalone vs Contextual Tokens

The system distinguishes between standalone and contextual tokens for months and weekdays:

### Month Tokens
- **Contextual**: `monthShort`, `monthLong`, `monthNarrow` (used when month appears with other date elements)
- **Standalone**: `monthStandaloneShort`, `monthStandaloneLong`, `monthStandaloneNarrow` (used when month appears alone)

### Weekday Tokens
- **Contextual**: `weekdayShort`, `weekdayLong`, `weekdayNarrow` (used when weekday appears with other date elements)
- **Standalone**: `weekdayStandaloneShort`, `weekdayStandaloneLong`, `weekdayStandaloneNarrow` (used when weekday appears alone)

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

## Implementation Notes

### Context Detection Algorithm
The `isStandaloneContext()` method determines whether to use standalone or contextual tokens by:
1. Counting non-literal parts in the format
2. Checking if the part appears with other date elements (day, month, year)
3. Using standalone tokens when there are few parts or no other date elements

### Error Handling
- Unmapped format parts are converted to literal tokens with `[UNMAPPED:type:value]` format
- Missing tokens fall back to the closest available token
- TODO comments mark areas needing additional implementation

### Testing Recommendations
Test the implementation with various Intl.DateTimeFormat configurations:
- Different locales
- Different time zones
- Various combinations of date/time components
- Edge cases like standalone vs contextual usage
