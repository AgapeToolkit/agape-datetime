import { VerboseMonthUnicodeDateTimeToken } from './verbose-month-unicode-datetime-token';

describe('VerboseMonthUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new VerboseMonthUnicodeDateTimeToken({
        id: 'monthShort',
        symbol: 'MMMM',
        variation: 'short'
      })
    ).toBeTruthy();
  })

  const token = new VerboseMonthUnicodeDateTimeToken({
    id: 'monthShort',
    symbol: 'MMMM',
    variation: 'short'
  });

  describe('en-US', () => {
    describe('getRegex', () => {
      it('should produce a regex with default options', () => {
        const regex = token.getRegex({ locale: 'en-US' });
        expect(regex).toBe('Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec');
      })
      it('should produce a lowercase regex', () => {
        const regex = token.getRegex({ locale: 'en-US', case: 'lowercase' });
        expect(regex).toBe('jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec');
      })
      it('should produce an uppercase regex', () => {
        const regex = token.getRegex({ locale: 'en-US', case: 'uppercase' });
        expect(regex).toBe('JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC');
      })
      it('should produce an insensitive regex', () => {
        const regex = token.getRegex({ locale: 'en-US', case: 'insensitive' });
        expect(regex).toBe('jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec');
      })
    })
    describe('resolve', () => {
      it('should resolve the value', () => {
        expect(token.resolve('Jan')).toEqual({ month: 1 });
      })
      it('should resolve the value', () => {
        expect(token.resolve('Feb')).toEqual({ month: 2 });
      })
      it('should resolve the value', () => {
        expect(token.resolve('Mar')).toEqual({ month: 3 });
      })
      it('should resolve the value', () => {
        expect(token.resolve('Dec')).toEqual({ month: 12 });
      })
      it('should not resolve the value', () => {
        expect(() => token.resolve('jan')).toThrowError();
      })
      it('should resolve a lowercase month', () => {
        expect(token.resolve('jan', { case: 'lowercase'})).toEqual({ month: 1 });
      })
      it('should resolve an uppercase month', () => {
        expect(token.resolve('JAN', { case: 'uppercase'})).toEqual({ month: 1 });
      })
      it('should resolve an uppercase month', () => {
        expect(token.resolve('jAn', { case: 'insensitive'})).toEqual({ month: 1 });
      })
    })
  })


})