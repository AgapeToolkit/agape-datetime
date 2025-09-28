import { VerboseWeekdayUnicodeDateTimeToken } from './verbose-weekday-unicode-datetime-token';

describe('VerboseWeekdayUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new VerboseWeekdayUnicodeDateTimeToken({
        id: 'weekdayShort',
        symbol: 'EEE',
        variation: 'short'
      })
    ).toBeTruthy();
  })

  const token = new VerboseWeekdayUnicodeDateTimeToken({
    id: 'weekdayShort',
    symbol: 'EEE',
    variation: 'short'
  });

  describe('en-US', () => {
    describe('getRegex', () => {
      it('should produce a regex with default options', () => {
        const regex = token.getRegex({ locale: 'en-US', case: 'default', elastic: true, flexible: true, limitRange: false, unicode: false  });
        expect(regex).toBe('Mon|Tue|Wed|Thu|Fri|Sat|Sun');
      })
      it('should produce a lowercase regex', () => {
        const regex = token.getRegex({ locale: 'en-US', case: 'lowercase', elastic: true, flexible: true, limitRange: false, unicode: false });
        expect(regex).toBe('mon|tue|wed|thu|fri|sat|sun');
      })
      it('should produce an uppercase regex', () => {
        const regex = token.getRegex({ locale: 'en-US', case: 'uppercase', elastic: true, flexible: true, limitRange: false, unicode: false  });
        expect(regex).toBe('MON|TUE|WED|THU|FRI|SAT|SUN');
      })
      it('should produce an insensitive regex', () => {
        const regex = token.getRegex({ locale: 'en-US', case: 'insensitive, elastic: true, flexible: true, limitRange: false, unicode: false  });
        expect(regex).toBe('mon|tue|wed|thu|fri|sat|sun');
      })
    })
    describe('resolve', () => {
      it('should resolve the value Mon', () => {
        expect(token.resolve('Mon')).toEqual({ weekday: 1 });
      })
      it('should resolve the value Tue', () => {
        expect(token.resolve('Tue')).toEqual({ weekday: 2 });
      })
      it('should resolve the value Wed', () => {
        expect(token.resolve('Wed')).toEqual({ weekday: 3 });
      })
      it('should resolve the value Sun', () => {
        expect(token.resolve('Sun')).toEqual({ weekday: 7 });
      })
      it('should not resolve the value', () => {
        expect(() => token.resolve('jan')).toThrowError();
      })
      it('should resolve a lowercase weekday', () => {
        expect(token.resolve('mon', { case: 'lowercase'})).toEqual({ weekday: 1 });
      })
      it('should resolve an uppercase weekday', () => {
        expect(token.resolve('MON', { case: 'uppercase'})).toEqual({ weekday: 1 });
      })
      it('should resolve an uppercase weekday', () => {
        expect(token.resolve('mOn', { case: 'insensitive'})).toEqual({ weekday: 1 });
      })
    })
  })


})