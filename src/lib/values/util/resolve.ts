import { ParsedDateTimeParts } from '../../pattern/types/parsed-datetime-parts';
import { ResolvedDateTimeParts } from '../../pattern/types/resolved-datetime-parts';
import { datetimeTokenResolveOrder } from '../../pattern/token-definitions/datetime-token-resolve-order';
import { UnicodeDateTimeToken } from '../../pattern/tokens/unicode/unicode-datetime-token';
import { unicodeDateTimeTokenDefinitions } from '../../pattern/token-definitions/unicode-datetime-token-definitions';
import { PopulatedDateTimePatternOptions } from '../../pattern/types/populated-datetime-pattern-options';

export function resolveDateTimeParts(parsedDateTimeParts: ParsedDateTimeParts, options: PopulatedDateTimePatternOptions) {
  const resolvedDateTimeParts: ResolvedDateTimeParts = {};

  const entries = Object.entries(parsedDateTimeParts).sort(
    (a, b) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return (datetimeTokenResolveOrder[a[0]] ?? 12) - (datetimeTokenResolveOrder[b[0]] ?? 12);
    }
  )

  for (const [group, value] of entries) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token: UnicodeDateTimeToken = (unicodeDateTimeTokenDefinitions as Record<string,UnicodeDateTimeToken>)[group]!;
    const tokenDateParts = token.resolve(value, options, resolvedDateTimeParts);
    Object.assign(resolvedDateTimeParts, tokenDateParts);
  }

  return resolvedDateTimeParts;
}
