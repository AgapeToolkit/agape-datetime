import { DateTimePatternIntlParser } from '../datetime-pattern-intl-parser';

/**
 * Example demonstrating how to use the DateTimePatternIntlParser
 * to convert Intl.DateTimeFormat configurations into destructured pattern parts.
 */

// Example 1: Basic date format
console.log('=== Basic Date Format ===');
const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});
const dateParser = new DateTimePatternIntlParser(dateFormat);
console.log('Format parts:', dateParser.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

// Example 2: Time format with 12-hour clock
console.log('\n=== Time Format (12-hour) ===');
const timeFormat12 = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
});
const timeParser12 = new DateTimePatternIntlParser(timeFormat12);
console.log('Format parts:', timeParser12.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

// Example 3: Time format with 24-hour clock
console.log('\n=== Time Format (24-hour) ===');
const timeFormat24 = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});
const timeParser24 = new DateTimePatternIntlParser(timeFormat24);
console.log('Format parts:', timeParser24.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

// Example 4: Standalone month format
console.log('\n=== Standalone Month Format ===');
const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long'
});
const monthParser = new DateTimePatternIntlParser(monthFormat);
console.log('Format parts:', monthParser.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

// Example 5: Complete datetime format
console.log('\n=== Complete DateTime Format ===');
const fullFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
  timeZoneName: 'short'
});
const fullParser = new DateTimePatternIntlParser(fullFormat);
console.log('Format parts:', fullParser.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

// Example 6: Different locale
console.log('\n=== Different Locale (French) ===');
const frenchFormat = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const frenchParser = new DateTimePatternIntlParser(frenchFormat);
console.log('Format parts:', frenchParser.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

// Example 7: Era format
console.log('\n=== Era Format ===');
const eraFormat = new Intl.DateTimeFormat('en-US', {
  era: 'short',
  year: 'numeric'
});
const eraParser = new DateTimePatternIntlParser(eraFormat);
console.log('Format parts:', eraParser.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

// Example 8: Fractional seconds
console.log('\n=== Fractional Seconds Format ===');
const fractionalFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3
});
const fractionalParser = new DateTimePatternIntlParser(fractionalFormat);
console.log('Format parts:', fractionalParser.parts.map(part => ({
  tokenType: part.token.constructor.name,
  tokenId: (part.token as any).id || 'literal',
  value: (part.token as any).value || 'N/A'
})));

export {
  dateParser,
  timeParser12,
  timeParser24,
  monthParser,
  fullParser,
  frenchParser,
  eraParser,
  fractionalParser
};
