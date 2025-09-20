import { CommonEraNames } from './common-era-names';

describe('CommonEraNames', () => {
  const testLocales = ['en-US', 'es-US', 'ru-RU', 'ja-JP', 'de-DE', 'fr-FR', 'en-GB'];
  const testCases = ['default', 'uppercase', 'lowercase'] as const;

  describe('get() method', () => {
    test('should return same instance for same parameters', () => {
      const instance1 = CommonEraNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = CommonEraNames.get({ locale: 'en-US', case: 'default' });
      expect(instance1).toBe(instance2);
    });

    test('should return different instances for different parameters', () => {
      const instance1 = CommonEraNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = CommonEraNames.get({ locale: 'en-US', case: 'uppercase' });
      const instance3 = CommonEraNames.get({ locale: 'es-US', case: 'default' });
      
      expect(instance1).not.toBe(instance2);
      expect(instance1).not.toBe(instance3);
      expect(instance2).not.toBe(instance3);
    });

    test('should use default locale when not provided', () => {
      const instance = CommonEraNames.get();
      expect(instance.locale).toBeDefined();
    });

    test('should use default case when not provided', () => {
      const instance = CommonEraNames.get({ locale: 'en-US' });
      expect(instance.case).toBe('default');
    });
  });

  describe('long property', () => {
    test.each(testLocales)('should return correct long names for locale %s', (locale) => {
      const instance = CommonEraNames.get({ locale, case: 'default' });
      const long = instance.long;
      
      expect(long).toHaveLength(2);
      expect(long[0]).toContain('Before');
      expect(long[1]).toContain('Common');
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = CommonEraNames.get({ locale: 'en-US', case: caseType });
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
      const instance = CommonEraNames.get({ locale: 'tr-TR', case: 'uppercase' });
      const long = instance.long;
      
      // Turkish has special case rules (İ vs I)
      expect(long[0]).toContain('BEFORE');
      expect(long[1]).toContain('COMMON');
    });
  });

  describe('short property', () => {
    test.each(testLocales)('should return correct short names for locale %s', (locale) => {
      const instance = CommonEraNames.get({ locale, case: 'default' });
      const short = instance.short;
      
      expect(short).toHaveLength(2);
      expect(short[0]).toBe('BCE');
      expect(short[1]).toBe('CE');
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = CommonEraNames.get({ locale: 'en-US', case: caseType });
      const short = instance.short;
      
      expect(short).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(short[0]).toBe('BCE');
        expect(short[1]).toBe('CE');
      } else if (caseType === 'lowercase') {
        expect(short[0]).toBe('bce');
        expect(short[1]).toBe('ce');
      } else {
        expect(short[0]).toBe('BCE');
        expect(short[1]).toBe('CE');
      }
    });
  });

  describe('narrow property', () => {
    test.each(testLocales)('should return correct narrow names for locale %s', (locale) => {
      const instance = CommonEraNames.get({ locale, case: 'default' });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(2);
      expect(narrow[0]).toBe('B');
      expect(narrow[1]).toBe('C');
    });

    test.each(testCases)('should handle case %s correctly', (caseType) => {
      const instance = CommonEraNames.get({ locale: 'en-US', case: caseType });
      const narrow = instance.narrow;
      
      expect(narrow).toHaveLength(2);
      
      if (caseType === 'uppercase') {
        expect(narrow[0]).toBe('B');
        expect(narrow[1]).toBe('C');
      } else if (caseType === 'lowercase') {
        expect(narrow[0]).toBe('b');
        expect(narrow[1]).toBe('c');
      } else {
        expect(narrow[0]).toBe('B');
        expect(narrow[1]).toBe('C');
      }
    });
  });

  describe('caching behavior', () => {
    test('should cache instances correctly', () => {
      const instance1 = CommonEraNames.get({ locale: 'en-US', case: 'default' });
      const instance2 = CommonEraNames.get({ locale: 'en-US', case: 'default' });
      const instance3 = CommonEraNames.get({ locale: 'en-US', case: 'uppercase' });
      
      expect(instance1).toBe(instance2);
      expect(instance1).not.toBe(instance3);
    });

    test('should cache different locales separately', () => {
      const enInstance = CommonEraNames.get({ locale: 'en-US', case: 'default' });
      const esInstance = CommonEraNames.get({ locale: 'es-US', case: 'default' });
      
      expect(enInstance).not.toBe(esInstance);
    });
  });

  describe('locale property', () => {
    test.each(testLocales)('should set correct locale %s', (locale) => {
      const instance = CommonEraNames.get({ locale });
      expect(instance.locale).toBe(locale);
    });
  });

  describe('case property', () => {
    test.each(testCases)('should set correct case %s', (caseType) => {
      const instance = CommonEraNames.get({ locale: 'en-US', case: caseType });
      expect(instance.case).toBe(caseType);
    });
  });
});
