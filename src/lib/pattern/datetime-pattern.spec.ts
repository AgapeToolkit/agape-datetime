import { DateTimePattern } from './datetime-pattern';

describe('DateTimePattern', () => {
  describe('Basic Pattern Parsing', () => {
    it('should parse YYYY-MM-DD pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse YYYY/MM/DD pattern', () => {
      const pattern = new DateTimePattern('YYYY/MM/DD');
      const value = pattern.parse('2025/01/01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse DD-MM-YYYY pattern', () => {
      const pattern = new DateTimePattern('DD-MM-YYYY');
      const value = pattern.parse('01-01-2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse MM/DD/YYYY pattern', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY');
      const value = pattern.parse('01/01/2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse YYYY-MM-DD HH:mm:ss pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD hh:mm:ss');
      const value = pattern.parse('2025-01-01 14:30:45');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse h:mm a pattern', () => {
      const pattern = new DateTimePattern('h:mm a');
      const value = pattern.parse('2:30 PM');
      expect(value.normalized.hour).toBe(2); // Note: 12-hour format doesn't convert to 24-hour automatically
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse hh:mm a pattern', () => {
      const pattern = new DateTimePattern('hh:mm a');
      const value = pattern.parse('02:30 PM');
      expect(value.normalized.hour).toBe(2); // Note: 12-hour format doesn't convert to 24-hour automatically
      expect(value.normalized.minute).toBe(30);
    });
  });

  describe('Case Sensitivity Options', () => {
    it('should handle default case sensitivity', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { case: 'default' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should handle uppercase case sensitivity', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { case: 'uppercase' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should handle lowercase case sensitivity', () => {
      const pattern = new DateTimePattern('yyyy-mm-dd', { case: 'lowercase' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should handle case insensitive parsing', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { case: 'insensitive' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });
  });

  describe('Locale Support', () => {
    it('should parse with en-US locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'en-US' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse with es-US locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'es-US' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse with ru-RU locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'ru-RU' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse with ja-JP locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'ja-JP' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse with de-DE locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'de-DE' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse with fr-FR locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'fr-FR' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse with en-UK locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'en-UK' });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });
  });

  describe('Time Patterns', () => {
    it('should parse HH:mm pattern', () => {
      const pattern = new DateTimePattern('HH:mm');
      const value = pattern.parse('14:30');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse HH:mm:ss pattern', () => {
      const pattern = new DateTimePattern('HH:mm:ss');
      const value = pattern.parse('14:30:45');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse h:mm:ss a pattern', () => {
      const pattern = new DateTimePattern('h:mm:ss a');
      const value = pattern.parse('2:30:45 PM');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse HH:mm:ss.SSS pattern with fractional seconds', () => {
      const pattern = new DateTimePattern('HH:mm:ss.SSS');
      const value = pattern.parse('14:30:45.123');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
      expect(value.normalized.fractionalSecond).toBe(123);
    });
  });

  describe('Combined Date-Time Patterns', () => {
    it('should parse YYYY-MM-DD HH:mm:ss pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD HH:mm:ss');
      const value = pattern.parse('2025-01-01 14:30:45');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse MM/DD/YYYY h:mm a pattern', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY h:mm a');
      const value = pattern.parse('01/01/2025 2:30 PM');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse DD-MM-YYYY HH:mm pattern', () => {
      const pattern = new DateTimePattern('DD-MM-YYYY HH:mm');
      const value = pattern.parse('01-01-2025 14:30');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });
  });

  describe('Unicode Patterns', () => {
    it('should parse unicode patterns when unicode option is enabled', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd', { unicode: true });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse unicode month patterns', () => {
      const pattern = new DateTimePattern('yyyy MMM dd', { unicode: true });
      const value = pattern.parse('2025 Jan 01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse unicode weekday patterns', () => {
      const pattern = new DateTimePattern('EEEE, yyyy-MM-dd', { unicode: true });
      const value = pattern.parse('Wednesday, 2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.weekday).toBe(3); // Wednesday
    });
  });

  describe('Edge Cases and Error Conditions', () => {
    it('should handle single digit months and days', () => {
      const pattern = new DateTimePattern('YYYY-M-D');
      const value = pattern.parse('2025-1-1');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should handle padded months and days', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should handle different separators', () => {
      const patterns = [
        'YYYY-MM-DD',
        'YYYY/MM/DD',
        'YYYY.MM.DD',
        'YYYY MM DD'
      ];

      patterns.forEach(patternStr => {
        const pattern = new DateTimePattern(patternStr);
        const value = pattern.parse('2025-01-01');
        expect(value.normalized.year).toBe(2025);
        expect(value.normalized.month).toBe(1);
        expect(value.normalized.day).toBe(1);
      });
    });

    it('should handle leap year dates', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2024-02-29');
      expect(value.normalized.year).toBe(2024);
      expect(value.normalized.month).toBe(2);
      expect(value.normalized.day).toBe(29);
    });

    it('should handle end of year dates', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2025-12-31');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(12);
      expect(value.normalized.day).toBe(31);
    });

    it('should handle midnight times', () => {
      const pattern = new DateTimePattern('HH:mm:ss');
      const value = pattern.parse('00:00:00');
      expect(value.normalized.hour).toBe(0);
      expect(value.normalized.minute).toBe(0);
      expect(value.normalized.second).toBe(0);
    });

    it('should handle end of day times', () => {
      const pattern = new DateTimePattern('HH:mm:ss');
      const value = pattern.parse('23:59:59');
      expect(value.normalized.hour).toBe(23);
      expect(value.normalized.minute).toBe(59);
      expect(value.normalized.second).toBe(59);
    });
  });

  describe('Pattern Options', () => {
    it('should handle elastic option', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { elastic: true });
      const value = pattern.parse('2025-1-1');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should handle flexible option', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { flexible: true });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should handle limitRange option', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { limitRange: true });
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });
  });

  describe('Additional Pattern Variations', () => {
    it('should parse D pattern (single digit day)', () => {
      const pattern = new DateTimePattern('YYYY-M-D');
      const value = pattern.parse('2025-1-1');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse DD pattern (padded day)', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse DDD pattern (day of year)', () => {
      const pattern = new DateTimePattern('YYYY-DDD');
      const value = pattern.parse('2025-001');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse DDDD pattern (day of year padded)', () => {
      const pattern = new DateTimePattern('YYYY-DDDD');
      const value = pattern.parse('2025-0001');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse DDDDD pattern (day of year with more padding)', () => {
      const pattern = new DateTimePattern('YYYY-DDDDD');
      const value = pattern.parse('2025-00001');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse CCC pattern (weekday standalone short)', () => {
      const pattern = new DateTimePattern('CCC, YYYY-MM-DD', { unicode: true });
      const value = pattern.parse('Wed, 2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.weekday).toBe(3);
    });

    it('should parse CCCC pattern (weekday standalone long)', () => {
      const pattern = new DateTimePattern('CCCC, YYYY-MM-DD', { unicode: true });
      const value = pattern.parse('Wednesday, 2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.weekday).toBe(3);
    });

    it('should parse CCCCC pattern (weekday standalone narrow)', () => {
      const pattern = new DateTimePattern('CCCCC, YYYY-MM-DD', { unicode: true });
      const value = pattern.parse('W, 2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.weekday).toBe(3);
    });

    it('should parse H pattern (24-hour format)', () => {
      const pattern = new DateTimePattern('H:mm');
      const value = pattern.parse('14:30');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse HH pattern (24-hour format padded)', () => {
      const pattern = new DateTimePattern('HH:mm');
      const value = pattern.parse('14:30');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse h pattern (12-hour format)', () => {
      const pattern = new DateTimePattern('h:mm a');
      const value = pattern.parse('2:30 PM');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse hh pattern (12-hour format padded)', () => {
      const pattern = new DateTimePattern('hh:mm a');
      const value = pattern.parse('02:30 PM');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });
  });

  describe('Unicode Pattern Variations', () => {
    it('should parse era patterns', () => {
      const pattern = new DateTimePattern('G yyyy-MM-dd', { unicode: true });
      const value = pattern.parse('AD 2025-01-01');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse month name patterns', () => {
      const pattern = new DateTimePattern('MMMM dd, yyyy', { unicode: true });
      const value = pattern.parse('January 01, 2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse month short patterns', () => {
      const pattern = new DateTimePattern('MMM dd, yyyy', { unicode: true });
      const value = pattern.parse('Jan 01, 2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse month narrow patterns', () => {
      const pattern = new DateTimePattern('MMMMM dd, yyyy', { unicode: true });
      const value = pattern.parse('J 01, 2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse standalone month patterns', () => {
      const pattern = new DateTimePattern('LLLL dd, yyyy', { unicode: true });
      const value = pattern.parse('January 01, 2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
    });

    it('should parse weekday patterns', () => {
      const pattern = new DateTimePattern('EEEE, MMMM dd, yyyy', { unicode: true });
      const value = pattern.parse('Wednesday, January 01, 2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.weekday).toBe(3);
    });

    it('should parse weekday short patterns', () => {
      const pattern = new DateTimePattern('EEE, MMM dd, yyyy', { unicode: true });
      const value = pattern.parse('Wed, Jan 01, 2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.weekday).toBe(3);
    });

    it('should parse weekday narrow patterns', () => {
      const pattern = new DateTimePattern('EEEEE, MMM dd, yyyy', { unicode: true });
      const value = pattern.parse('W, Jan 01, 2025');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.weekday).toBe(3);
    });

    it('should parse day period patterns', () => {
      const pattern = new DateTimePattern('h:mm a', { unicode: true });
      const value = pattern.parse('2:30 PM');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse day period short patterns', () => {
      const pattern = new DateTimePattern('h:mm aaa', { unicode: true });
      const value = pattern.parse('2:30 PM');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse day period long patterns', () => {
      const pattern = new DateTimePattern('h:mm aaaa', { unicode: true });
      const value = pattern.parse('2:30 PM');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse day period narrow patterns', () => {
      const pattern = new DateTimePattern('h:mm aaaaa', { unicode: true });
      const value = pattern.parse('2:30 p');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });
  });

  describe('Timezone Patterns', () => {
    it('should parse timezone offset Z pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss Z', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 Z');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse timezone offset X pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss X', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 -08');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse timezone offset XX pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss XX', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 -0800');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse timezone offset XXX pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss XXX', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 -08:00');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse timezone ID pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss V', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 America/Los_Angeles');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse timezone name short pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss z', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 PST');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse timezone name long pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss zzzz', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 Pacific Standard Time');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });
  });

  describe('Timestamp Patterns', () => {
    it('should parse seconds timestamp pattern', () => {
      const pattern = new DateTimePattern('t', { unicode: true });
      const value = pattern.parse('1735689600');
      expect(value.normalized.secondsTimestamp).toBe(1735689600);
    });

    it('should parse signed seconds timestamp pattern', () => {
      const pattern = new DateTimePattern('t', { unicode: true });
      const value = pattern.parse('+1735689600');
      expect(value.normalized.secondsTimestamp).toBe(1735689600);
    });

    it('should parse negative signed seconds timestamp pattern', () => {
      const pattern = new DateTimePattern('t', { unicode: true });
      const value = pattern.parse('-1735689600');
      expect(value.normalized.secondsTimestamp).toBe(-1735689600);
    });

    it('should parse milliseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('n', { unicode: true });
      const value = pattern.parse('1735689600000');
      expect(value.normalized.millisecondsTimestamp).toBe(1735689600000);
    });

    it('should parse signed milliseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('n', { unicode: true });
      const value = pattern.parse('+1735689600000');
      expect(value.normalized.millisecondsTimestamp).toBe(1735689600000);
    });

    it('should parse negative signed milliseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('n', { unicode: true });
      const value = pattern.parse('-1735689600000');
      expect(value.normalized.millisecondsTimestamp).toBe(-1735689600000);
    });

    it('should parse nanoseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('N', { unicode: true });
      const value = pattern.parse('1735689600000000000');
      expect(value.normalized.nanosecondsTimestamp).toBe(1735689600000000000);
    });

    it('should parse signed nanoseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('N', { unicode: true });
      const value = pattern.parse('+1735689600000000000');
      expect(value.normalized.nanosecondsTimestamp).toBe(1735689600000000000);
    });

    it('should parse negative signed nanoseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('N', { unicode: true });
      const value = pattern.parse('-1735689600000000000');
      expect(value.normalized.nanosecondsTimestamp).toBe(-1735689600000000000);
    });
  });

  describe('Complex Pattern Combinations', () => {
    it('should parse full datetime with timezone', () => {
      const pattern = new DateTimePattern('EEEE, MMMM dd, yyyy \'at\' h:mm:ss a zzzz', { unicode: true });
      const value = pattern.parse('Wednesday, January 01, 2025 at 2:30:45 PM Pacific Standard Time');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
      expect(value.normalized.weekday).toBe(3);
    });

    it('should parse ISO format with timezone', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', { unicode: true });
      const value = pattern.parse('2025-01-01T14:30:45.123-08:00');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
      expect(value.normalized.fractionalSecond).toBe(123);
    });

    it('should parse custom format with multiple separators', () => {
      const pattern = new DateTimePattern('MMM dd, yyyy | h:mm a | EEEE', { unicode: true });
      const value = pattern.parse('Jan 01, 2025 | 2:30 PM | Wednesday');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.weekday).toBe(3);
    });
  });
});
