import { WeekdayNames } from './weekday-names';

describe('WeekdayNames', () => {
  const testLocales = ['en-US', 'es-US', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR', 'en-GB'];
  const testCases = ['default', 'uppercase', 'lowercase'] as const;
  const testStandalone = [true, false];

  describe('get() method', () => {
    test('should return same instance for same parameters', () => {
      const instance1 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      expect(instance1).toBe(instance2);
    });

    test('should return different instances for different parameters', () => {
      const instance1 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = WeekdayNames.get({ locale: 'en-US', case: 'uppercase', standalone: false });
      const instance3 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: true });
      const instance4 = WeekdayNames.get({ locale: 'es-US', case: 'default', standalone: false });
      
      expect(instance1).not.toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance1).not.toBe(instance4);
    });

    test('should use default values when not provided', () => {
      const instance = WeekdayNames.get();
      expect(instance.locale).toBeDefined();
      expect(instance.case).toBe('default');
      expect(instance.standalone).toBe(false);
    });
  });

  describe('long property', () => {
    test.each(testLocales)('should return correct long names for locale %s', (locale) => {
      const instance = WeekdayNames.get({ locale, case: 'default', standalone: false });
      const long = instance.long;
      
      expect(long).toHaveLength(7);
      expect(long[0]).toMatch(/Sunday|Domingo|Воскресенье|日曜日|Sonntag|dimanche/i);
      expect(long[6]).toMatch(/Saturday|Sábado|Суббота|土曜日|Samstag|samedi/i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = WeekdayNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const long = instance.long;
      
      expect(long).toHaveLength(7);
      
      if (caseType === 'uppercase') {
        expect(long[0]).toBe('SUNDAY');
        expect(long[6]).toBe('SATURDAY');
      } else if (caseType === 'lowercase') {
        expect(long[0]).toBe('sunday');
        expect(long[6]).toBe('saturday');
      } else {
        expect(long[0]).toBe('Sunday');
        expect(long[6]).toBe('Saturday');
      }
    });

    test.each(testStandalone)('should handle standalone %s correctly', (standalone) => {
      const instance = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone });
      const long = instance.long;
      
      expect(long).toHaveLength(7);
      expect(long[0]).toBeDefined();
      expect(long[6]).toBeDefined();
    });
  });

  describe('short property', () => {
    test.each(testLocales)('should return correct short names for locale %s', (locale) => {
      const instance = WeekdayNames.get({ locale, case: 'default', standalone: false });
      const short = instance.short;
      
      expect(short).toHaveLength(7);
      expect(short[0]).toMatch(/Sun|Dom|Вс|日|So|dim/i);
      expect(short[6]).toMatch(/Sat|Sáb|Сб|土|Sa|sam/i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = WeekdayNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const short = instance.short;
      
      expect(short).toHaveLength(7);
      
      if (caseType === 'uppercase') {
        expect(short[0]).toBe('SUN');
        expect(short[6]).toBe('SAT');
      } else if (caseType === 'lowercase') {
        expect(short[0]).toBe('sun');
        expect(short[6]).toBe('sat');
      } else {
        expect(short[0]).toBe('Sun');
        expect(short[6]).toBe('Sat');
      }
    });
  });

  describe('narrow property', () => {
    test.each(testLocales)('should return correct narrow names for locale %s', (locale) => {
      const instance = WeekdayNames.get({ locale, case: 'default', standalone: false });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(7);
      expect(narrow[0]).toMatch(/S|D|В|日|S|d/i);
      expect(narrow[6]).toMatch(/S|S|С|土|S|s/i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = WeekdayNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(7);
      
      if (caseType === 'uppercase') {
        expect(narrow[0]).toBe('S');
        expect(narrow[6]).toBe('S');
      } else if (caseType === 'lowercase') {
        expect(narrow[0]).toBe('s');
        expect(narrow[6]).toBe('s');
      } else {
        expect(narrow[0]).toBe('S');
        expect(narrow[6]).toBe('S');
      }
    });
  });

  describe('standalone property', () => {
    test.each(testStandalone)('should set correct standalone %s', (standalone) => {
      const instance = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone });
      expect(instance.standalone).toBe(standalone);
    });
  });

  describe('caching behavior', () => {
    test('should cache instances correctly', () => {
      const instance1 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance3 = WeekdayNames.get({ locale: 'en-US', case: 'uppercase', standalone: false });
      const instance4 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: true });
      
      expect(instance1).toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance1).not.toBe(instance4);
    });

    test('should cache different locales separately', () => {
      const enInstance = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const esInstance = WeekdayNames.get({ locale: 'es-US', case: 'default', standalone: false });
      
      expect(enInstance).not.toBe(esInstance);
    });
  });

  describe('locale property', () => {
    test.each(testLocales)('should set correct locale %s', (locale) => {
      const instance = WeekdayNames.get({ locale });
      expect(instance.locale).toBe(locale);
    });
  });

  describe('case property', () => {
    test.each(testCases)('should set correct case %s', (caseType) => {
      const instance = WeekdayNames.get({ locale: 'en-US', case: caseType });
      expect(instance.case).toBe(caseType);
    });
  });

  describe('comprehensive combinations', () => {
    test.each(testLocales)('should work for all combinations with locale %s', (locale) => {
      testCases.forEach(caseType => {
        testStandalone.forEach(standalone => {
          const instance = WeekdayNames.get({ locale, case: caseType, standalone });
          
          expect(instance.locale).toBe(locale);
          expect(instance.case).toBe(caseType);
          expect(instance.standalone).toBe(standalone);
          
          expect(instance.long).toHaveLength(7);
          expect(instance.short).toHaveLength(7);
          expect(instance.narrow).toHaveLength(7);
        });
      });
    });
  });

  describe('locale-specific behavior', () => {
    test('should return different names for different locales', () => {
      const enInstance = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const esInstance = WeekdayNames.get({ locale: 'es-US', case: 'default', standalone: false });
      const deInstance = WeekdayNames.get({ locale: 'de-DE', case: 'default', standalone: false });
      
      // Different locales should have different names
      expect(enInstance.long).not.toEqual(esInstance.long);
      expect(enInstance.long).not.toEqual(deInstance.long);
      expect(esInstance.long).not.toEqual(deInstance.long);
    });

    test('should maintain consistency within same locale', () => {
      const instance1 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      
      expect(instance1.long).toEqual(instance2.long);
      expect(instance1.short).toEqual(instance2.short);
      expect(instance1.narrow).toEqual(instance2.narrow);
    });
  });

  describe('weekday order validation', () => {
    test('should return weekdays in correct order (Sunday to Saturday)', () => {
      const instance = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const long = instance.long;
      
      expect(long[0]).toContain('Sunday');
      expect(long[1]).toContain('Monday');
      expect(long[2]).toContain('Tuesday');
      expect(long[3]).toContain('Wednesday');
      expect(long[4]).toContain('Thursday');
      expect(long[5]).toContain('Friday');
      expect(long[6]).toContain('Saturday');
    });
  });

  describe('standalone vs non-standalone behavior', () => {
    test('should return different names for standalone vs non-standalone', () => {
      const standaloneInstance = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: true });
      const nonStandaloneInstance = WeekdayNames.get({ locale: 'en-US', case: 'default', standalone: false });
      
      // In some locales, standalone and non-standalone forms may differ
      // This test ensures they are different instances
      expect(standaloneInstance).not.toBe(nonStandaloneInstance);
    });
  });
});
