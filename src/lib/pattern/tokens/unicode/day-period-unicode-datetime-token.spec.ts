import { DayPeriodUnicodeDateTimeToken } from './day-period-unicode-datetime-token';

describe('DayPeriodUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new DayPeriodUnicodeDateTimeToken({
        id: 'dayPeriod',
        symbol: /a{1,2}/,
        variation: 'default'
      })
    ).toBeTruthy();
  })

  describe('default variation', () => {
    const token = new DayPeriodUnicodeDateTimeToken({
      id: 'dayPeriod',
      symbol: /a{1,2}/,
      variation: 'default'
    })

    describe('en-US', () => {
      describe('getRegex', () => {
        const defaultOptions = {
          locale: 'en-US',
          case: 'default' as const,
          elastic: true,
          flexible: true,
          limitRange: false,
          unicode: false
        };

        it('should produce a regex with default options', () => {
          const regex = token.getRegex({ ...defaultOptions, case: 'default' });
          expect(regex).toBe('AM|PM');
        })
        it('should produce a lowercase regex', () => {
          const regex = token.getRegex({ ...defaultOptions, case: 'lowercase' });
          expect(regex).toBe('am|pm');
        })
        it('should produce an uppercase regex', () => {
          const regex = token.getRegex({ ...defaultOptions, case: 'uppercase' });
          expect(regex).toBe('AM|PM');
        })
        it('should produce an insensitive regex', () => {
          const regex = token.getRegex({ ...defaultOptions, case: 'insensitive' });
          expect(regex).toBe('AM|PM');
        })
      })
      describe('resolve', () => {
        const defaultOptions = {
          locale: 'en-US',
          case: 'default' as const,
          elastic: true,
          flexible: true,
          limitRange: false,
          unicode: false
        };

        it('should resolve the value AM', () => {
          expect(token.resolve('AM', defaultOptions)).toEqual({ dayPeriod: 0 });
        })
        it('should resolve the value PM', () => {
          expect(token.resolve('PM', defaultOptions)).toEqual({ dayPeriod: 1 });
        });
        it('should not resolve the value', () => {
          expect(() => token.resolve('jan', defaultOptions)).toThrowError();
        })
        it('should resolve a lowercase day period', () => {
          expect(token.resolve('am', { ...defaultOptions, case: 'lowercase'})).toEqual({ dayPeriod: 0 });
        })
        it('should resolve an uppercase day period', () => {
          expect(token.resolve('AM', { ...defaultOptions, case: 'uppercase'})).toEqual({ dayPeriod: 0});
        })
        it('should resolve an insensitive day period', () => {
          expect(token.resolve('aM', { ...defaultOptions, case: 'insensitive'})).toEqual({ dayPeriod: 0 });
        })
      })
    })
  })



})