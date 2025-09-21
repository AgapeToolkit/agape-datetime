
export function sortDateTimeTokenIndex(index: TokenIndexEntry[]) {
  return index.sort(
    (a, b) => {
      if (a.kind === 'string' && b.kind === 'string') {
        return (b.string.length - a.string.length);
      }
      // Put string/regex before elastic so explicit formats beat elastic runs
      if (a.kind !== b.kind) {
        if (a.kind === 'string') return -1;
        if (b.kind === 'string') return 1;
        if (a.kind === 'regex') return -1;
        if (b.kind === 'regex') return 1;
      }
      return 0;
    }
  );
}
