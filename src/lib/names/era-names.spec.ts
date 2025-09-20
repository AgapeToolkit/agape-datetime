import { EraNames } from './era-names';

describe('EraNames', () => {
  const testLocales = ['en-US', 'es-US', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR', 'en-GB'];
  const testCases = ['default', 'uppercase', 'lowercase'] as const;

  describe('get() method', () => {
    test('should return same instance for same parameters', () => {
      const instance1 = EraNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = EraNames.get({ locale: 'en-US', case: 'default' });
      expect(instance1).toBe(instance2);
    });

    test('should return different instances for different parameters', () => {
      const instance1 = EraNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = EraNames.get({ locale: 'en-US', case: 'uppercase' });
      const instance3 = EraNames.get({ locale: 'es-US', case: 'default' });
      
      expect(instance1).not.toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance2).not.toBe(instance3);
    });

    test('should use default locale when not provided', () => {
      const instance = EraNames.get();
      expect(instance.locale).toBeDefined();
    });

    test('should use default case when not provided', () => {
      const instance = EraNames.get({ locale: 'en-US' });
      expect(instance.case).toBe('default');
    });
  });

  describe('long property', () => {
    test.each(testLocales)('should return correct long names for locale %s', (locale) => {
      const instance = EraNames.get({ locale, case: 'default' });
      const long = instance.long;
      
      expect(long).toHaveLength(2);
      expect(long[0]).toMatch(/Before Christ|BC|before|antes de Cristo|до Рождества Христова|紀元前|v\. Chr\.|avant Jésus-Christ/i);
      expect(long[1]).toMatch(/Anno Domini|AD|after|después de Cristo|от Рождества Христова|н\. э\.|西暦|n\. Chr\.|après Jésus-Christ/i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = EraNames.get({ locale: 'en-US', case: caseType });
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

    test('should use locale-aware case transformation', () => {
      const instance = EraNames.get({ locale: 'tr-TR', case: 'uppercase' });
      const long = instance.long;
      
      // Turkish has special case rules (İ vs I)
      expect(long[0]).toBe(long[0].toUpperCase());
      expect(long[1]).toBe(long[1].toUpperCase());
    });
  });

  describe('short property', () => {
    test.each(testLocales)('should return correct short names for locale %s', (locale) => {
      const instance = EraNames.get({ locale, case: 'default' });
      const short = instance.short;
      
      expect(short).toHaveLength(2);
      expect(short[0]).toMatch(/BC|B\.C\.|a\.C\.|до н\. э\.|紀元前|v\. Chr\.|av\. J\.-C\./i);
      expect(short[1]).toMatch(/AD|A\.D\.|d\.C\.|н\. э\.|西暦|n\. Chr\.|ap\. J\.-C\./i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = EraNames.get({ locale: 'en-US', case: caseType });
      const short = instance.short;
      
      expect(short).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(short[0]).toBe(short[0].toUpperCase());
        expect(short[1]).toBe(short[1].toUpperCase());
      } else if (caseType === 'lowercase') {
        expect(short[0]).toBe(short[0].toLowerCase());
        expect(short[1]).toBe(short[1].toLowerCase());
      }
    });
  });

  describe('narrow property', () => {
    test.each(testLocales)('should return correct narrow names for locale %s', (locale) => {
      const instance = EraNames.get({ locale, case: 'default' });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(2);
      expect(narrow[0]).toMatch(/B|b|a\.C\.|до н\.э\.|紀元前|v\. Chr\.|av\. J\.-C\./i);
      expect(narrow[1]).toMatch(/A|a|d\.C\.|н\.э\.|西暦|n\. Chr\.|ap\. J\.-C\./i);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = EraNames.get({ locale: 'en-US', case: caseType });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(narrow[0]).toBe('B');
        expect(narrow[1]).toBe('A');
      } else if (caseType === 'lowercase') {
        expect(narrow[0]).toBe('b');
        expect(narrow[1]).toBe('a');
      } else {
        expect(narrow[0]).toBe('B');
        expect(narrow[1]).toBe('A');
      }
    });
  });

  describe('caching behavior', () => {
    test('should cache instances correctly', () => {
      const instance1 = EraNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = EraNames.get({ locale: 'en-US', case: 'default' });
      const instance3 = EraNames.get({ locale: 'en-US', case: 'uppercase' });
      
      expect(instance1).toBe(instance2);
      expect(instance1).not.toBe(instance3);
    });

    test('should cache different locales separately', () => {
      const enInstance = EraNames.get({ locale: 'en-US', case: 'default' });
      const esInstance = EraNames.get({ locale: 'es-US', case: 'default' });
      
      expect(enInstance).not.toBe(esInstance);
    });
  });

  describe('locale property', () => {
    test.each(testLocales)('should set correct locale %s', (locale) => {
      const instance = EraNames.get({ locale });
      expect(instance.locale).toBe(locale);
    });
  });

  describe('case property', () => {
    test.each(testCases)('should set correct case %s', (caseType) => {
      const instance = EraNames.get({ locale: 'en-US', case: caseType });
      expect(instance.case).toBe(caseType);
    });
  });

  describe('comprehensive combinations', () => {
    test.each(testLocales)('should work for all combinations with locale %s', (locale) => {
      testCases.forEach(caseType => {
        const instance = EraNames.get({ locale, case: caseType });
        
        expect(instance.locale).toBe(locale);
        expect(instance.case).toBe(caseType);
        
        expect(instance.long).toHaveLength(2);
        expect(instance.short).toHaveLength(2);
        expect(instance.narrow).toHaveLength(2);
      });
    });
  });

  describe('locale-specific behavior', () => {
    test('should return different names for different locales', () => {
      const enInstance = EraNames.get({ locale: 'en-US', case: 'default' });
      const esInstance = EraNames.get({ locale: 'es-US', case: 'default' });
      const deInstance = EraNames.get({ locale: 'de-DE', case: 'default' });
      
      // Different locales should have different names
      expect(enInstance.long).not.toEqual(esInstance.long);
      expect(enInstance.long).not.toEqual(deInstance.long);
      expect(esInstance.long).not.toEqual(deInstance.long);
    });

    test('should maintain consistency within same locale', () => {
      const instance1 = EraNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = EraNames.get({ locale: 'en-US', case: 'default' });
      
      expect(instance1.long).toEqual(instance2.long);
      expect(instance1.short).toEqual(instance2.short);
      expect(instance1.narrow).toEqual(instance2.narrow);
    });
  });
});