import { DayPeriodNames } from './day-period-names';

describe('DayPeriodNames', () => {
  const testLocales = ['en-US', 'es-US', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR', 'en-GB'];
  const testCases = ['default', 'uppercase', 'lowercase'] as const;
  const testStandalone = [true, false];

  describe('get() method', () => {
    test('should return same instance for same parameters', () => {
      const instance1 = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: false });
      expect(instance1).toBe(instance2);
    });

    test('should return different instances for different parameters', () => {
      const instance1 = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = DayPeriodNames.get({ locale: 'en-US', case: 'uppercase', standalone: false });
      const instance3 = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: true });
      const instance4 = DayPeriodNames.get({ locale: 'es-US', case: 'default', standalone: false });
      
      expect(instance1).not.toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance1).not.toBe(instance4);
    });

    test('should use default values when not provided', () => {
      const instance = DayPeriodNames.get();
      expect(instance.locale).toBeDefined();
      expect(instance.case).toBe('default');
      expect(instance.standalone).toBe(false);
    });
  });

  describe('default property', () => {
    test.each(testLocales)('should return correct default names for locale %s', (locale) => {
      const instance = DayPeriodNames.get({ locale, case: 'default', standalone: false });
      const defaultNames = instance.default;
      
      expect(defaultNames).toHaveLength(2);
      expect(defaultNames[0]).toMatch(/AM|am|a\.m\.|午前/i);
      expect(defaultNames[1]).toMatch(/PM|pm|p\.m\.|午後/i);
    });

    test.each(testCases)('should handle case %s correctly for default', (caseType) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const defaultNames = instance.default;
      
      expect(defaultNames).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(defaultNames[0]).toBe('AM');
        expect(defaultNames[1]).toBe('PM');
      } else if (caseType === 'lowercase') {
        expect(defaultNames[0]).toBe('am');
        expect(defaultNames[1]).toBe('pm');
      } else {
        expect(defaultNames[0]).toBe('AM');
        expect(defaultNames[1]).toBe('PM');
      }
    });

    test.each(testStandalone)('should handle standalone %s correctly for default', (standalone) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone });
      const defaultNames = instance.default;
      
      expect(defaultNames).toHaveLength(2);
      expect(defaultNames[0]).toMatch(/AM|am/i);
      expect(defaultNames[1]).toMatch(/PM|pm/i);
    });
  });

  describe('long property', () => {
    test.each(testLocales)('should return correct long names for locale %s', (locale) => {
      const instance = DayPeriodNames.get({ locale, case: 'default', standalone: false });
      const long = instance.long;
      
      expect(long).toHaveLength(2);
      expect(long[0]).toMatch(/AM|am|a\.m\.|ante meridiem|before noon|morning|午前/i);
      expect(long[1]).toMatch(/PM|pm|p\.m\.|post meridiem|after noon|evening|午後/i);
    });

    test.each(testCases)('should handle case %s correctly for long', (caseType) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const long = instance.long;
      
      expect(long).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(long[0]).toBe(long[0].toUpperCase());
        expect(long[1]).toBe(long[1].toUpperCase());
      } else if (caseType === 'lowercase') {
        expect(long[0]).toBe(long[0].toLowerCase());
        expect(long[1]).toBe(long[1].toLowerCase());
      }
    });

    test.each(testStandalone)('should handle standalone %s correctly for long', (standalone) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone });
      const long = instance.long;
      
      expect(long).toHaveLength(2);
      expect(long[0]).toBeDefined();
      expect(long[1]).toBeDefined();
    });
  });

  describe('short property', () => {
    test.each(testLocales)('should return correct short names for locale %s', (locale) => {
      const instance = DayPeriodNames.get({ locale, case: 'default', standalone: false });
      const short = instance.short;
      
      expect(short).toHaveLength(2);
      expect(short[0]).toMatch(/AM|am|a\.m\.|午前/i);
      expect(short[1]).toMatch(/PM|pm|p\.m\.|午後/i);
    });

    test.each(testCases)('should handle case %s correctly for short', (caseType) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const short = instance.short;
      
      expect(short).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(short[0]).toBe('AM');
        expect(short[1]).toBe('PM');
      } else if (caseType === 'lowercase') {
        expect(short[0]).toBe('am');
        expect(short[1]).toBe('pm');
      } else {
        expect(short[0]).toBe('am');
        expect(short[1]).toBe('pm');
      }
    });
  });

  describe('narrow property', () => {
    test.each(testLocales)('should return correct narrow names for locale %s', (locale) => {
      const instance = DayPeriodNames.get({ locale, case: 'default', standalone: false });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(2);
      expect(narrow[0]).toMatch(/A|a|午前/i);
      expect(narrow[1]).toMatch(/P|p|午後/i);
    });

    test.each(testCases)('should handle case %s correctly for narrow', (caseType) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(narrow[0]).toBe('A');
        expect(narrow[1]).toBe('P');
      } else if (caseType === 'lowercase') {
        expect(narrow[0]).toBe('a');
        expect(narrow[1]).toBe('p');
      } else {
        expect(narrow[0]).toBe('a');
        expect(narrow[1]).toBe('p');
      }
    });
  });

  describe('standalone property', () => {
    test.each(testStandalone)('should set correct standalone %s', (standalone) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone });
      expect(instance.standalone).toBe(standalone);
    });
  });

  describe('caching behavior', () => {
    test('should cache instances correctly', () => {
      const instance1 = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance3 = DayPeriodNames.get({ locale: 'en-US', case: 'uppercase', standalone: false });
      const instance4 = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: true });
      
      expect(instance1).toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance1).not.toBe(instance4);
    });

    test('should cache different locales separately', () => {
      const enInstance = DayPeriodNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const esInstance = DayPeriodNames.get({ locale: 'es-US', case: 'default', standalone: false });
      
      expect(enInstance).not.toBe(esInstance);
    });
  });

  describe('locale property', () => {
    test.each(testLocales)('should set correct locale %s', (locale) => {
      const instance = DayPeriodNames.get({ locale });
      expect(instance.locale).toBe(locale);
    });
  });

  describe('case property', () => {
    test.each(testCases)('should set correct case %s', (caseType) => {
      const instance = DayPeriodNames.get({ locale: 'en-US', case: caseType });
      expect(instance.case).toBe(caseType);
    });
  });

  describe('comprehensive combinations', () => {
    test.each(testLocales)('should work for all combinations with locale %s', (locale) => {
      testCases.forEach(caseType => {
        testStandalone.forEach(standalone => {
          const instance = DayPeriodNames.get({ locale, case: caseType, standalone });
          
          expect(instance.locale).toBe(locale);
          expect(instance.case).toBe(caseType);
          expect(instance.standalone).toBe(standalone);
          
          expect(instance.default).toHaveLength(2);
          expect(instance.long).toHaveLength(2);
          expect(instance.short).toHaveLength(2);
          expect(instance.narrow).toHaveLength(2);
        });
      });
    });
  });
});
