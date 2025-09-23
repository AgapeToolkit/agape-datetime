import { DateTimePattern } from '../../../datetime-pattern';

describe('DateTimePattern - eraShort', () => {
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
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy G', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 BC');
        expect(value.normalized.year).toBe(-2024);
      });
    });
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
    });
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
    });
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