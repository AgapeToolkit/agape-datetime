import { TimeZoneIdUnicodeDateTimeToken } from './timezone-id-unicode-datetime-token';
import { TimeZoneOffsetUnicodeDateTimeToken } from './timezone-offset-unicode-datetime-token';

describe('TimeZoneIdUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new TimeZoneIdUnicodeDateTimeToken({
        id: 'timezoneId',
        symbol: 'VVVV',
        regex: `?:UTC|GMT|[A-Za-z][A-Za-z0-9._+-]*(?:\\/[A-Za-z0-9._+-]+)+)`,
      })
    ).toBeTruthy();
  })

  const token = new TimeZoneIdUnicodeDateTimeToken({
    id: 'timezoneId',
    symbol: 'VVVV',
    regex: `?:UTC|GMT|[A-Za-z][A-Za-z0-9._+-]*(?:\\/[A-Za-z0-9._+-]+)+)`,
  })

  describe('getRegex', () => {
    it('should produce a regex with default options', () => {
      const regex = token.getRegex();
      expect(regex).toBe('?:UTC|GMT|[A-Za-z][A-Za-z0-9._+-]*(?:\\/[A-Za-z0-9._+-]+)+)');
    })
  })

  describe('resolve', () => {
    it('should resolve the value', () => {
      expect(token.resolve('America/New_York')).toEqual({ timezoneId: 'America/New_York' });
    })
    it('should resolve a lowercase value', () => {
      expect(token.resolve('america/new_york')).toEqual({ timezoneId: 'America/New_York' });
    })
    it('should resolve an uppercase value', () => {
      expect(token.resolve('AMERICA/NEW_YORK')).toEqual({ timezoneId: 'America/New_York' });
    })
    it('should resolve a padded number', () => {
      expect(token.resolve('AmErIcA/NeW_YoRk')).toEqual({ timezoneId: 'America/New_York' });
    })
  })
})