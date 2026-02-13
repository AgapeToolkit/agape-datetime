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
    const defaultOptions = {
      locale: 'en-US',
      case: 'default' as const,
      elastic: true,
      flexible: true,
      limitRange: false,
      unicode: false
    };

    describe('getRegex', () => {
      it('should produce a regex with default options', () => {
        const regex = token.getRegex({ ...defaultOptions, case: 'default' });
        expect(regex).toBe('Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec');
      })
      it('should produce a lowercase regex', () => {
        const regex = token.getRegex({ ...defaultOptions, case: 'lowercase' });
        expect(regex).toBe('jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec');
      })
      it('should produce an uppercase regex', () => {
        const regex = token.getRegex({ ...defaultOptions, case: 'uppercase' });
        expect(regex).toBe('JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC');
      })
      it('should produce an insensitive regex', () => {
        const regex = token.getRegex({ ...defaultOptions, case: 'insensitive' });
        expect(regex).toBe('jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec');
      })
    })
    describe('resolve', () => {
      it('should resolve the value', () => {
        expect(token.resolve('Jan', defaultOptions)).toEqual({ month: 1 });
      })
      it('should resolve the value', () => {
        expect(token.resolve('Feb', defaultOptions)).toEqual({ month: 2 });
      })
      it('should resolve the value', () => {
        expect(token.resolve('Mar', defaultOptions)).toEqual({ month: 3 });
      })
      it('should resolve the value', () => {
        expect(token.resolve('Dec', defaultOptions)).toEqual({ month: 12 });
      })
      it('should not resolve the value', () => {
        expect(() => token.resolve('jan', defaultOptions)).toThrowError();
      })
      it('should resolve a lowercase month', () => {
        expect(token.resolve('jan', { ...defaultOptions, case: 'lowercase'})).toEqual({ month: 1 });
      })
      it('should resolve an uppercase month', () => {
        expect(token.resolve('JAN', { ...defaultOptions, case: 'uppercase'})).toEqual({ month: 1 });
      })
      it('should resolve an uppercase month', () => {
        expect(token.resolve('jAn', { ...defaultOptions, case: 'insensitive'})).toEqual({ month: 1 });
      })
    })
  })


})