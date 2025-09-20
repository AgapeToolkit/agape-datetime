import { TimeZoneNames } from './timezone-names';

describe('TimeZoneNames', () => {
  const testLocales = ['en-US', 'es-US', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR', 'en-GB'];
  const testCases = ['default', 'uppercase', 'lowercase'] as const;

  describe('get() method', () => {
    test('should return same instance for same parameters', () => {
      const instance1 = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      expect(instance1).toBe(instance2);
    });

    test('should return different instances for different parameters', () => {
      const instance1 = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = TimeZoneNames.get({ locale: 'en-US', case: 'uppercase' });
      const instance3 = TimeZoneNames.get({ locale: 'es-US', case: 'default' });
      
      expect(instance1).not.toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance2).not.toBe(instance3);
    });

    test('should use default locale when not provided', () => {
      const instance = TimeZoneNames.get();
      expect(instance.locale).toBeDefined();
    });

    test('should use default case when not provided', () => {
      const instance = TimeZoneNames.get({ locale: 'en-US' });
      expect(instance.case).toBe('default');
    });
  });

  describe('long property', () => {
    test.each(testLocales)('should return correct long names for locale %s', (locale) => {
      const instance = TimeZoneNames.get({ locale, case: 'default' });
      const long = instance.long;
      
      expect(long).toBeInstanceOf(Array);
      expect(long.length).toBeGreaterThan(0);
      
      // Should contain common timezone names
      const hasCommonTimezones = long.some(name => 
        name.includes('UTC') || 
        name.includes('GMT') || 
        name.includes('EST') || 
        name.includes('PST') ||
        name.includes('CET') ||
        name.includes('JST')
      );
      expect(hasCommonTimezones).toBe(true);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = TimeZoneNames.get({ locale: 'en-US', case: caseType });
      const long = instance.long;
      
      expect(long).toBeInstanceOf(Array);
      expect(long.length).toBeGreaterThan(0);
      
      if (caseType === 'uppercase') {
        long.forEach(name => {
          expect(name).toBe(name.toUpperCase());
        });
      } else if (caseType === 'lowercase') {
        long.forEach(name => {
          expect(name).toBe(name.toLowerCase());
        });
      }
    });

    test('should use locale-aware case transformation', () => {
      const instance = TimeZoneNames.get({ locale: 'tr-TR', case: 'uppercase' });
      const long = instance.long;
      
      // Turkish has special case rules (İ vs I)
      long.forEach(name => {
        expect(name).toBe(name.toUpperCase());
      });
    });
  });

  describe('short property', () => {
    test.each(testLocales)('should return correct short names for locale %s', (locale) => {
      const instance = TimeZoneNames.get({ locale, case: 'default' });
      const short = instance.short;
      
      expect(short).toBeInstanceOf(Array);
      expect(short.length).toBeGreaterThan(0);
      
      // Should contain common timezone abbreviations
      const hasCommonTimezones = short.some(name => 
        name.includes('UTC') || 
        name.includes('GMT') || 
        name.includes('EST') || 
        name.includes('PST') ||
        name.includes('CET') ||
        name.includes('JST')
      );
      expect(hasCommonTimezones).toBe(true);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = TimeZoneNames.get({ locale: 'en-US', case: caseType });
      const short = instance.short;
      
      expect(short).toBeInstanceOf(Array);
      expect(short.length).toBeGreaterThan(0);
      
      if (caseType === 'uppercase') {
        short.forEach(name => {
          expect(name).toBe(name.toUpperCase());
        });
      } else if (caseType === 'lowercase') {
        short.forEach(name => {
          expect(name).toBe(name.toLowerCase());
        });
      }
    });
  });

  describe('narrow property', () => {
    test.each(testLocales)('should return correct narrow names for locale %s', (locale) => {
      const instance = TimeZoneNames.get({ locale, case: 'default' });
      const narrow = instance.narrow;
      
      expect(narrow).toBeInstanceOf(Array);
      expect(narrow.length).toBeGreaterThan(0);
      
      // Should contain common timezone abbreviations
      const hasCommonTimezones = narrow.some(name => 
        name.includes('UTC') || 
        name.includes('GMT') || 
        name.includes('EST') || 
        name.includes('PST') ||
        name.includes('CET') ||
        name.includes('JST')
      );
      expect(hasCommonTimezones).toBe(true);
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = TimeZoneNames.get({ locale: 'en-US', case: caseType });
      const narrow = instance.narrow;
      
      expect(narrow).toBeInstanceOf(Array);
      expect(narrow.length).toBeGreaterThan(0);
      
      if (caseType === 'uppercase') {
        narrow.forEach(name => {
          expect(name).toBe(name.toUpperCase());
        });
      } else if (caseType === 'lowercase') {
        narrow.forEach(name => {
          expect(name).toBe(name.toLowerCase());
        });
      }
    });
  });

  describe('caching behavior', () => {
    test('should cache instances correctly', () => {
      const instance1 = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const instance3 = TimeZoneNames.get({ locale: 'en-US', case: 'uppercase' });
      
      expect(instance1).toBe(instance2);
      expect(instance1).not.toBe(instance3);
    });

    test('should cache different locales separately', () => {
      const enInstance = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const esInstance = TimeZoneNames.get({ locale: 'es-US', case: 'default' });
      
      expect(enInstance).not.toBe(esInstance);
    });
  });

  describe('locale property', () => {
    test.each(testLocales)('should set correct locale %s', (locale) => {
      const instance = TimeZoneNames.get({ locale });
      expect(instance.locale).toBe(locale);
    });
  });

  describe('case property', () => {
    test.each(testCases)('should set correct case %s', (caseType) => {
      const instance = TimeZoneNames.get({ locale: 'en-US', case: caseType });
      expect(instance.case).toBe(caseType);
    });
  });

  describe('comprehensive combinations', () => {
    test.each(testLocales)('should work for all combinations with locale %s', (locale) => {
      testCases.forEach(caseType => {
        const instance = TimeZoneNames.get({ locale, case: caseType });
        
        expect(instance.locale).toBe(locale);
        expect(instance.case).toBe(caseType);
        
        expect(instance.long).toBeInstanceOf(Array);
        expect(instance.short).toBeInstanceOf(Array);
        expect(instance.narrow).toBeInstanceOf(Array);
        
        expect(instance.long.length).toBeGreaterThan(0);
        expect(instance.short.length).toBeGreaterThan(0);
        expect(instance.narrow.length).toBeGreaterThan(0);
      });
    });
  });

  describe('locale-specific behavior', () => {
    test('should return different names for different locales', () => {
      const enInstance = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const esInstance = TimeZoneNames.get({ locale: 'es-US', case: 'default' });
      const deInstance = TimeZoneNames.get({ locale: 'de-DE', case: 'default' });
      
      // Different locales should have different names
      expect(enInstance.long).not.toEqual(esInstance.long);
      expect(enInstance.long).not.toEqual(deInstance.long);
      expect(esInstance.long).not.toEqual(deInstance.long);
    });

    test('should maintain consistency within same locale', () => {
      const instance1 = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      
      expect(instance1.long).toEqual(instance2.long);
      expect(instance1.short).toEqual(instance2.short);
      expect(instance1.narrow).toEqual(instance2.narrow);
    });
  });

  describe('timezone name validation', () => {
    test('should contain valid timezone names', () => {
      const instance = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const long = instance.long;
      const short = instance.short;
      const narrow = instance.narrow;
      
      // All arrays should contain valid timezone names
      [long, short, narrow].forEach(names => {
        names.forEach(name => {
          expect(typeof name).toBe('string');
          expect(name.length).toBeGreaterThan(0);
        });
      });
    });

    test('should have reasonable array lengths', () => {
      const instance = TimeZoneNames.get({ locale: 'en-US', case: 'default' });
      const long = instance.long;
      const short = instance.short;
      const narrow = instance.narrow;
      
      // All arrays should have reasonable lengths (not necessarily the same)
      expect(long.length).toBeGreaterThan(0);
      expect(short.length).toBeGreaterThan(0);
      expect(narrow.length).toBeGreaterThan(0);
    });
  });
});