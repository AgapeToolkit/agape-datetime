import { VerboseEraUnicodeDateTimeToken } from './verbose-era-unicode-datetime-token';

describe('VerboseEraUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(new VerboseEraUnicodeDateTimeToken({
      id: 'eraShort',
      symbol: /G{1,2}/,
      variation: 'short'
    })).toBeTruthy();
  })

  describe('Traditional Era', () => {
    const token = new VerboseEraUnicodeDateTimeToken({
      id: 'eraShort',
      symbol: /G{1,2}/,
      variation: 'short'
    });

    describe('getRegex', () => {
      it('should produce a regex', () => {
        const regex = token.getRegex({ locale: 'en-US' });
        expect(regex).toBe('BC|AD');
        console.log(regex);
      })
    })

    describe('resolve', () => {
      it('should resolve the values', () => {
        expect(token.resolve('BC', { locale: 'en-US' })).toEqual({ era: 0 });
        expect(token.resolve('AD', { locale: 'en-US' })).toEqual({ era: 1 });
      })
    })
  })

  describe('Common Era', () => {
    const token = new VerboseEraUnicodeDateTimeToken({
      id: 'eraShort',
      symbol: /G{1,2}/,
      variation: 'short',
      common: true
    });

    describe('getRegex', () => {
      it('should produce a regex', () => {
        const regex = token.getRegex({ locale: 'en-US' });
        expect(regex).toBe('BCE|CE');
        console.log(regex);
      })
    })

    describe('resolveValue', () => {
      it('should resolve the values', () => {
        expect(token.resolve('BCE', { locale: 'en-US' })).toEqual({ era: 0 });
        expect(token.resolve('CE', { locale: 'en-US' })).toEqual({ era: 1 });
      })
    })
  })

})