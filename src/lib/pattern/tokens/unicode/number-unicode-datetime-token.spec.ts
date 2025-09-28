import { NumberUnicodeDateTimeToken } from './number-unicode-datetime-token';

describe('NumberUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new NumberUnicodeDateTimeToken({
        id: 'month',
        symbol: 'M',
        regex: `0?[1-9]|1[0-2]`,
        fixedWidthRegex: '[1-9]|1[0-2]'
      })
    ).toBeTruthy();
  })

  const token: NumberUnicodeDateTimeToken = new NumberUnicodeDateTimeToken({
    id: 'month',
    symbol: 'M',
    regex: `0?[1-9]|1[0-2]`,
    fixedWidthRegex: '[1-9]|1[0-2]'
  });

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
      const regex = token.getRegex(defaultOptions);
      expect(regex).toBe('0?[1-9]|1[0-2]');
    })
    it('should produce a flexible regex', () => {
      const regex = token.getRegex({ ...defaultOptions, flexible: true });
      expect(regex).toBe('0?[1-9]|1[0-2]');
    })
    it('should produce an non-flexible regex', () => {
      const regex = token.getRegex({ ...defaultOptions, flexible: false });
      expect(regex).toBe('[1-9]|1[0-2]');
    })
  })

  describe('resolve', () => {
    it('should resolve the value', () => {
      expect(token.resolve('1')).toEqual({ month: 1 });
    })
    it('should resolve a padded number', () => {
      expect(token.resolve('09')).toEqual({ month: 9 });
    })
  })
})