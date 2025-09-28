import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - eraNarrow', () => {
  describe('en-US', () => {
    describe('default case', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US' });
        const value = pattern.parse('A');
        expect(value.getEra()).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US' });
        const value = pattern.parse('B');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US' });
        expect(() => pattern.parse('a')).toThrow();
      });
      it('should fail lowercase b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US' });
        expect(() => pattern.parse('b')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 A');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 B');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.getEra()).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('B');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'uppercase' });
        expect(() => pattern.parse('a')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('a');
        expect(value.getEra()).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('b');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'lowercase' });
        expect(() => pattern.parse('A')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('a');
        expect(value.getEra()).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('b');
        expect(value.getEra()).toBe(0);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.getEra()).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('B');
        expect(value.getEra()).toBe(0);
      });
    });
  });

  describe('es-US', () => {
    describe('default case', () => {
      it('should parse d.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        const value = pattern.parse('d.C.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse a.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        const value = pattern.parse('a.C.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase D.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        expect(() => pattern.parse('D.C.')).toThrow();
      });
      it('should fail uppercase A.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        expect(() => pattern.parse('A.C.')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 d.C.');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 a.C.');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse D.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('D.C.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse A.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('A.C.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase d.c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'uppercase' });
        expect(() => pattern.parse('d.c.')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse d.c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('d.c.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse a.c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('a.c.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase D.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'lowercase' });
        expect(() => pattern.parse('D.C.')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse d.c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('d.c.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse a.c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('a.c.');
        expect(value.getEra()).toBe(0);
      });
      it('should parse D.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('D.C.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse A.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('A.C.');
        expect(value.getEra()).toBe(0);
      });
    });
  });

  describe('en-UK', () => {
    describe('default case', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK' });
        const value = pattern.parse('A');
        expect(value.getEra()).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK' });
        const value = pattern.parse('B');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK' });
        expect(() => pattern.parse('a')).toThrow();
      });
      it('should fail lowercase b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK' });
        expect(() => pattern.parse('b')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'en-UK' });
        const value = pattern.parse('01/01/2025 A');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'en-UK' });
        const value = pattern.parse('01/01/2025 B');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.getEra()).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'uppercase' });
        const value = pattern.parse('B');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'uppercase' });
        expect(() => pattern.parse('a')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'lowercase' });
        const value = pattern.parse('a');
        expect(value.getEra()).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'lowercase' });
        const value = pattern.parse('b');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'lowercase' });
        expect(() => pattern.parse('A')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('a');
        expect(value.getEra()).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('b');
        expect(value.getEra()).toBe(0);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.getEra()).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('B');
        expect(value.getEra()).toBe(0);
      });
    });
  });

  describe('ru-RU', () => {
    describe('default case', () => {
      it('should parse н.э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('н.э.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse до н.э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('до н.э.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase Н.Э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('Н.Э.')).toThrow();
      });
      it('should fail uppercase ДО Н.Э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('ДО Н.Э.')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('01/01/2025 н.э.');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('01/01/2025 до н.э.');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse Н.Э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'uppercase' });
        const value = pattern.parse('Н.Э.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse ДО Н.Э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'uppercase' });
        const value = pattern.parse('ДО Н.Э.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase н.э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'uppercase' });
        expect(() => pattern.parse('н.э.')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse н.э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'lowercase' });
        const value = pattern.parse('н.э.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse до н.э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'lowercase' });
        const value = pattern.parse('до н.э.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase Н.Э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'lowercase' });
        expect(() => pattern.parse('Н.Э.')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse н.э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('н.э.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse до н.э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('до н.э.');
        expect(value.getEra()).toBe(0);
      });
      it('should parse Н.Э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('Н.Э.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse ДО Н.Э.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('ДО Н.Э.');
        expect(value.getEra()).toBe(0);
      });
    });
  });

  describe('ja-JP', () => {
    describe('default case', () => {
      it('should parse AD', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        const value = pattern.parse('AD');
        expect(value.getEra()).toBe(1);
      });
      it('should parse BC', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        const value = pattern.parse('BC');
        expect(value.getEra()).toBe(0);
      });
      it('should fail 西', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('西')).toThrow();
      });
      it('should fail 紀', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('紀')).toThrow();
      });
      it('should fail d.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('d.C.')).toThrow();
      });
      it('should fail a.C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('a.C.')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'ja-JP' });
        const value = pattern.parse('01/01/2025 AD');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'ja-JP' });
        const value = pattern.parse('01/01/2025 BC');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse AD', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'uppercase' });
        const value = pattern.parse('AD');
        expect(value.getEra()).toBe(1);
      });
      it('should parse BC', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'uppercase' });
        const value = pattern.parse('BC');
        expect(value.getEra()).toBe(0);
      });
    });
    describe('lowercase', () => {
      it('should parse ad', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'lowercase' });
        const value = pattern.parse('ad');
        expect(value.getEra()).toBe(1);
      });
      it('should parse bc', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'lowercase' });
        const value = pattern.parse('bc');
        expect(value.getEra()).toBe(0);
      });
    });
    describe('case insensitive', () => {
      it('should parse ad', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('ad');
        expect(value.getEra()).toBe(1);
      });
      it('should parse bc', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('bc');
        expect(value.getEra()).toBe(0);
      });
      it('should parse AD', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('AD');
        expect(value.getEra()).toBe(1);
      });
    });
  });

  describe('de-DE', () => {
    describe('default case', () => {
      it('should parse n. Chr.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('n. Chr.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse v. Chr.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('v. Chr.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase N. CHR.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('N. CHR.')).toThrow();
      });
      it('should fail uppercase V. CHR.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('V. CHR.')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('01/01/2025 n. Chr.');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('01/01/2025 v. Chr.');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse N. CHR.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'uppercase' });
        const value = pattern.parse('N. CHR.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse V. CHR.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'uppercase' });
        const value = pattern.parse('V. CHR.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase n. chr.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'uppercase' });
        expect(() => pattern.parse('n. chr.')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse n. chr.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'lowercase' });
        const value = pattern.parse('n. chr.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse v. chr.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'lowercase' });
        const value = pattern.parse('v. chr.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase N. CHR.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'lowercase' });
        expect(() => pattern.parse('N. CHR.')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse n. chr.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('n. chr.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse v. chr.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('v. chr.');
        expect(value.getEra()).toBe(0);
      });
      it('should parse N. CHR.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('N. CHR.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse V. CHR.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('V. CHR.');
        expect(value.getEra()).toBe(0);
      });
    });
  });

  describe('fr-FR', () => {
    describe('default case', () => {
      it('should parse ap. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('ap. J.-C.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse av. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('av. J.-C.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase AP. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR' });
        expect(() => pattern.parse('AP. J.-C.')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('01/01/2025 ap. J.-C.');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('01/01/2025 av. J.-C.');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse AP. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'uppercase' });
        const value = pattern.parse('AP. J.-C.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse AV. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'uppercase' });
        const value = pattern.parse('AV. J.-C.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail lowercase ap. j.-c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'uppercase' });
        expect(() => pattern.parse('ap. j.-c.')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse ap. j.-c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'lowercase' });
        const value = pattern.parse('ap. j.-c.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse av. j.-c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'lowercase' });
        const value = pattern.parse('av. j.-c.');
        expect(value.getEra()).toBe(0);
      });
      it('should fail uppercase AP. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'lowercase' });
        expect(() => pattern.parse('AP. J.-C.')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse ap. j.-c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('ap. j.-c.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse av. j.-c.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('av. j.-c.');
        expect(value.getEra()).toBe(0);
      });
      it('should parse AP. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('AP. J.-C.');
        expect(value.getEra()).toBe(1);
      });
      it('should parse AV. J.-C.', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('AV. J.-C.');
        expect(value.getEra()).toBe(0);
      });
    });
  });
});
