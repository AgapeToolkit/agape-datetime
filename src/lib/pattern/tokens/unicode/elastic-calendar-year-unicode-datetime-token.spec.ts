import { ElasticCalendarYearUnicodeDateTimeToken } from './elastic-calendar-year-unicode-datetime-token';

describe('ElasticCalendarYearUnicodeDateTimeToken', () => {
  it('should instantiate', () => {
    expect(
      new ElasticCalendarYearUnicodeDateTimeToken({
        id: 'calendarYear',
        char: 'y'
      })
    ).toBeTruthy();
  })

  const token = new ElasticCalendarYearUnicodeDateTimeToken({
    id: 'calendarYear',
    char: 'y'
  })

  describe('getRegex', () => {
    it('should produce a regex with default options', () => {
      const regex = token.getRegex(null, 4);
      expect(regex).toBe('\\d{3,}[1-9]');
    })
    it('should produce a fix width regex', () => {
      const regex = token.getRegex({ elastic: false }, 4);
      expect(regex).toBe('\\d{3}[1-9]');
    })
    it('should produce an elastic width regex', () => {
      const regex = token.getRegex({ elastic: true }, 4);
      expect(regex).toBe('\\d{3,}[1-9]');
    })
  })

  describe('resolve', () => {
    it('should resolve the value', () => {
      expect(token.resolve('1')).toEqual({ calendarYear: 1 });
    })
  })

  describe('getTokenRegex', () => {
    it('should return a regex part', () => {
      expect(token.getTokenRegex()).toEqual('y+');
    })
  })
})