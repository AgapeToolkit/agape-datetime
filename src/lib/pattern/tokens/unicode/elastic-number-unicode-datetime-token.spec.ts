import { ElasticNumberUnicodeDateTimeToken } from './elastic-number-unicode-datetime-token';

describe('ElasticNumberUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new ElasticNumberUnicodeDateTimeToken({
        id: 'calendarYear',
        char: 'y'
      })
    ).toBeTruthy();
  })

  describe('no prefix', () => {
    const token = new ElasticNumberUnicodeDateTimeToken({ id: 'year', char: 'u' });

    describe('getTokenRegex', () => {
      it('should return a regex part', () => {
        expect(token.getTokenRegex()).toEqual('u+');
      })
    })

    describe('getRegex', () => {
      const defaultOptions = {
        locale: 'en-US',
        case: 'lowercase' as const,
        elastic: true,
        flexible: true,
        limitRange: false,
        unicode: false
      };

      it('should produce a regex with default options', () => {
        const regex = token.getRegex(defaultOptions, 4);
        expect(regex).toBe('\\d{4,}');
      })
      it('should produce a fix width regex', () => {
        const regex = token.getRegex({ ...defaultOptions, elastic: false }, 4);
        expect(regex).toBe('\\d{4}');
      })
      it('should produce an elastic width regex', () => {
        const regex = token.getRegex({ ...defaultOptions, elastic: true }, 4);
        expect(regex).toBe('\\d{4,}');
      })
    })

    describe('resolve', () => {
      it('should resolve the value', () => {
        expect(token.resolve('1')).toEqual({ year: 1 });
      })
      it('should resolve a padded number', () => {
        expect(token.resolve('00056')).toEqual({ year: 56 });
      })
    })

    describe('getTokenLength', () => {
      it('should get the token length', () => {
        expect(token.getTokenLength('uuuuu')).toBe(5);
      })
    })
  })

  describe(`+ prefix`, () => {
    const token = new ElasticNumberUnicodeDateTimeToken({ id: 'year', char: 'u', prefix: '+' });

    describe('getTokenRegex', () => {
      it('should return a regex part', () => {
        expect(token.getTokenRegex()).toEqual('[+±]u+');
      })
    })

    describe('getRegex', () => {
      const defaultOptions = {
        locale: 'en-US',
        case: 'lowercase' as const,
        elastic: true,
        flexible: true,
        limitRange: false,
        unicode: false
      };

      it('should produce a regex with default options', () => {
        const regex = token.getRegex(defaultOptions, 4);
        expect(regex).toBe('[+\\-]\\d{4,}');
      })
      it('should produce a fix width regex', () => {
        const regex = token.getRegex({ ...defaultOptions, elastic: false }, 4);
        expect(regex).toBe('[+\\-]\\d{4}');
      })
      it('should produce an elastic width regex', () => {
        const regex = token.getRegex({ ...defaultOptions, elastic: true }, 4);
        expect(regex).toBe('[+\\-]\\d{4,}');
      })
    })

    describe('resolve', () => {
      it('should resolve the value', () => {
        expect(token.resolve('+1')).toEqual({ year: 1 });
      })
    })

    describe('getTokenLength', () => {
      it('should get the token length', () => {
        expect(token.getTokenLength(`+uuuuu`)).toBe(5);
      })
    })
  })

  describe(`- prefix`, () => {
    const token = new ElasticNumberUnicodeDateTimeToken({ id: 'year', char: 'u', prefix: '-' });

    describe('getTokenRegex', () => {
      it('should return a regex part', () => {
        expect(token.getTokenRegex()).toEqual('-u+');
      })
    })

    describe('getRegex', () => {
      const defaultOptions = {
        locale: 'en-US',
        case: 'lowercase' as const,
        elastic: true,
        flexible: true,
        limitRange: false,
        unicode: false
      };

      it('should produce a regex with default options', () => {
        const regex = token.getRegex(defaultOptions, 4);
        expect(regex).toBe('-?\\d{4,}');
      })
      it('should produce a fix width regex', () => {
        const regex = token.getRegex({ ...defaultOptions, elastic: false }, 4);
        expect(regex).toBe('-?\\d{4}');
      })
      it('should produce an elastic width regex', () => {
        const regex = token.getRegex({ ...defaultOptions, elastic: true }, 4);
        expect(regex).toBe('-?\\d{4,}');
      })
    })

    describe('resolve', () => {
      it('should resolve the value', () => {
        expect(token.resolve('-1')).toEqual({ year: -1 });
      })
    })

    describe('getTokenLength', () => {
      it('should get the token length', () => {
        expect(token.getTokenLength(`-uuuuu`)).toBe(5);
      })
    })
  })
})