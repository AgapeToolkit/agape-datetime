import { TimeZoneOffsetUnicodeDateTimeToken } from './timezone-offset-unicode-datetime-token';

describe('TimeZoneOffsetUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new TimeZoneOffsetUnicodeDateTimeToken({
        id: 'timezoneWithZ_X',
        name: 'timezone',
        symbol: 'X', // “Z” or ±HH or ±HHMM  (e.g., Z, -08, +0530)
        regex: `(?:Z|[+-](?:0[0-9]|1[0-4])(?:[0-5][0-9])?)`,
      })
    ).toBeTruthy();
  })

  const token = new TimeZoneOffsetUnicodeDateTimeToken({
    id: 'timezoneWithZ_X',
    name: 'timezone',
    symbol: 'X', // “Z” or ±HH or ±HHMM  (e.g., Z, -08, +0530)
    regex: `(?:Z|[+-](?:0[0-9]|1[0-4])(?:[0-5][0-9])?)`,
  })

  describe('getRegex', () => {
    it('should produce a regex with default options', () => {
      const regex = token.getRegex();
      expect(regex).toBe('(?:Z|[+-](?:0[0-9]|1[0-4])(?:[0-5][0-9])?)');
    })
  })

  describe('resolve', () => {
    it('should resolve the value', () => {
      expect(token.resolve('+00:00')).toEqual({ timezoneOffset: '+00:00' });
    })
    it('should resolve a padded number', () => {
      expect(token.resolve('-0100')).toEqual({ timezoneOffset: '-01:00' });
    })
    it('should resolve a padded number', () => {
      expect(token.resolve('-01:00')).toEqual({ timezoneOffset: '-01:00' });
    })
    it('should resolve a padded number', () => {
      expect(token.resolve('-123456')).toEqual({ timezoneOffset: '-12:34:56' });
    })
  })
})