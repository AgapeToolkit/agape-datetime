import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayLocalPadded', () => {
  describe('en-US (Sunday-starting locale)', () => {
    it('should parse local weekday 01 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-US' });
      const value = pattern.parse('01');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should parse local weekday 02 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-US' });
      const value = pattern.parse('02');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 07 (Saturday) and normalize to ISO weekday 6', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-US' });
      const value = pattern.parse('07');
      expect(value.normalized.weekday).toBe(6); // ISO: Saturday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-US' });
      expect(() => pattern.parse('08')).toThrow();
    });
    it('should be invalid if not padded', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-US', flexible: false });
      expect(() => pattern.parse('1')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ee MMM D YYYY', { locale: 'en-US' });
      const value = pattern.parse('04 Jan 1 2025'); // Wednesday
      expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('en-GB (Monday-starting locale)', () => {
    it('should parse local weekday 01 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-GB' });
      const value = pattern.parse('01');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 07 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-GB' });
      const value = pattern.parse('07');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should parse local weekday 03 (Wednesday) and normalize to ISO weekday 3', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-GB' });
      const value = pattern.parse('03');
      expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-GB' });
      expect(() => pattern.parse('08')).toThrow();
    });
    it('should be invalid if not padded', () => {
      const pattern = new DateTimePattern('ee', { locale: 'en-GB', flexible: false });
      expect(() => pattern.parse('1')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('ee MMM D YYYY', { locale: 'en-GB' });
      const value = pattern.parse('03 Jan 1 2025'); // Wednesday
      expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
      expect(value.normalized.month).toBe(1);
      expect(value.normalized.day).toBe(1);
      expect(value.normalized.year).toBe(2025);
    });
  });

  describe('de-DE (Monday-starting locale)', () => {
    it('should parse local weekday 01 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('ee', { locale: 'de-DE' });
      const value = pattern.parse('01');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 07 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('ee', { locale: 'de-DE' });
      const value = pattern.parse('07');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('ee', { locale: 'de-DE' });
      expect(() => pattern.parse('08')).toThrow();
    });
    it('should be invalid if not padded', () => {
      const pattern = new DateTimePattern('ee', { locale: 'de-DE', flexible: false });
      expect(() => pattern.parse('1')).toThrow();
    });
  });

  describe('ar-SA (Sunday-starting locale)', () => {
    it('should parse local weekday 01 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('ee', { locale: 'ar-SA' });
      const value = pattern.parse('01');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should parse local weekday 02 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('ee', { locale: 'ar-SA' });
      const value = pattern.parse('02');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 07 (Saturday) and normalize to ISO weekday 6', () => {
      const pattern = new DateTimePattern('ee', { locale: 'ar-SA' });
      const value = pattern.parse('07');
      expect(value.normalized.weekday).toBe(6); // ISO: Saturday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('ee', { locale: 'ar-SA' });
      expect(() => pattern.parse('08')).toThrow();
    });
    it('should be invalid if not padded', () => {
      const pattern = new DateTimePattern('ee', { locale: 'ar-SA', flexible: false });
      expect(() => pattern.parse('1')).toThrow();
    });
  });

  describe('multi-locale consistency', () => {
    const locales = [
      { locale: 'en-US', name: 'en-US (Sunday-start)', localToISO: { '01': 7, '02': 1, '03': 2, '04': 3, '05': 4, '06': 5, '07': 6 } },
      { locale: 'en-GB', name: 'en-GB (Monday-start)', localToISO: { '01': 1, '02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7 } },
      { locale: 'de-DE', name: 'de-DE (Monday-start)', localToISO: { '01': 1, '02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7 } },
      { locale: 'ar-SA', name: 'ar-SA (Sunday-start)', localToISO: { '01': 7, '02': 1, '03': 2, '04': 3, '05': 4, '06': 5, '07': 6 } }
    ];

    locales.forEach(({ locale, name, localToISO }) => {
      describe(name, () => {
        Object.entries(localToISO).forEach(([localDay, isoDay]) => {
          it(`should parse local weekday ${localDay} and normalize to ISO weekday ${isoDay}`, () => {
            const pattern = new DateTimePattern('ee', { locale });
            const value = pattern.parse(localDay);
            expect(value.normalized.weekday).toBe(isoDay);
          });
        });
      });
    });
  });
});
