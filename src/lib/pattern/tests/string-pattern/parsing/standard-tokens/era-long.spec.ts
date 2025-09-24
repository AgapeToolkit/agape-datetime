import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - eraLong', () => {
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
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 Before Christ');
        expect(value.normalized.year).toBe(-2024);
      });
    });
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
    });
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
    });
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
    });
  });

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
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 antes de Cristo');
        expect(value.normalized.year).toBe(-2024);
      });
    });
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
      it('should fail lowercase después de cristo', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'es-US', case: 'uppercase' });
        expect(() => pattern.parse('después de cristo')).toThrow();
      });
    });
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
    });
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
    });
  });

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
      it('should fail uppercase ANNO DOMINI', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
        expect(() => pattern.parse('ANNO DOMINI')).toThrow();
      });
      it('should fail uppercase BEFORE CHRIST', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'en-UK' });
        expect(() => pattern.parse('BEFORE CHRIST')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'en-UK' });
        const value = pattern.parse('01/01/2025 Anno Domini');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'en-UK' });
        const value = pattern.parse('01/01/2025 Before Christ');
        expect(value.normalized.year).toBe(-2024);
      });
    });
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
    });
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
    });
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
    });
  });

  describe('ru-RU', () => {
    describe('default case', () => {
      it('should parse нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
        const value = pattern.parse('нашей эры');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse до нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
        const value = pattern.parse('до нашей эры');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('нашей эры')).toThrow();
      });
      it('should fail lowercase до нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('до нашей эры')).toThrow();
      });
      it('should fail uppercase НАШЕЙ ЭРЫ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('НАШЕЙ ЭРЫ')).toThrow();
      });
      it('should fail uppercase ДО НАШЕЙ ЭРЫ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('ДО НАШЕЙ ЭРЫ')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ru-RU' });
        const value = pattern.parse('01/01/2025 нашей эры');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ru-RU' });
        const value = pattern.parse('01/01/2025 до нашей эры');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse НАШЕЙ ЭРЫ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'uppercase' });
        const value = pattern.parse('НАШЕЙ ЭРЫ');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse ДО НАШЕЙ ЭРЫ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'uppercase' });
        const value = pattern.parse('ДО НАШЕЙ ЭРЫ');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'uppercase' });
        expect(() => pattern.parse('нашей эры')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'lowercase' });
        const value = pattern.parse('нашей эры');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse до нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'lowercase' });
        const value = pattern.parse('до нашей эры');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase НАШЕЙ ЭРЫ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'lowercase' });
        expect(() => pattern.parse('НАШЕЙ ЭРЫ')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('нашей эры');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse до нашей эры', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('до нашей эры');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse НАШЕЙ ЭРЫ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('НАШЕЙ ЭРЫ');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse ДО НАШЕЙ ЭРЫ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('ДО НАШЕЙ ЭРЫ');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

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
      it('should fail AD', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('AD')).toThrow();
      });
      it('should fail BC', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('BC')).toThrow();
      });
      it('should fail d.C.', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('d.C.')).toThrow();
      });
      it('should fail a.C.', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('a.C.')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ja-JP' });
        const value = pattern.parse('01/01/2025 西暦');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'ja-JP' });
        const value = pattern.parse('01/01/2025 紀元前');
        expect(value.normalized.year).toBe(-2024);
      });
    });
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
    });
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
    });
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
    });
  });

  describe('de-DE', () => {
    describe('default case', () => {
      it('should parse nach Christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
        const value = pattern.parse('nach Christus');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse vor Christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
        const value = pattern.parse('vor Christus');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase nach christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('nach christus')).toThrow();
      });
      it('should fail lowercase vor christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('vor christus')).toThrow();
      });
      it('should fail uppercase NACH CHRISTUS', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('NACH CHRISTUS')).toThrow();
      });
      it('should fail uppercase VOR CHRISTUS', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('VOR CHRISTUS')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'de-DE' });
        const value = pattern.parse('01/01/2025 nach Christus');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'de-DE' });
        const value = pattern.parse('01/01/2025 vor Christus');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse NACH CHRISTUS', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'uppercase' });
        const value = pattern.parse('NACH CHRISTUS');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse VOR CHRISTUS', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'uppercase' });
        const value = pattern.parse('VOR CHRISTUS');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase nach christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'uppercase' });
        expect(() => pattern.parse('nach christus')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse nach christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'lowercase' });
        const value = pattern.parse('nach christus');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse vor christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'lowercase' });
        const value = pattern.parse('vor christus');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase NACH CHRISTUS', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'lowercase' });
        expect(() => pattern.parse('NACH CHRISTUS')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse nach christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('nach christus');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse vor christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('vor christus');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse NACH CHRISTUS', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('NACH CHRISTUS');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse VOR CHRISTUS', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('VOR CHRISTUS');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse nach Christus', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('nach Christus');
        expect(value.resolved.era).toBe(1);
      });
    });
  });

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
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGG', { locale: 'fr-FR' });
        const value = pattern.parse('01/01/2025 avant Jésus-Christ');
        expect(value.normalized.year).toBe(-2024);
      });
    });
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
      it('should fail lowercase après jésus-christ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'uppercase' });
        expect(() => pattern.parse('après jésus-christ')).toThrow();
      });
    });
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
    });
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
      it('should parse après Jésus-Christ', () => {
        const pattern = new DateTimePattern('GGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('après Jésus-Christ');
        expect(value.resolved.era).toBe(1);
      });
    });
  });
});
