import { MonthNames } from './month-names';

describe('MonthNames', () => {
  const testLocales = ['en-US', 'es-US', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR', 'en-GB'];
  const testCases = ['default', 'uppercase', 'lowercase'] as const;
  const testStandalone = [true, false];

  describe('get() method', () => {
    test('should return same instance for same parameters', () => {
      const instance1 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      expect(instance1).toBe(instance2);
    });

    test('should return different instances for different parameters', () => {
      const instance1 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = MonthNames.get({ locale: 'en-US', case: 'uppercase', standalone: false });
      const instance3 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: true });
      const instance4 = MonthNames.get({ locale: 'es-US', case: 'default', standalone: false });
      
      expect(instance1).not.toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance1).not.toBe(instance4);
    });

    test('should use default values when not provided', () => {
      const instance = MonthNames.get();
      expect(instance.locale).toBeDefined();
      expect(instance.case).toBe('default');
      expect(instance.standalone).toBe(false);
    });
  });

  describe('en-US', () => {
    test('should return correct long names', () => {
      const instance = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const long = instance.long;
      expect(long).toHaveLength(12);
      expect(long[0]).toBe('January');
      expect(long[11]).toBe('December');
    });
  });

  describe('long property', () => {
    test.each(testLocales)('should return correct long names for locale %s', (locale) => {
      const instance = MonthNames.get({ locale, case: 'default', standalone: false });
      const long = instance.long;
      
      expect(long).toHaveLength(12);
      expect(long[0]).toMatch(/January|Enero|января|1|Januar|janvier/i);
      expect(long[11]).toMatch(/December|Diciembre|декабря|12|Dezember|décembre/i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = MonthNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const long = instance.long;
      
      expect(long).toHaveLength(12);
      
      if (caseType === 'uppercase') {
        expect(long[0]).toBe('JANUARY');
        expect(long[11]).toBe('DECEMBER');
      } else if (caseType === 'lowercase') {
        expect(long[0]).toBe('january');
        expect(long[11]).toBe('december');
      } else {
        expect(long[0]).toBe('January');
        expect(long[11]).toBe('December');
      }
    });

    test.each(testStandalone)('should handle standalone %s correctly', (standalone) => {
      const instance = MonthNames.get({ locale: 'en-US', case: 'default', standalone });
      const long = instance.long;
      
      expect(long).toHaveLength(12);
      expect(long[0]).toBeDefined();
      expect(long[11]).toBeDefined();
    });
  });

  describe('short property', () => {
    test.each(testLocales)('should return correct short names for locale %s', (locale) => {
      const instance = MonthNames.get({ locale, case: 'default', standalone: false });
      const short = instance.short;
      
      expect(short).toHaveLength(12);
      expect(short[0]).toMatch(/Jan|Ene|Янв|1|Jan|jan/i);
      expect(short[11]).toMatch(/Dec|Dic|Дек|12|Dez|déc/i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = MonthNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const short = instance.short;
      
      expect(short).toHaveLength(12);
      
      if (caseType === 'uppercase') {
        expect(short[0]).toBe('JAN');
        expect(short[11]).toBe('DEC');
      } else if (caseType === 'lowercase') {
        expect(short[0]).toBe('jan');
        expect(short[11]).toBe('dec');
      } else {
        expect(short[0]).toBe('Jan');
        expect(short[11]).toBe('Dec');
      }
    });
  });

  describe('narrow property', () => {
    test.each(testLocales)('should return correct narrow names for locale %s', (locale) => {
      const instance = MonthNames.get({ locale, case: 'default', standalone: false });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(12);
      expect(narrow[0]).toMatch(/J|E|Я|1|J|j/i);
      expect(narrow[11]).toMatch(/D|D|Д|12|D|d/i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = MonthNames.get({ locale: 'en-US', case: caseType, standalone: false });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(12);
      
      if (caseType === 'uppercase') {
        expect(narrow[0]).toBe('J');
        expect(narrow[11]).toBe('D');
      } else if (caseType === 'lowercase') {
        expect(narrow[0]).toBe('j');
        expect(narrow[11]).toBe('d');
      } else {
        expect(narrow[0]).toBe('J');
        expect(narrow[11]).toBe('D');
      }
    });
  });

  describe('standalone property', () => {
    test.each(testStandalone)('should set correct standalone %s', (standalone) => {
      const instance = MonthNames.get({ locale: 'en-US', case: 'default', standalone });
      expect(instance.standalone).toBe(standalone);
    });
  });

  describe('caching behavior', () => {
    test('should cache instances correctly', () => {
      const instance1 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance3 = MonthNames.get({ locale: 'en-US', case: 'uppercase', standalone: false });
      const instance4 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: true });
      
      expect(instance1).toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance1).not.toBe(instance4);
    });

    test('should cache different locales separately', () => {
      const enInstance = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const esInstance = MonthNames.get({ locale: 'es-US', case: 'default', standalone: false });
      
      expect(enInstance).not.toBe(esInstance);
    });
  });

  describe('locale property', () => {
    test.each(testLocales)('should set correct locale %s', (locale) => {
      const instance = MonthNames.get({ locale });
      expect(instance.locale).toBe(locale);
    });
  });

  describe('case property', () => {
    test.each(testCases)('should set correct case %s', (caseType) => {
      const instance = MonthNames.get({ locale: 'en-US', case: caseType });
      expect(instance.case).toBe(caseType);
    });
  });

  describe('comprehensive combinations', () => {
    test.each(testLocales)('should work for all combinations with locale %s', (locale) => {
      testCases.forEach(caseType => {
        testStandalone.forEach(standalone => {
          const instance = MonthNames.get({ locale, case: caseType, standalone });
          
          expect(instance.locale).toBe(locale);
          expect(instance.case).toBe(caseType);
          expect(instance.standalone).toBe(standalone);
          
          expect(instance.long).toHaveLength(12);
          expect(instance.short).toHaveLength(12);
          expect(instance.narrow).toHaveLength(12);
        });
      });
    });
  });

  describe('locale-specific behavior', () => {
    test('should return different names for different locales', () => {
      const enInstance = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const esInstance = MonthNames.get({ locale: 'es-US', case: 'default', standalone: false });
      const deInstance = MonthNames.get({ locale: 'de-DE', case: 'default', standalone: false });
      
      // Different locales should have different names
      expect(enInstance.long).not.toEqual(esInstance.long);
      expect(enInstance.long).not.toEqual(deInstance.long);
      expect(esInstance.long).not.toEqual(deInstance.long);
    });

    test('should maintain consistency within same locale', () => {
      const instance1 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const instance2 = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      
      expect(instance1.long).toEqual(instance2.long);
      expect(instance1.short).toEqual(instance2.short);
      expect(instance1.narrow).toEqual(instance2.narrow);
    });
  });

  describe('month order validation', () => {
    test('should return months in correct order', () => {
      const instance = MonthNames.get({ locale: 'en-US', case: 'default', standalone: false });
      const long = instance.long;
      
      // The actual implementation returns months in chronological order
      expect(long[0]).toContain('January');
      expect(long[1]).toContain('February');
      expect(long[2]).toContain('March');
      expect(long[3]).toContain('April');
      expect(long[4]).toContain('May');
      expect(long[5]).toContain('June');
      expect(long[6]).toContain('July');
      expect(long[7]).toContain('August');
      expect(long[8]).toContain('September');
      expect(long[9]).toContain('October');
      expect(long[10]).toContain('November');
      expect(long[11]).toContain('December');
    });
  });
});
