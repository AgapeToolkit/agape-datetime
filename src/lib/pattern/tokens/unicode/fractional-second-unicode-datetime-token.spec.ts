import { FractionalSecondUnicodeDateTimeToken } from './fractional-second-unicode-datetime-token';

describe('FractionalSecondUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new FractionalSecondUnicodeDateTimeToken({
        id: 'fractionalSecond',
        char: 'S'
      })
    ).toBeTruthy();
  })

  const token = new FractionalSecondUnicodeDateTimeToken({
    id: 'fractionalSecond',
    char: 'S'
  })
  describe('getRegex', () => {
    it('should produce a regex with default options', () => {
      const regex = token.getRegex(null, 3);
      expect(regex).toBe('\\d{3,}');
    })
    it('should produce a fix width regex', () => {
      const regex = token.getRegex({ elastic: false }, 3);
      expect(regex).toBe('\\d{3}');
    })
    it('should produce an elastic width regex', () => {
      const regex = token.getRegex({ elastic: true }, 3);
      expect(regex).toBe('\\d{3,}');
    })
  })

  describe('resolve', () => {
    it('should resolve the value', () => {
      expect(token.resolve('1')).toEqual({ fractionalSecond: .1 });
    })
    it('should resolve a padded number', () => {
      expect(token.resolve('00056')).toEqual({ fractionalSecond: .00056 });
    })
  })

  describe('getTokenLength', () => {
    it('should get the token length', () => {
      expect(token.getTokenLength('SSSSSS')).toBe(6);
    })
  })

})