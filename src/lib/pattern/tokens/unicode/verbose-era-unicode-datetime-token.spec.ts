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

    const defaultOptions = {
      locale: 'en-US',
      case: 'default' as const,
      elastic: true,
      flexible: true,
      limitRange: false,
      unicode: false
    };

    describe('getRegex', () => {
      it('should produce a regex', () => {
        const regex = token.getRegex(defaultOptions);
        expect(regex).toBe('BC|AD');
        console.log(regex);
      })
    })

    describe('resolve', () => {
      it('should resolve the values', () => {
        expect(token.resolve('BC', defaultOptions)).toEqual({ era: 0 });
        expect(token.resolve('AD', defaultOptions)).toEqual({ era: 1 });
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

    const defaultOptions = {
      locale: 'en-US',
      case: 'default' as const,
      elastic: true,
      flexible: true,
      limitRange: false,
      unicode: false
    };

    describe('getRegex', () => {
      it('should produce a regex', () => {
        const regex = token.getRegex(defaultOptions);
        expect(regex).toBe('BCE|CE');
        console.log(regex);
      })
    })

    describe('resolveValue', () => {
      it('should resolve the values', () => {
        expect(token.resolve('BCE', defaultOptions)).toEqual({ era: 0 });
        expect(token.resolve('CE', defaultOptions)).toEqual({ era: 1 });
      })
    })
  })

})