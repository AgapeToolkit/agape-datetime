import { getLocale } from '@agape/locale';
import { EraNames } from './era-names';

describe('EraNames', () => {
  it('should instantiate', () => {
    expect(new EraNames({ locale: getLocale() })).toBeInstanceOf(EraNames);
  })
  describe('en-US', () => {
    const locale = 'en-US';
    const eraNames = new EraNames({ locale });

    it('should create the short names', () => {
      const eras = eraNames.short;
      expect(eras[0]).toEqual('BC');
      expect(eras[1]).toEqual('AD');
    })
    it('should create the long names', () => {
      const eras = eraNames.long;
      expect(eras[0]).toEqual('Before Christ');
      expect(eras[1]).toEqual('Anno Domini');
    })
    it('should create the narrow names', () => {
      const eras = eraNames.narrow;
      expect(eras[0]).toEqual('B');
      expect(eras[1]).toEqual('A');
    })
  })
  describe('ja-JP', () => {
    const locale = 'ja-JP';
    const eraNames = new EraNames({ locale });

    it('should create the short names', () => {
      const eras = eraNames.short;
      expect(eras[0]).toEqual('紀元前');
      expect(eras[1]).toEqual('西暦');
    })
    it('should create the long names', () => {
      const eras = eraNames.long;
      expect(eras[0]).toEqual('紀元前');
      expect(eras[1]).toEqual('西暦');
    })
    it('should create the narrow names', () => {
      const eras = eraNames.narrow;
      expect(eras[0]).toEqual('BC');
      expect(eras[1]).toEqual('AD');
    })
  })
  describe('ru-RU', () => {
    const locale = 'ru-RU';
    const eraNames = new EraNames({ locale });

    it('should create the short names', () => {
      const eras = eraNames.short;
      expect(eras[0]).toEqual('до н. э.');
      expect(eras[1]).toEqual('н. э.');
    })
    it('should create the long names', () => {
      const eras = eraNames.long;
      expect(eras[0]).toEqual('до Рождества Христова');
      expect(eras[1]).toEqual('от Рождества Христова');
    })
    it('should create the narrow names', () => {
      const eras = eraNames.narrow;
      expect(eras[0]).toEqual('до н.э.');
      expect(eras[1]).toEqual('н.э.');
    })
  })
  describe('de-DE', () => {
    const locale = 'de-DE';
    const eraNames = new EraNames({ locale });

    it('should create the short names', () => {
      const eras = eraNames.short;
      expect(eras[0]).toEqual('v. Chr.');
      expect(eras[1]).toEqual('n. Chr.');
    })
    it('should create the long names', () => {
      const eras = eraNames.long;
      expect(eras[0]).toEqual('v. Chr.');
      expect(eras[1]).toEqual('n. Chr.');
    })
    it('should create the narrow names', () => {
      const eras = eraNames.narrow;
      expect(eras[0]).toEqual('v. Chr.');
      expect(eras[1]).toEqual('n. Chr.');
    })
  })
  describe('es-US', () => {
    const locale = 'es-US';
    const eraNames = new EraNames({ locale });

    it('should create the short names', () => {
      const eras = eraNames.short;
      expect(eras[0]).toEqual('a.C.');
      expect(eras[1]).toEqual('d.C.');
    })
    it('should create the long names', () => {
      const eras = eraNames.long;
      expect(eras[0]).toEqual('antes de Cristo');
      expect(eras[1]).toEqual('después de Cristo');
    })
    it('should create the narrow names', () => {
      const eras = eraNames.narrow;
      expect(eras[0]).toEqual('a.C.');
      expect(eras[1]).toEqual('d.C.');
    })
  })
})