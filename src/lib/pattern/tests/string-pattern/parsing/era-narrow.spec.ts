import { DateTimePattern } from '../../../datetime-pattern';

describe('DateTimePattern - eraNarrow', () => {
  describe('en-US', () => {
    describe('default case', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
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
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 B');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
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
        expect(value.resolved.era).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
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
        expect(value.resolved.era).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

  describe('es-US', () => {
    describe('default case', () => {
      it('should parse d', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        const value = pattern.parse('d');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase D', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        expect(() => pattern.parse('D')).toThrow();
      });
      it('should fail uppercase A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US' });
        expect(() => pattern.parse('A')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 d');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 a');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse D', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('D');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase d', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'uppercase' });
        expect(() => pattern.parse('d')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse d', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('d');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase D', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'lowercase' });
        expect(() => pattern.parse('D')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse d', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('d');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse D', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('D');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

  describe('en-UK', () => {
    describe('default case', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
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
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'en-UK' });
        const value = pattern.parse('01/01/2025 B');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'uppercase' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
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
        expect(value.resolved.era).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'lowercase' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
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
        expect(value.resolved.era).toBe(1);
      });
      it('should parse b', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'en-UK', case: 'insensitive' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

  describe('ru-RU', () => {
    describe('default case', () => {
      it('should parse н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('н');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse д', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('д');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase Н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('Н')).toThrow();
      });
      it('should fail uppercase Д', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU' });
        expect(() => pattern.parse('Д')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('01/01/2025 н');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'ru-RU' });
        const value = pattern.parse('01/01/2025 д');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse Н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'uppercase' });
        const value = pattern.parse('Н');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse Д', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'uppercase' });
        const value = pattern.parse('Д');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'uppercase' });
        expect(() => pattern.parse('н')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'lowercase' });
        const value = pattern.parse('н');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse д', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'lowercase' });
        const value = pattern.parse('д');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase Н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'lowercase' });
        expect(() => pattern.parse('Н')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('н');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse д', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('д');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse Н', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('Н');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse Д', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ru-RU', case: 'insensitive' });
        const value = pattern.parse('Д');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

  describe('ja-JP', () => {
    describe('default case', () => {
      it('should parse 西', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        const value = pattern.parse('西');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse 紀', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        const value = pattern.parse('紀');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail AD', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('AD')).toThrow();
      });
      it('should fail BC', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP' });
        expect(() => pattern.parse('BC')).toThrow();
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
        const value = pattern.parse('01/01/2025 西');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'ja-JP' });
        const value = pattern.parse('01/01/2025 紀');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse 西', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'uppercase' });
        const value = pattern.parse('西');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse 紀', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'uppercase' });
        const value = pattern.parse('紀');
        expect(value.resolved.era).toBe(0);
      });
    });
    describe('lowercase', () => {
      it('should parse 西', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'lowercase' });
        const value = pattern.parse('西');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse 紀', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'lowercase' });
        const value = pattern.parse('紀');
        expect(value.resolved.era).toBe(0);
      });
    });
    describe('case insensitive', () => {
      it('should parse 西', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('西');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse 紀', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('紀');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse 西', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'ja-JP', case: 'insensitive' });
        const value = pattern.parse('西');
        expect(value.resolved.era).toBe(1);
      });
    });
  });

  describe('de-DE', () => {
    describe('default case', () => {
      it('should parse n', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('n');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse v', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('v');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase N', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('N')).toThrow();
      });
      it('should fail uppercase V', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE' });
        expect(() => pattern.parse('V')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('01/01/2025 n');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'de-DE' });
        const value = pattern.parse('01/01/2025 v');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse N', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'uppercase' });
        const value = pattern.parse('N');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse V', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'uppercase' });
        const value = pattern.parse('V');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase n', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'uppercase' });
        expect(() => pattern.parse('n')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse n', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'lowercase' });
        const value = pattern.parse('n');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse v', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'lowercase' });
        const value = pattern.parse('v');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase N', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'lowercase' });
        expect(() => pattern.parse('N')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse n', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('n');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse v', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('v');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse N', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('N');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse V', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'de-DE', case: 'insensitive' });
        const value = pattern.parse('V');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

  describe('fr-FR', () => {
    describe('default case', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR' });
        expect(() => pattern.parse('A')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('01/01/2025 a');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy GGGGG', { locale: 'fr-FR' });
        const value = pattern.parse('01/01/2025 a');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'uppercase' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail lowercase a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'uppercase' });
        expect(() => pattern.parse('a')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'lowercase' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'lowercase' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(0);
      });
      it('should fail uppercase A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'lowercase' });
        expect(() => pattern.parse('A')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse a', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('a');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse A', () => {
        const pattern = new DateTimePattern('GGGGG', { locale: 'fr-FR', case: 'insensitive' });
        const value = pattern.parse('A');
        expect(value.resolved.era).toBe(0);
      });
    });
  });
});