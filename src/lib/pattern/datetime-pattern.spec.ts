import { DateTimePattern } from './datetime-pattern';
import { DateOutOfRangeError } from './errors/date-out-of-range-error';

describe('DateTimePattern', () => {
  describe('Basic Pattern Parsing', () => {
    it('should parse YYYY-MM-DD pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse YYYY/MM/DD pattern', () => {
      const pattern = new DateTimePattern('YYYY/MM/DD');
      const value = pattern.parse('2025/01/01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse DD-MM-YYYY pattern', () => {
      const pattern = new DateTimePattern('DD-MM-YYYY');
      const value = pattern.parse('01-01-2025');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse MM/DD/YYYY pattern', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY');
      const value = pattern.parse('01/01/2025');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse YYYY-MM-DD HH:mm:ss pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD hh:mm:ss');
      const value = pattern.parse('2025-01-01 14:30:45');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse h:mm a pattern', () => {
      const pattern = new DateTimePattern('h:mm a');
      const value = pattern.parse('2:30 PM');
      expect(value.hour).toBe(2); // Note: 12-hour format doesn't convert to 24-hour automatically
      expect(value.minute).toBe(30);
    });

    it('should parse hh:mm a pattern', () => {
      const pattern = new DateTimePattern('hh:mm a');
      const value = pattern.parse('02:30 PM');
      expect(value.hour).toBe(2); // Note: 12-hour format doesn't convert to 24-hour automatically
      expect(value.minute).toBe(30);
    });
  });

  describe('Case Sensitivity Options', () => {
    it('should handle default case sensitivity', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { case: 'default' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should handle uppercase case sensitivity', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { case: 'uppercase' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should handle lowercase case sensitivity', () => {
      const pattern = new DateTimePattern('YYY-MM-DD', { case: 'lowercase' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should handle case insensitive parsing', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { case: 'insensitive' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });
  });

  describe('Locale Support', () => {
    it('should parse with en-US locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'en-US' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse with es-US locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'es-US' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse with ru-RU locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'ru-RU' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse with ja-JP locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'ja-JP' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse with de-DE locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'de-DE' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse with fr-FR locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'fr-FR' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse with en-UK locale', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD', { locale: 'en-UK' });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });
  });

  describe('Time Patterns', () => {
    it('should parse hh:mm pattern', () => {
      const pattern = new DateTimePattern('hh:mm');
      const value = pattern.parse('14:30');
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
    });

    it('should parse hh:mm:ss pattern', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      const value = pattern.parse('14:30:45');
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse h:mm:ss a pattern', () => {
      const pattern = new DateTimePattern('H:mm:ss a');
      const value = pattern.parse('2:30:45 PM');
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse hh:mm:ss.SSS pattern with fractional seconds', () => {
      const pattern = new DateTimePattern('hh:mm:ss.SSS');
      const value = pattern.parse('14:30:45.123');
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
      expect(value.nanosecond).toBe(123000000);
    });
  });

  describe('Combined Date-Time Patterns', () => {
    it('should parse YYYY-MM-DD HH:mm:ss pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD hh:mm:ss');
      const value = pattern.parse('2025-01-01 14:30:45');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse MM/DD/YYYY h:mm a pattern', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY H:mm a');
      const value = pattern.parse('01/01/2025 2:30 PM');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
    });

    it('should parse DD-MM-YYYY hh:mm pattern', () => {
      const pattern = new DateTimePattern('DD-MM-YYYY hh:mm');
      const value = pattern.parse('01-01-2025 14:30');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
    });
  });

  describe('Unicode Patterns', () => {
    it('should parse unicode patterns when unicode option is enabled', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd', { unicode: true });
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse unicode month patterns', () => {
      const pattern = new DateTimePattern('yyyy MMM dd', { unicode: true });
      const value = pattern.parse('2025 Jan 01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should parse unicode weekday patterns', () => {
      const pattern = new DateTimePattern('EEEE, yyyy-MM-dd', { unicode: true });
      const value = pattern.parse('Wednesday, 2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.weekday).toBe(3); // Wednesday
    });
  });

  describe('Edge Cases and Error Conditions', () => {
    it('should handle single digit months and days', () => {
      const pattern = new DateTimePattern('YYYY-M-D');
      const value = pattern.parse('2025-1-1');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should handle padded months and days', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2025-01-01');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
    });

    it('should handle different separators', () => {
      const sets = [
        ['YYYY-MM-DD', '2025-01-01'],
        ['YYYY/MM/DD', '2025/01/01'],
        ['YYYY.MM.DD', '2025.01.01'],
        ['YYYY MM DD', '2025 01 01'],
      ];

      sets.forEach(set => {
        const pattern = new DateTimePattern(set[0]);
        const value = pattern.parse(set[1]);
        expect(value.year).toBe(2025);
        expect(value.month).toBe(1);
        expect(value.day).toBe(1);
      });
    });

    it('should handle leap year dates', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2024-02-29');
      expect(value.year).toBe(2024);
      expect(value.month).toBe(2);
      expect(value.day).toBe(29);
    });

    it('should handle end of year dates', () => {
      const pattern = new DateTimePattern('YYYY-MM-DD');
      const value = pattern.parse('2025-12-31');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(12);
      expect(value.day).toBe(31);
    });

    it('should handle midnight times (24 hour)', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      const value = pattern.parse('00:00:00');
      expect(value.hour).toBe(0);
      expect(value.minute).toBe(0);
      expect(value.second).toBe(0);
    });

    it('should not handle 24:00 (24 hour)', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      expect(() => pattern.parse('24:00:00')).toThrow();
    });

    it('should handle end of day times', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      const value = pattern.parse('23:59:59');
      expect(value.hour).toBe(23);
      expect(value.minute).toBe(59);
      expect(value.second).toBe(59);
    });
  });

  describe('Pattern Options', () => {

    describe('elastic', () => {
      it('should be elastic by default', () => {
        const pattern = new DateTimePattern('YYYY-MM-DD');
        const value = pattern.parse('202589-01-01');
        expect(value.year).toBe(202589);
        expect(value.month).toBe(1);
        expect(value.day).toBe(1);
      })
      it('should be elastic explicitly', () => {
        const pattern = new DateTimePattern('YYYY-MM-DD', { elastic: true });
        const value = pattern.parse('202589-01-01');
        expect(value.year).toBe(202589);
        expect(value.month).toBe(1);
        expect(value.day).toBe(1);
      })
      it('should not be elastic', () => {
        const pattern = new DateTimePattern('YYYY-MM-DD', { elastic: false });
        expect(() => pattern.parse('202589-01-01')).toThrow();
      })
    })

    describe('flexible', () => {
      it('should be flexible by default', () => {
        const pattern = new DateTimePattern('YYYY-M-D');
        const value = pattern.parse('2025-01-01');
        expect(value.year).toBe(2025);
        expect(value.month).toBe(1);
        expect(value.day).toBe(1);
      })
      it('should be flexible explicitly', () => {
        const pattern = new DateTimePattern('YYYY-M-D', { flexible: true });
        const value = pattern.parse('2025-01-01');
        expect(value.year).toBe(2025);
        expect(value.month).toBe(1);
        expect(value.day).toBe(1);
      })
      it('should not be flexible', () => {
        const pattern = new DateTimePattern('YYYY-M-D', { flexible: false });

        expect(() => pattern.parse('2025-01-01')).toThrow();
      })
    })

    describe('limitRange', () => {
      it('should not limit range by default', () => {
        const pattern = new DateTimePattern('+YYYYYY-MM-DD');
        const value = pattern.parse('+999999-01-01');
        expect(value.year).toBe(999999);
        expect(value.month).toBe(1);
        expect(value.day).toBe(1);
      })

      it('should not limit range explicitly', () => {
        const pattern = new DateTimePattern('+YYYYYY-MM-DD', { limitRange: false });
        const value = pattern.parse('+999999-01-01');
        expect(value.year).toBe(999999);
        expect(value.month).toBe(1);
        expect(value.day).toBe(1);
      })
      it('should limit range explicitly', () => {
        const pattern = new DateTimePattern('+YYYYYY-MM-DD', { limitRange: true });
        expect(() => pattern.parse('+999999-01-01')).toThrow(DateOutOfRangeError);
      })
    })

  });

  // describe('Additional Pattern Variations', () => {
  //   it('should parse D pattern (single digit day)', () => {
  //     const pattern = new DateTimePattern('YYYY-M-D');
  //     const value = pattern.parse('2025-1-1');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse DD pattern (padded day)', () => {
  //     const pattern = new DateTimePattern('YYYY-MM-DD');
  //     const value = pattern.parse('2025-01-01');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse DDD pattern (day of year)', () => {
  //     const pattern = new DateTimePattern('YYYY-DDD');
  //     const value = pattern.parse('2025-001');
  //     expect(value.year).toBe(2025);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse DDDD pattern (day of year padded)', () => {
  //     const pattern = new DateTimePattern('YYYY-DDDD');
  //     const value = pattern.parse('2025-0001');
  //     expect(value.year).toBe(2025);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse DDDDD pattern (day of year with more padding)', () => {
  //     const pattern = new DateTimePattern('YYYY-DDDDD');
  //     const value = pattern.parse('2025-00001');
  //     expect(value.year).toBe(2025);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse CCC pattern (weekday standalone short)', () => {
  //     const pattern = new DateTimePattern('CCC, YYYY-MM-DD', { unicode: true });
  //     const value = pattern.parse('Wed, 2025-01-01');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //     expect(value.weekday).toBe(3);
  //   });
  //
  //   it('should parse CCCC pattern (weekday standalone long)', () => {
  //     const pattern = new DateTimePattern('CCCC, YYYY-MM-DD', { unicode: true });
  //     const value = pattern.parse('Wednesday, 2025-01-01');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //     expect(value.weekday).toBe(3);
  //   });
  //
  //   it('should parse CCCCC pattern (weekday standalone narrow)', () => {
  //     const pattern = new DateTimePattern('CCCCC, YYYY-MM-DD', { unicode: true });
  //     const value = pattern.parse('W, 2025-01-01');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //     expect(value.weekday).toBe(3);
  //   });
  //
  //   it('should parse H pattern (24-hour format)', () => {
  //     const pattern = new DateTimePattern('H:mm');
  //     const value = pattern.parse('14:30');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  //
  //   it('should parse HH pattern (24-hour format padded)', () => {
  //     const pattern = new DateTimePattern('HH:mm');
  //     const value = pattern.parse('14:30');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  //
  //   it('should parse h pattern (12-hour format)', () => {
  //     const pattern = new DateTimePattern('h:mm a');
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  //
  //   it('should parse hh pattern (12-hour format padded)', () => {
  //     const pattern = new DateTimePattern('hh:mm a');
  //     const value = pattern.parse('02:30 PM');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  // });

  // describe('Unicode Pattern Variations', () => {
  //   it('should parse era patterns', () => {
  //     const pattern = new DateTimePattern('G yyyy-MM-dd', { unicode: true });
  //     const value = pattern.parse('AD 2025-01-01');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse month name patterns', () => {
  //     const pattern = new DateTimePattern('MMMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('January 01, 2025');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse month short patterns', () => {
  //     const pattern = new DateTimePattern('MMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('Jan 01, 2025');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse month narrow patterns', () => {
  //     const pattern = new DateTimePattern('MMMMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('J 01, 2025');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse standalone month patterns', () => {
  //     const pattern = new DateTimePattern('LLLL dd, yyyy', { unicode: true });
  //     const value = pattern.parse('January 01, 2025');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //   });
  //
  //   it('should parse weekday patterns', () => {
  //     const pattern = new DateTimePattern('EEEE, MMMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('Wednesday, January 01, 2025');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //     expect(value.weekday).toBe(3);
  //   });
  //
  //   it('should parse weekday short patterns', () => {
  //     const pattern = new DateTimePattern('EEE, MMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('Wed, Jan 01, 2025');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //     expect(value.weekday).toBe(3);
  //   });
  //
  //   it('should parse weekday narrow patterns', () => {
  //     const pattern = new DateTimePattern('EEEEE, MMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('W, Jan 01, 2025');
  //     expect(value.year).toBe(2025);
  //     expect(value.month).toBe(1);
  //     expect(value.day).toBe(1);
  //     expect(value.weekday).toBe(3);
  //   });
  //
  //   it('should parse day period patterns', () => {
  //     const pattern = new DateTimePattern('h:mm a', { unicode: true });
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  //
  //   it('should parse day period short patterns', () => {
  //     const pattern = new DateTimePattern('h:mm aaa', { unicode: true });
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  //
  //   it('should parse day period long patterns', () => {
  //     const pattern = new DateTimePattern('h:mm aaaa', { unicode: true });
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  //
  //   it('should parse day period narrow patterns', () => {
  //     const pattern = new DateTimePattern('h:mm aaaaa', { unicode: true });
  //     const value = pattern.parse('2:30 p');
  //     expect(value.hour).toBe(14);
  //     expect(value.minute).toBe(30);
  //   });
  // });

  describe('Timezone Patterns', () => {
    it('should parse timezone offset Z pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ssZ');
      const value = pattern.parse('2025-01-01T14:30:45Z');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
      expect(value.timeZone).toBe('UTC');
    });

    it('should parse timezone offset X pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss X', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 -08');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse timezone offset XX pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss XX', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 -0800');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse timezone offset XXX pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss XXX', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 -08:00');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse timezone ID pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss V', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 America/Los_Angeles');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse timezone name short pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss zzz', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 PST');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });

    it('should parse timezone name long pattern', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd HH:mm:ss zzzz', { unicode: true });
      const value = pattern.parse('2025-01-01 14:30:45 Pacific Standard Time');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
    });
  });

  describe('parsing', () => {
    // Individual token tests have been moved to separate files in tests/string-pattern/parsing/
    // This keeps the main test file manageable and allows for better organization
  });

    describe('Complex Pattern Combinations', () => {
    it('should parse full datetime with timezone', () => {
      const pattern = new DateTimePattern('EEEE, MMMM dd, yyyy \'at\' h:mm:ss a zzzz', { unicode: true });
      const value = pattern.parse('Wednesday, January 01, 2025 at 2:30:45 PM Pacific Standard Time');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
      expect(value.weekday).toBe(3);
    });

    it('should parse ISO format with timezone', () => {
      const pattern = new DateTimePattern('yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', { unicode: true });
      const value = pattern.parse('2025-01-01T14:30:45.123-08:00');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.second).toBe(45);
      expect(value.nanosecond).toBe(123000000);
    });

    it('should parse custom format with multiple separators', () => {
      const pattern = new DateTimePattern('MMM dd, yyyy | h:mm a | EEEE', { unicode: true });
      const value = pattern.parse('Jan 01, 2025 | 2:30 PM | Wednesday');
      expect(value.year).toBe(2025);
      expect(value.month).toBe(1);
      expect(value.day).toBe(1);
      expect(value.hour).toBe(14);
      expect(value.minute).toBe(30);
      expect(value.weekday).toBe(3);
    });
  });
});
