import { TimeZoneNames } from './timezone-names';

describe('TimeZoneNames', () => {
  it('should instantiate', () => {
    expect(new TimeZoneNames({ locale: 'en-US' })).toBeTruthy();
  })

  describe('en-US', () => {
    let names = new TimeZoneNames({ locale: 'en-US' });
    beforeEach(() => {
      names = new TimeZoneNames({ locale: 'en-US' });
    })
    describe('short', () => {
      it('should include the list of local timezone names', () => {
        expect(names.short.includes('EST')).toBe(true);
        expect(names.short.includes('EDT')).toBe(true);
        expect(names.short.includes('CST')).toBe(true);
        expect(names.short.includes('CST')).toBe(true);
        expect(names.short.includes('MST')).toBe(true);
        expect(names.short.includes('MDT')).toBe(true);
        expect(names.short.includes('PST')).toBe(true);
        expect(names.short.includes('PDT')).toBe(true);
      })
      it('should get the offset for the timezone name', () => {
        expect(names.getOffset('short', 'EST')).toBe('-05:00');
        expect(names.getOffset('short', 'EDT')).toBe('-04:00');
      })
      it('should get a timezoneId', () => {
        const date = new Date('2025-01-01T00:00:00Z');
        console.log(names.getTimeZoneId('short', 'CST', date))
      })
    })
    describe('long', () => {
      it('should include the list of local timezone names', () => {
        expect(names.long.includes('Eastern Standard Time')).toBe(true);
        expect(names.long.includes('Eastern Daylight Time')).toBe(true);
        expect(names.long.includes('Central Standard Time')).toBe(true);
        expect(names.long.includes('Central Daylight Time')).toBe(true);
        expect(names.long.includes('Mountain Standard Time')).toBe(true);
        expect(names.long.includes('Mountain Daylight Time')).toBe(true);
        expect(names.long.includes('Pacific Standard Time')).toBe(true);
        expect(names.long.includes('Pacific Daylight Time')).toBe(true);
      })
      it('should get the offset for the timezone name', () => {
        expect(names.getOffset('long', 'Eastern Standard Time')).toBe('-05:00');
        expect(names.getOffset('long', 'Eastern Daylight Time')).toBe('-04:00');
      })
    })
  })

  describe('ru-RU', () => {
    let names = new TimeZoneNames({ locale: 'ru-RU' });
    beforeEach(() => {
      names = new TimeZoneNames({ locale: 'ru-RU' });
    });

    describe('short', () => {
      it('should include the list of local timezone abbreviations', () => {
        console.log(names.short);
        expect(names.short.includes('GMT')).toBe(true);
        expect(names.short.includes('GMT+1')).toBe(true);
        expect(names.short.includes('GMT-5')).toBe(true);
      });

      it('should get the offset for the short timezone name', () => {
        expect(names.getOffset('short', 'GMT')).toBe('+00:00');
        expect(names.getOffset('short', 'GMT-5')).toBe('-05:00');
      });
    });

    describe('long', () => {
      it('should include the list of localized long timezone names', () => {
        expect(names.long.includes('Анадырь стандартное время')).toBe(true);
        expect(names.long.includes('GMT+03:00')).toBe(true);
      });

      it('should get the offset for the long timezone name', () => {
        expect(names.getOffset('long', 'Анадырь стандартное время')).toBe('+12:00');
        expect(names.getOffset('long', 'GMT+03:00')).toBe('+03:00');
      });
    });
  });
})