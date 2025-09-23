import { DateTimePattern } from './datetime-pattern';
import { DateOutOfRangeError } from './errors/date-out-of-range-error';

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
      const pattern = new DateTimePattern('YYY-MM-DD', { case: 'lowercase' });
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
    it('should parse hh:mm pattern', () => {
      const pattern = new DateTimePattern('hh:mm');
      const value = pattern.parse('14:30');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse hh:mm:ss pattern', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      const value = pattern.parse('14:30:45');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse h:mm:ss a pattern', () => {
      const pattern = new DateTimePattern('H:mm:ss a');
      const value = pattern.parse('2:30:45 PM');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
    });

    it('should parse hh:mm:ss.SSS pattern with fractional seconds', () => {
      const pattern = new DateTimePattern('hh:mm:ss.SSS');
      const value = pattern.parse('14:30:45.123');
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
      expect(value.normalized.fractionalSecond).toBe(.123);
    });
  });

  describe('Combined Date-Time Patterns', () => {
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

    it('should parse MM/DD/YYYY h:mm a pattern', () => {
      const pattern = new DateTimePattern('MM/DD/YYYY H:mm a');
      const value = pattern.parse('01/01/2025 2:30 PM');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
    });

    it('should parse DD-MM-YYYY hh:mm pattern', () => {
      const pattern = new DateTimePattern('DD-MM-YYYY hh:mm');
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
      const sets = [
        ['YYYY-MM-DD', '2025-01-01'],
        ['YYYY/MM/DD', '2025/01/01'],
        ['YYYY.MM.DD', '2025.01.01'],
        ['YYYY MM DD', '2025 01 01'],
      ];

      sets.forEach(set => {
        const pattern = new DateTimePattern(set[0]);
        const value = pattern.parse(set[1]);
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

    it('should handle midnight times (24 hour)', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      const value = pattern.parse('00:00:00');
      expect(value.normalized.hour).toBe(0);
      expect(value.normalized.minute).toBe(0);
      expect(value.normalized.second).toBe(0);
    });

    it('should not handle 24:00 (24 hour)', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      expect(() => pattern.parse('24:00:00')).toThrow();
    });

    it('should handle end of day times', () => {
      const pattern = new DateTimePattern('hh:mm:ss');
      const value = pattern.parse('23:59:59');
      expect(value.normalized.hour).toBe(23);
      expect(value.normalized.minute).toBe(59);
      expect(value.normalized.second).toBe(59);
    });
  });

  describe('Pattern Options', () => {

    describe('elastic', () => {
      it('should be elastic by default', () => {
        const pattern = new DateTimePattern('YYYY-MM-DD');
        const value = pattern.parse('202589-01-01');
        expect(value.normalized.year).toBe(202589);
        expect(value.normalized.month).toBe(1);
        expect(value.normalized.day).toBe(1);
      })
      it('should be elastic explicitly', () => {
        const pattern = new DateTimePattern('YYYY-MM-DD', { elastic: true });
        const value = pattern.parse('202589-01-01');
        expect(value.normalized.year).toBe(202589);
        expect(value.normalized.month).toBe(1);
        expect(value.normalized.day).toBe(1);
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
        expect(value.normalized.year).toBe(2025);
        expect(value.normalized.month).toBe(1);
        expect(value.normalized.day).toBe(1);
      })
      it('should be flexible explicitly', () => {
        const pattern = new DateTimePattern('YYYY-M-D', { flexible: true });
        const value = pattern.parse('2025-01-01');
        expect(value.normalized.year).toBe(2025);
        expect(value.normalized.month).toBe(1);
        expect(value.normalized.day).toBe(1);
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
        expect(value.normalized.year).toBe(999999);
        expect(value.normalized.month).toBe(1);
        expect(value.normalized.day).toBe(1);
      })

      it('should not limit range explicitly', () => {
        const pattern = new DateTimePattern('+YYYYYY-MM-DD', { limitRange: false });
        const value = pattern.parse('+999999-01-01');
        expect(value.normalized.year).toBe(999999);
        expect(value.normalized.month).toBe(1);
        expect(value.normalized.day).toBe(1);
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
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse DD pattern (padded day)', () => {
  //     const pattern = new DateTimePattern('YYYY-MM-DD');
  //     const value = pattern.parse('2025-01-01');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse DDD pattern (day of year)', () => {
  //     const pattern = new DateTimePattern('YYYY-DDD');
  //     const value = pattern.parse('2025-001');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse DDDD pattern (day of year padded)', () => {
  //     const pattern = new DateTimePattern('YYYY-DDDD');
  //     const value = pattern.parse('2025-0001');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse DDDDD pattern (day of year with more padding)', () => {
  //     const pattern = new DateTimePattern('YYYY-DDDDD');
  //     const value = pattern.parse('2025-00001');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse CCC pattern (weekday standalone short)', () => {
  //     const pattern = new DateTimePattern('CCC, YYYY-MM-DD', { unicode: true });
  //     const value = pattern.parse('Wed, 2025-01-01');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //     expect(value.normalized.weekday).toBe(3);
  //   });
  //
  //   it('should parse CCCC pattern (weekday standalone long)', () => {
  //     const pattern = new DateTimePattern('CCCC, YYYY-MM-DD', { unicode: true });
  //     const value = pattern.parse('Wednesday, 2025-01-01');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //     expect(value.normalized.weekday).toBe(3);
  //   });
  //
  //   it('should parse CCCCC pattern (weekday standalone narrow)', () => {
  //     const pattern = new DateTimePattern('CCCCC, YYYY-MM-DD', { unicode: true });
  //     const value = pattern.parse('W, 2025-01-01');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //     expect(value.normalized.weekday).toBe(3);
  //   });
  //
  //   it('should parse H pattern (24-hour format)', () => {
  //     const pattern = new DateTimePattern('H:mm');
  //     const value = pattern.parse('14:30');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  //
  //   it('should parse HH pattern (24-hour format padded)', () => {
  //     const pattern = new DateTimePattern('HH:mm');
  //     const value = pattern.parse('14:30');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  //
  //   it('should parse h pattern (12-hour format)', () => {
  //     const pattern = new DateTimePattern('h:mm a');
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  //
  //   it('should parse hh pattern (12-hour format padded)', () => {
  //     const pattern = new DateTimePattern('hh:mm a');
  //     const value = pattern.parse('02:30 PM');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  // });

  // describe('Unicode Pattern Variations', () => {
  //   it('should parse era patterns', () => {
  //     const pattern = new DateTimePattern('G yyyy-MM-dd', { unicode: true });
  //     const value = pattern.parse('AD 2025-01-01');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse month name patterns', () => {
  //     const pattern = new DateTimePattern('MMMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('January 01, 2025');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse month short patterns', () => {
  //     const pattern = new DateTimePattern('MMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('Jan 01, 2025');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse month narrow patterns', () => {
  //     const pattern = new DateTimePattern('MMMMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('J 01, 2025');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse standalone month patterns', () => {
  //     const pattern = new DateTimePattern('LLLL dd, yyyy', { unicode: true });
  //     const value = pattern.parse('January 01, 2025');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //   });
  //
  //   it('should parse weekday patterns', () => {
  //     const pattern = new DateTimePattern('EEEE, MMMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('Wednesday, January 01, 2025');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //     expect(value.normalized.weekday).toBe(3);
  //   });
  //
  //   it('should parse weekday short patterns', () => {
  //     const pattern = new DateTimePattern('EEE, MMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('Wed, Jan 01, 2025');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //     expect(value.normalized.weekday).toBe(3);
  //   });
  //
  //   it('should parse weekday narrow patterns', () => {
  //     const pattern = new DateTimePattern('EEEEE, MMM dd, yyyy', { unicode: true });
  //     const value = pattern.parse('W, Jan 01, 2025');
  //     expect(value.normalized.year).toBe(2025);
  //     expect(value.normalized.month).toBe(1);
  //     expect(value.normalized.day).toBe(1);
  //     expect(value.normalized.weekday).toBe(3);
  //   });
  //
  //   it('should parse day period patterns', () => {
  //     const pattern = new DateTimePattern('h:mm a', { unicode: true });
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  //
  //   it('should parse day period short patterns', () => {
  //     const pattern = new DateTimePattern('h:mm aaa', { unicode: true });
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  //
  //   it('should parse day period long patterns', () => {
  //     const pattern = new DateTimePattern('h:mm aaaa', { unicode: true });
  //     const value = pattern.parse('2:30 PM');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  //
  //   it('should parse day period narrow patterns', () => {
  //     const pattern = new DateTimePattern('h:mm aaaaa', { unicode: true });
  //     const value = pattern.parse('2:30 p');
  //     expect(value.normalized.hour).toBe(14);
  //     expect(value.normalized.minute).toBe(30);
  //   });
  // });

  describe('Timezone Patterns', () => {
    it('should parse timezone offset Z pattern', () => {
      const pattern = new DateTimePattern('YYYY-MM-DDThh:mm:ssZ');
      const value = pattern.parse('2025-01-01T14:30:45Z');
      expect(value.normalized.year).toBe(2025);
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.hour).toBe(14);
      expect(value.normalized.minute).toBe(30);
      expect(value.normalized.second).toBe(45);
      expect(value.normalized.isUtc).toBe(true);
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


  describe('parsing', () => {
    // EDIT HERE

    // Test stubs for all unicodeDateTimeTokenDefinitions tokens
    describe('eraShort', () => {
      describe('en-US', () => {
        describe('default case', () => {
          it('should parse AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US' });
            const value = pattern.parse('AD');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US' });
            const value = pattern.parse('BC');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail BCE', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US' });
            expect(() => pattern.parse('BCE')).toThrow();
          });
          it('should fail CE', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US' });
            expect(() => pattern.parse('CE')).toThrow();
          });
          it('should fail ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US' });
            expect(() => pattern.parse('ad')).toThrow();
          });
          it('should fail bc', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US' });
            expect(() => pattern.parse('bc')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'en-US' });
            const value = pattern.parse('01/01/2025 AD');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'en-US' });
            const value = pattern.parse('01/01/2025 BC');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'uppercase' });
            const value = pattern.parse('AD');
            expect(value.resolved.era).toBe(1);
          });
          it('should fail lowercase ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'uppercase' });
            expect(() => pattern.parse('ad')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'lowercase' });
            const value = pattern.parse('ad');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse bc', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'lowercase' });
            const value = pattern.parse('bc');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'lowercase' });
            expect(() => pattern.parse('AD')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('ad');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse bc', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('bc');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('AD');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('BC');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('Ad');
            expect(value.resolved.era).toBe(1);
          });
        })
      })
      describe('es-US', () => {
        describe('default case', () => {
          it('should parse d.C.', () => {
           const pattern = new DateTimePattern('G', { locale: 'es-US' });
           const value = pattern.parse('d.C.');
           expect(value.resolved.era).toBe(1);
          });
          it('should parse a.C.', () => {
           const pattern = new DateTimePattern('G', { locale: 'es-US' });
           const value = pattern.parse('a.C.');
           expect(value.resolved.era).toBe(0);
          });
          it('should fail BCE', () => {
           const pattern = new DateTimePattern('G', { locale: 'es-US' });
           expect(() => pattern.parse('BCE')).toThrow();
          });
          it('should fail CE', () => {
           const pattern = new DateTimePattern('G', { locale: 'es-US' });
           expect(() => pattern.parse('CE')).toThrow();
          });
          it('should fail AD', () => {
           const pattern = new DateTimePattern('G', { locale: 'es-US' });
           expect(() => pattern.parse('D.C.')).toThrow();
          });
          it('should fail BC', () => {
           const pattern = new DateTimePattern('G', { locale: 'es-US' });
           expect(() => pattern.parse('A.C.')).toThrow();
          });
          it('should be part of a valid date', () => {
           const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'es-US' });
           const value = pattern.parse('01/01/2025 d.C.');
           expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
           const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'es-US' });
           const value = pattern.parse('01/01/2025 a.C.');
           expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse D.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'uppercase' });
            const value = pattern.parse('D.C.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse A.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'uppercase' });
            const value = pattern.parse('A.C.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase d.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'uppercase' });
            expect(() => pattern.parse('d.C.')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse d.c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'lowercase' });
            const value = pattern.parse('d.c.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse a.c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'lowercase' });
            const value = pattern.parse('a.c.');
            expect(value.resolved.era).toBe(0);
           });
          it('should fail uppercase D.C.', () => {
             const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'lowercase' });
             expect(() => pattern.parse('D.C.')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse d.c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('d.c.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse a.c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('a.c.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse D.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('D.C.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse A.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('A.C.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse d.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('d.C.');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('en-UK', () => {
        describe('default case', () => {
          it('should parse AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK' });
            const value = pattern.parse('AD');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK' });
            const value = pattern.parse('BC');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail BCE', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK' });
            expect(() => pattern.parse('BCE')).toThrow();
          });
          it('should fail CE', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK' });
            expect(() => pattern.parse('CE')).toThrow();
          });
          it('should fail d.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK' });
            expect(() => pattern.parse('d.C.')).toThrow();
          });
          it('should fail a.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK' });
            expect(() => pattern.parse('a.C.')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'en-UK' });
            const value = pattern.parse('01/01/2025 AD');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'en-UK' });
            const value = pattern.parse('01/01/2025 BC');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'uppercase' });
            const value = pattern.parse('AD');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'uppercase' });
            const value = pattern.parse('BC');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'uppercase' });
            expect(() => pattern.parse('ad')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'lowercase' });
            const value = pattern.parse('ad');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse bc', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'lowercase' });
            const value = pattern.parse('bc');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'lowercase' });
            expect(() => pattern.parse('AD')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('ad');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse bc', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('bc');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('AD');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('BC');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Ad', () => {
            const pattern = new DateTimePattern('G', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('Ad');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('ru-RU', () => {
        describe('default case', () => {
          it('should parse н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU' });
            const value = pattern.parse('н. э.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse до н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU' });
            const value = pattern.parse('до н. э.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU' });
            expect(() => pattern.parse('AD')).toThrow();
          });
          it('should fail BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU' });
            expect(() => pattern.parse('BC')).toThrow();
          });
          it('should fail d.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU' });
            expect(() => pattern.parse('d.C.')).toThrow();
          });
          it('should fail a.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU' });
            expect(() => pattern.parse('a.C.')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'ru-RU' });
            const value = pattern.parse('01/01/2025 н. э.');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'ru-RU' });
            const value = pattern.parse('01/01/2025 до н. э.');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse Н. Э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'uppercase' });
            const value = pattern.parse('Н. Э.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse ДО Н. Э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'uppercase' });
            const value = pattern.parse('ДО Н. Э.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'uppercase' });
            expect(() => pattern.parse('н. э.')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'lowercase' });
            const value = pattern.parse('н. э.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse до н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'lowercase' });
            const value = pattern.parse('до н. э.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase Н. Э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'lowercase' });
            expect(() => pattern.parse('Н. Э.')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('н. э.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse до н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('до н. э.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Н. Э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('Н. Э.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse ДО Н. Э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('ДО Н. Э.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Н. э.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('Н. э.');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('ja-JP', () => {
        describe('default case', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP' });
            expect(() => pattern.parse('AD')).toThrow();
          });
          it('should fail BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP' });
            expect(() => pattern.parse('BC')).toThrow();
          });
          it('should fail d.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP' });
            expect(() => pattern.parse('d.C.')).toThrow();
          });
          it('should fail a.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP' });
            expect(() => pattern.parse('a.C.')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'ja-JP' });
            const value = pattern.parse('01/01/2025 西暦');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'ja-JP' });
            const value = pattern.parse('01/01/2025 紀元前');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP', case: 'uppercase' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP', case: 'uppercase' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
        })
        describe('lowercase', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP', case: 'lowercase' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP', case: 'lowercase' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
        })
        describe('case insensitive', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('G', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('de-DE', () => {
        describe('default case', () => {
          it('should parse n. Chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE' });
            const value = pattern.parse('n. Chr.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse v. Chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE' });
            const value = pattern.parse('v. Chr.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE' });
            expect(() => pattern.parse('AD')).toThrow();
          });
          it('should fail BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE' });
            expect(() => pattern.parse('BC')).toThrow();
          });
          it('should fail d.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE' });
            expect(() => pattern.parse('d.C.')).toThrow();
          });
          it('should fail a.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE' });
            expect(() => pattern.parse('a.C.')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'de-DE' });
            const value = pattern.parse('01/01/2025 n. Chr.');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'de-DE' });
            const value = pattern.parse('01/01/2025 v. Chr.');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse N. CHR.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'uppercase' });
            const value = pattern.parse('N. CHR.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse V. CHR.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'uppercase' });
            const value = pattern.parse('V. CHR.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase n. Chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'uppercase' });
            expect(() => pattern.parse('n. Chr.')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse n. chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'lowercase' });
            const value = pattern.parse('n. chr.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse v. chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'lowercase' });
            const value = pattern.parse('v. chr.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase N. CHR.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'lowercase' });
            expect(() => pattern.parse('N. CHR.')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse n. chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('n. chr.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse v. chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('v. chr.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse N. CHR.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('N. CHR.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse V. CHR.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('V. CHR.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse n. Chr.', () => {
            const pattern = new DateTimePattern('G', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('n. Chr.');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('fr-FR', () => {
        describe('default case', () => {
          it('should parse ap. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR' });
            const value = pattern.parse('ap. J.-C.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse av. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR' });
            const value = pattern.parse('av. J.-C.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail AD', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR' });
            expect(() => pattern.parse('AD')).toThrow();
          });
          it('should fail BC', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR' });
            expect(() => pattern.parse('BC')).toThrow();
          });
          it('should fail d.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR' });
            expect(() => pattern.parse('d.C.')).toThrow();
          });
          it('should fail a.C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR' });
            expect(() => pattern.parse('a.C.')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'fr-FR' });
            const value = pattern.parse('01/01/2025 ap. J.-C.');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'fr-FR' });
            const value = pattern.parse('01/01/2025 av. J.-C.');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse AP. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'uppercase' });
            const value = pattern.parse('AP. J.-C.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse AV. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'uppercase' });
            const value = pattern.parse('AV. J.-C.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase ap. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'uppercase' });
            expect(() => pattern.parse('ap. J.-C.')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse ap. j.-c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'lowercase' });
            const value = pattern.parse('ap. j.-c.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse av. j.-c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'lowercase' });
            const value = pattern.parse('av. j.-c.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase AP. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'lowercase' });
            expect(() => pattern.parse('AP. J.-C.')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse ap. j.-c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('ap. j.-c.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse av. j.-c.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('av. j.-c.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse AP. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('AP. J.-C.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse AV. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('AV. J.-C.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse ap. J.-C.', () => {
            const pattern = new DateTimePattern('G', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('ap. J.-C.');
            expect(value.resolved.era).toBe(1);
          });
        })
      })
    });

    describe('eraLong', () => {
      describe('en-US', () => {
        describe('default case', () => {
          it('should parse Anno Domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US' });
            const value = pattern.parse('Anno Domini');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse Before Christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US' });
            const value = pattern.parse('Before Christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US' });
            expect(() => pattern.parse('anno domini')).toThrow();
          });
          it('should fail lowercase before christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US' });
            expect(() => pattern.parse('before christ')).toThrow();
          });
          it('should fail uppercase ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US' });
            expect(() => pattern.parse('ANNO DOMINI')).toThrow();
          });
          it('should fail uppercase BEFORE CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US' });
            expect(() => pattern.parse('BEFORE CHRIST')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'en-US' });
            const value = pattern.parse('01/01/2025 Anno Domini');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'en-US' });
            const value = pattern.parse('01/01/2025 Before Christ');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'uppercase' });
            const value = pattern.parse('ANNO DOMINI');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BEFORE CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'uppercase' });
            const value = pattern.parse('BEFORE CHRIST');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'uppercase' });
            expect(() => pattern.parse('anno domini')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'lowercase' });
            const value = pattern.parse('anno domini');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse before christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'lowercase' });
            const value = pattern.parse('before christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'lowercase' });
            expect(() => pattern.parse('ANNO DOMINI')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('anno domini');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse before christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('before christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('ANNO DOMINI');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BEFORE CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('BEFORE CHRIST');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Anno Domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-US', case: 'insensitive' });
            const value = pattern.parse('Anno Domini');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('es-US', () => {
        describe('default case', () => {
          it('should parse después de Cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US' });
            const value = pattern.parse('después de Cristo');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse antes de Cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US' });
            const value = pattern.parse('antes de Cristo');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase después de cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US' });
            expect(() => pattern.parse('después de cristo')).toThrow();
          });
          it('should fail lowercase antes de cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US' });
            expect(() => pattern.parse('antes de cristo')).toThrow();
          });
          it('should fail uppercase DESPUÉS DE CRISTO', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US' });
            expect(() => pattern.parse('DESPUÉS DE CRISTO')).toThrow();
          });
          it('should fail uppercase ANTES DE CRISTO', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US' });
            expect(() => pattern.parse('ANTES DE CRISTO')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'es-US' });
            const value = pattern.parse('01/01/2025 después de Cristo');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'es-US' });
            const value = pattern.parse('01/01/2025 antes de Cristo');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse DESPUÉS DE CRISTO', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'uppercase' });
            const value = pattern.parse('DESPUÉS DE CRISTO');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse ANTES DE CRISTO', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'uppercase' });
            const value = pattern.parse('ANTES DE CRISTO');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase después de Cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'uppercase' });
            expect(() => pattern.parse('después de Cristo')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse después de cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'lowercase' });
            const value = pattern.parse('después de cristo');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse antes de cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'lowercase' });
            const value = pattern.parse('antes de cristo');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase DESPUÉS DE CRISTO', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'lowercase' });
            expect(() => pattern.parse('DESPUÉS DE CRISTO')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse después de cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('después de cristo');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse antes de cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('antes de cristo');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse DESPUÉS DE CRISTO', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('DESPUÉS DE CRISTO');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse ANTES DE CRISTO', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('ANTES DE CRISTO');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Después de Cristo', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'insensitive' });
            const value = pattern.parse('Después de Cristo');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('en-UK', () => {
        describe('default case', () => {
          it('should parse Anno Domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
            const value = pattern.parse('Anno Domini');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse Before Christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
            const value = pattern.parse('Before Christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
            expect(() => pattern.parse('anno domini')).toThrow();
          });
          it('should fail lowercase before christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
            expect(() => pattern.parse('before christ')).toThrow();
          });
          it('should fail uppercase BEFORE CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
            expect(() => pattern.parse('BEFORE CHRIST')).toThrow();
          });
          it('should fail uppercase ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
            expect(() => pattern.parse('ANNO DOMINI')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'en-UK' });
            const value = pattern.parse('01/01/2025 Anno Domini');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'en-UK' });
            const value = pattern.parse('01/01/2025 Before Christ');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'uppercase' });
            const value = pattern.parse('ANNO DOMINI');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BEFORE CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'uppercase' });
            const value = pattern.parse('BEFORE CHRIST');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'uppercase' });
            expect(() => pattern.parse('anno domini')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'lowercase' });
            const value = pattern.parse('anno domini');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse before christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'lowercase' });
            const value = pattern.parse('before christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'lowercase' });
            expect(() => pattern.parse('ANNO DOMINI')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse anno domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('anno domini');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse before christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('before christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse ANNO DOMINI', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('ANNO DOMINI');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse BEFORE CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('BEFORE CHRIST');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Anno Domini', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'en-UK', case: 'insensitive' });
            const value = pattern.parse('Anno Domini');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('ru-RU', () => {
        describe('default case', () => {
          it('should parse от Рождества Христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
            const value = pattern.parse('от Рождества Христова');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse до Рождества Христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
            const value = pattern.parse('до Рождества Христова');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase от рождества христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
            expect(() => pattern.parse('от рождества христова')).toThrow();
          });
          it('should fail lowercase до рождества христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
            expect(() => pattern.parse('до рождества христова')).toThrow();
          });
          it('should fail uppercase ОТ РОЖДЕСТВА ХРИСТОВА', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
            expect(() => pattern.parse('ОТ РОЖДЕСТВА ХРИСТОВА')).toThrow();
          });
          it('should fail uppercase ДО РОЖДЕСТВА ХРИСТОВА', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
            expect(() => pattern.parse('ДО РОЖДЕСТВА ХРИСТОВА')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ru-RU' });
            const value = pattern.parse('01/01/2025 от Рождества Христова');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ru-RU' });
            const value = pattern.parse('01/01/2025 до Рождества Христова');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse ОТ РОЖДЕСТВА ХРИСТОВА', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'uppercase' });
            const value = pattern.parse('ОТ РОЖДЕСТВА ХРИСТОВА');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse ДО РОЖДЕСТВА ХРИСТОВА', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'uppercase' });
            const value = pattern.parse('ДО РОЖДЕСТВА ХРИСТОВА');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase от Рождества Христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'uppercase' });
            expect(() => pattern.parse('от Рождества Христова')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse от рождества христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'lowercase' });
            const value = pattern.parse('от рождества христова');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse до рождества христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'lowercase' });
            const value = pattern.parse('до рождества христова');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase ОТ РОЖДЕСТВА ХРИСТОВА', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'lowercase' });
            expect(() => pattern.parse('ОТ РОЖДЕСТВА ХРИСТОВА')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse от рождества христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('от рождества христова');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse до рождества христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('до рождества христова');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse ОТ РОЖДЕСТВА ХРИСТОВА', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('ОТ РОЖДЕСТВА ХРИСТОВА');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse ДО РОЖДЕСТВА ХРИСТОВА', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('ДО РОЖДЕСТВА ХРИСТОВА');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse От Рождества Христова', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
            const value = pattern.parse('От Рождества Христова');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('ja-JP', () => {
        describe('default case', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail with invalid Japanese era', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
            expect(() => pattern.parse('西暦年')).toThrow();
          });
          it('should fail with invalid Japanese era', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
            expect(() => pattern.parse('紀元前年')).toThrow();
          });
          it('should fail with English era', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
            expect(() => pattern.parse('AD')).toThrow();
          });
          it('should fail with English era', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
            expect(() => pattern.parse('BC')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ja-JP' });
            const value = pattern.parse('01/01/2025 西暦');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ja-JP' });
            const value = pattern.parse('01/01/2025 紀元前');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'uppercase' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'uppercase' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
        })
        describe('lowercase', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'lowercase' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'lowercase' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
        })
        describe('case insensitive', () => {
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse 紀元前', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('紀元前');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse 西暦', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP', case: 'insensitive' });
            const value = pattern.parse('西暦');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('de-DE', () => {
        describe('default case', () => {
          it('should parse n. Chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
            const value = pattern.parse('n. Chr.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse v. Chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
            const value = pattern.parse('v. Chr.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase n. chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
            expect(() => pattern.parse('n. chr.')).toThrow();
          });
          it('should fail lowercase v. chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
            expect(() => pattern.parse('v. chr.')).toThrow();
          });
          it('should fail uppercase N. CHR.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
            expect(() => pattern.parse('N. CHR.')).toThrow();
          });
          it('should fail uppercase V. CHR.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
            expect(() => pattern.parse('V. CHR.')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'de-DE' });
            const value = pattern.parse('01/01/2025 n. Chr.');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'de-DE' });
            const value = pattern.parse('01/01/2025 v. Chr.');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse N. CHR.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'uppercase' });
            const value = pattern.parse('N. CHR.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse V. CHR.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'uppercase' });
            const value = pattern.parse('V. CHR.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase n. Chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'uppercase' });
            expect(() => pattern.parse('n. Chr.')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse n. chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'lowercase' });
            const value = pattern.parse('n. chr.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse v. chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'lowercase' });
            const value = pattern.parse('v. chr.');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase N. CHR.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'lowercase' });
            expect(() => pattern.parse('N. CHR.')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse n. chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('n. chr.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse v. chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('v. chr.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse N. CHR.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('N. CHR.');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse V. CHR.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('V. CHR.');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse n. Chr.', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
            const value = pattern.parse('n. Chr.');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

      describe('fr-FR', () => {
        describe('default case', () => {
          it('should parse après Jésus-Christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR' });
            const value = pattern.parse('après Jésus-Christ');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse avant Jésus-Christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR' });
            const value = pattern.parse('avant Jésus-Christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase après jésus-christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR' });
            expect(() => pattern.parse('après jésus-christ')).toThrow();
          });
          it('should fail lowercase avant jésus-christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR' });
            expect(() => pattern.parse('avant jésus-christ')).toThrow();
          });
          it('should fail uppercase APRÈS JÉSUS-CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR' });
            expect(() => pattern.parse('APRÈS JÉSUS-CHRIST')).toThrow();
          });
          it('should fail uppercase AVANT JÉSUS-CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR' });
            expect(() => pattern.parse('AVANT JÉSUS-CHRIST')).toThrow();
          });
          it('should be part of a valid date', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'fr-FR' });
            const value = pattern.parse('01/01/2025 après Jésus-Christ');
            expect(value.normalized.year).toBe(2025);
          })
          it('should normalize the year using the era', () => {
            const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'fr-FR' });
            const value = pattern.parse('01/01/2025 avant Jésus-Christ');
            expect(value.normalized.year).toBe(-2024);
          })
        })
        describe('uppercase', () => {
          it('should parse APRÈS JÉSUS-CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'uppercase' });
            const value = pattern.parse('APRÈS JÉSUS-CHRIST');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse AVANT JÉSUS-CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'uppercase' });
            const value = pattern.parse('AVANT JÉSUS-CHRIST');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail lowercase après Jésus-Christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'uppercase' });
            expect(() => pattern.parse('après Jésus-Christ')).toThrow();
          });
        })
        describe('lowercase', () => {
          it('should parse après jésus-christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'lowercase' });
            const value = pattern.parse('après jésus-christ');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse avant jésus-christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'lowercase' });
            const value = pattern.parse('avant jésus-christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should fail uppercase APRÈS JÉSUS-CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'lowercase' });
            expect(() => pattern.parse('APRÈS JÉSUS-CHRIST')).toThrow();
          });
        })
        describe('case insensitive', () => {
          it('should parse après jésus-christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('après jésus-christ');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse avant jésus-christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('avant jésus-christ');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse APRÈS JÉSUS-CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('APRÈS JÉSUS-CHRIST');
            expect(value.resolved.era).toBe(1);
          });
          it('should parse AVANT JÉSUS-CHRIST', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('AVANT JÉSUS-CHRIST');
            expect(value.resolved.era).toBe(0);
          });
          it('should parse Après Jésus-Christ', () => {
            const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'insensitive' });
            const value = pattern.parse('Après Jésus-Christ');
            expect(value.resolved.era).toBe(1);
          });
        })
      })

    });

    describe('eraNarrow', () => {
      // TODO: Add tests for eraNarrow token
    });

    describe('commonEraShort', () => {
      // TODO: Add tests for commonEraShort token
    });

    describe('commonEraLong', () => {
      // TODO: Add tests for commonEraLong token
    });

    describe('commonEraNarrow', () => {
      // TODO: Add tests for commonEraNarrow token
    });

    describe('calendarYear', () => {
      // TODO: Add tests for calendarYear token
    });

    describe('isoYear', () => {
      // TODO: Add tests for isoYear token
    });

    describe('signedIsoYear', () => {
      // TODO: Add tests for signedIsoYear token
    });

    describe('negativeSignedIsoYear', () => {
      // TODO: Add tests for negativeSignedIsoYear token
    });

    describe('month', () => {
      // TODO: Add tests for month token
    });

    describe('monthPadded', () => {
      // TODO: Add tests for monthPadded token
    });

    describe('monthShort', () => {
      // TODO: Add tests for monthShort token
    });

    describe('monthLong', () => {
      // TODO: Add tests for monthLong token
    });

    describe('monthNarrow', () => {
      // TODO: Add tests for monthNarrow token
    });

    describe('monthStandaloneShort', () => {
      // TODO: Add tests for monthStandaloneShort token
    });

    describe('monthStandaloneLong', () => {
      // TODO: Add tests for monthStandaloneLong token
    });

    describe('monthStandaloneNarrow', () => {
      // TODO: Add tests for monthStandaloneNarrow token
    });

    describe('day', () => {
      // TODO: Add tests for day token
    });

    describe('dayPadded', () => {
      // TODO: Add tests for dayPadded token
    });

    describe('weekdayShort', () => {
      // TODO: Add tests for weekdayShort token
    });

    describe('weekdayLong', () => {
      // TODO: Add tests for weekdayLong token
    });

    describe('weekdayNarrow', () => {
      // TODO: Add tests for weekdayNarrow token
    });

    describe('weekdayStandaloneShort', () => {
      // TODO: Add tests for weekdayStandaloneShort token
    });

    describe('weekdayStandaloneLong', () => {
      // TODO: Add tests for weekdayStandaloneLong token
    });

    describe('weekdayStandaloneNarrow', () => {
      // TODO: Add tests for weekdayStandaloneNarrow token
    });

    describe('weekday', () => {
      // TODO: Add tests for weekday token
    });

    describe('weekdayPadded', () => {
      // TODO: Add tests for weekdayPadded token
    });

    describe('weekdayLocal', () => {
      // TODO: Add tests for weekdayLocal token
    });

    describe('weekdayLocalPadded', () => {
      // TODO: Add tests for weekdayLocalPadded token
    });

    describe('dayPeriod', () => {
      // TODO: Add tests for dayPeriod token
    });

    describe('dayPeriodShort', () => {
      // TODO: Add tests for dayPeriodShort token
    });

    describe('dayPeriodLong', () => {
      // TODO: Add tests for dayPeriodLong token
    });

    describe('dayPeriodNarrow', () => {
      // TODO: Add tests for dayPeriodNarrow token
    });

    describe('twelveHour', () => {
      // TODO: Add tests for twelveHour token
    });

    describe('twelveHourPadded', () => {
      // TODO: Add tests for twelveHourPadded token
    });

    describe('hour', () => {
      // TODO: Add tests for hour token
    });

    describe('hourPadded', () => {
      // TODO: Add tests for hourPadded token
    });

    describe('minute', () => {
      // TODO: Add tests for minute token
    });

    describe('minutePadded', () => {
      // TODO: Add tests for minutePadded token
    });

    describe('second', () => {
      // TODO: Add tests for second token
    });

    describe('secondPadded', () => {
      // TODO: Add tests for secondPadded token
    });

    describe('fractionalSecond', () => {
      // TODO: Add tests for fractionalSecond token
    });

    describe('timeZoneOffsetZ', () => {
      // TODO: Add tests for timeZoneOffsetZ token
    });

    describe('timeZoneOffsetWithZ_X', () => {
      // TODO: Add tests for timeZoneOffsetWithZ_X token
    });

    describe('timeZoneOffsetWithZ_XX', () => {
      // TODO: Add tests for timeZoneOffsetWithZ_XX token
    });

    describe('timeZoneOffsetWithZ_XXX', () => {
      // TODO: Add tests for timeZoneOffsetWithZ_XXX token
    });

    describe('timeZoneOffsetWithZ_XXXX', () => {
      // TODO: Add tests for timeZoneOffsetWithZ_XXXX token
    });

    describe('timeZoneOffsetWithZ_XXXXX', () => {
      // TODO: Add tests for timeZoneOffsetWithZ_XXXXX token
    });

    describe('timeZoneOffsetWithoutZ_x', () => {
      // TODO: Add tests for timeZoneOffsetWithoutZ_x token
    });

    describe('timeZoneOffsetWithoutZ_xx', () => {
      // TODO: Add tests for timeZoneOffsetWithoutZ_xx token
    });

    describe('timeZoneOffsetWithoutZ_xxx', () => {
      // TODO: Add tests for timeZoneOffsetWithoutZ_xxx token
    });

    describe('timeZoneOffsetWithoutZ_xxxx', () => {
      // TODO: Add tests for timeZoneOffsetWithoutZ_xxxx token
    });

    describe('timeZoneOffsetWithoutZ_xxxxx', () => {
      // TODO: Add tests for timeZoneOffsetWithoutZ_xxxxx token
    });

    describe('timeZoneId', () => {
      // TODO: Add tests for timeZoneId token
    });

    describe('timeZoneNameShort', () => {
      // TODO: Add tests for timeZoneNameShort token
    });

    describe('timeZoneNameLong', () => {
      // TODO: Add tests for timeZoneNameLong token
    });

    describe('secondsTimestamp', () => {
      describe('unsigned', () => {
        it('should parse seconds timestamp pattern', () => {
          const pattern = new DateTimePattern('t');
          const value = pattern.parse('1735689600');
          expect(value.normalized.secondsTimestamp).toBe(1735689600);
        });
        it('should fail with a + sign', () => {
          const pattern = new DateTimePattern('t');
          expect(() => pattern.parse('+1735689600')).toThrow();
        });
        it('should fail with a - sign', () => {
          const pattern = new DateTimePattern('t');
          expect(() => pattern.parse('-1735689600')).toThrow();
        });
      })
      describe('+ prefix', () => {
        it('should parse seconds timestamp pattern with a +', () => {
          const pattern = new DateTimePattern('+t');
          const value = pattern.parse('+1735689600');
          expect(value.normalized.secondsTimestamp).toBe(1735689600);
        });
        it('should parse seconds timestamp pattern with a -', () => {
          const pattern = new DateTimePattern('+t');
          const value = pattern.parse('-1735689600');
          expect(value.normalized.secondsTimestamp).toBe(-1735689600);
        });
        it('should fail without a sign', () => {
          const pattern = new DateTimePattern('t');
          expect(() => pattern.parse('1735689600')).toThrow();
        });
      })
      describe('- prefix', () => {
        it('should parse seconds timestamp without a sign', () => {
          const pattern = new DateTimePattern('-t');
          const value = pattern.parse('1735689600');
          expect(value.normalized.secondsTimestamp).toBe(1735689600);
        });
        it('should parse seconds timestamp pattern with a -', () => {
          const pattern = new DateTimePattern('-t');
          const value = pattern.parse('-1735689600');
          expect(value.normalized.secondsTimestamp).toBe(-1735689600);
        });
        it('should fail with a + sign', () => {
          const pattern = new DateTimePattern('-t');
          expect(() => pattern.parse('+1735689600')).toThrow();
        });
      })
    })

    describe('millisecondsTimestamp', () => {
      describe('unsigned', () => {
        it('should parse milliseconds timestamp pattern', () => {
          const pattern = new DateTimePattern('n');
          const value = pattern.parse('1735689600');
          expect(value.normalized.millisecondsTimestamp).toBe(1735689600);
        });
        it('should fail with a + sign', () => {
          const pattern = new DateTimePattern('n');
          expect(() => pattern.parse('+1735689600')).toThrow();
        });
        it('should fail with a - sign', () => {
          const pattern = new DateTimePattern('n');
          expect(() => pattern.parse('-1735689600')).toThrow();
        });
      })
      describe('+ prefix', () => {
        it('should parse milliseconds timestamp pattern with a +', () => {
          const pattern = new DateTimePattern('+n');
          const value = pattern.parse('+1735689600');
          expect(value.normalized.millisecondsTimestamp).toBe(1735689600);
        });
        it('should parse milliseconds timestamp pattern with a -', () => {
          const pattern = new DateTimePattern('+n');
          const value = pattern.parse('-1735689600');
          expect(value.normalized.millisecondsTimestamp).toBe(-1735689600);
        });
        it('should fail without a sign', () => {
          const pattern = new DateTimePattern('+n');
          expect(() => pattern.parse('1735689600')).toThrow();
        });
      })
      describe('- prefix', () => {
        it('should parse milliseconds timestamp without a sign', () => {
          const pattern = new DateTimePattern('-n');
          const value = pattern.parse('1735689600');
          expect(value.normalized.millisecondsTimestamp).toBe(1735689600);
        });
        it('should parse milliseconds timestamp pattern with a -', () => {
          const pattern = new DateTimePattern('-n');
          const value = pattern.parse('-1735689600');
          expect(value.normalized.millisecondsTimestamp).toBe(-1735689600);
        });
        it('should fail with a + sign', () => {
          const pattern = new DateTimePattern('-n');
          expect(() => pattern.parse('+1735689600')).toThrow();
        });
      })
    })

    describe('nanosecondsTimestamp', () => {
      describe('unsigned', () => {
        it('should parse nanoseconds timestamp pattern', () => {
          const pattern = new DateTimePattern('N');
          const value = pattern.parse('1735689600');
          expect(value.normalized.nanosecondsTimestamp).toBe(1735689600);
        });
        it('should fail with a + sign', () => {
          const pattern = new DateTimePattern('N');
          expect(() => pattern.parse('+1735689600')).toThrow();
        });
        it('should fail with a - sign', () => {
          const pattern = new DateTimePattern('N');
          expect(() => pattern.parse('-1735689600')).toThrow();
        });
      })
      describe('+ prefix', () => {
        it('should parse nanoseconds timestamp pattern with a +', () => {
          const pattern = new DateTimePattern('+N');
          const value = pattern.parse('+1735689600');
          expect(value.normalized.nanosecondsTimestamp).toBe(1735689600);
        });
        it('should parse nanoseconds timestamp pattern with a -', () => {
          const pattern = new DateTimePattern('+N');
          const value = pattern.parse('-1735689600');
          expect(value.normalized.nanosecondsTimestamp).toBe(-1735689600);
        });
        it('should fail without a sign', () => {
          const pattern = new DateTimePattern('+N');
          expect(() => pattern.parse('1735689600')).toThrow();
        });
      })
      describe('- prefix', () => {
        it('should parse nanoseconds timestamp without a sign', () => {
          const pattern = new DateTimePattern('-N');
          const value = pattern.parse('1735689600');
          expect(value.normalized.nanosecondsTimestamp).toBe(1735689600);
        });
        it('should parse nanoseconds timestamp pattern with a -', () => {
          const pattern = new DateTimePattern('-N');
          const value = pattern.parse('-1735689600');
          expect(value.normalized.nanosecondsTimestamp).toBe(-1735689600);
        });
        it('should fail with a + sign', () => {
          const pattern = new DateTimePattern('-N');
          expect(() => pattern.parse('+1735689600')).toThrow();
        });
      })
    })
    // STOP EDITING HERE
  })


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
