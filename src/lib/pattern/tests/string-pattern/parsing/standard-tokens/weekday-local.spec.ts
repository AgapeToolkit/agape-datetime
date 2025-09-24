import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - weekdayLocal', () => {
  describe('en-US (Sunday-starting locale)', () => {
    it('should parse local weekday 1 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-US' });
      const value = pattern.parse('1');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should parse local weekday 2 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-US' });
      const value = pattern.parse('2');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 7 (Saturday) and normalize to ISO weekday 6', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-US' });
      const value = pattern.parse('7');
      expect(value.normalized.weekday).toBe(6); // ISO: Saturday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-US' });
      expect(() => pattern.parse('8')).toThrow();
    });
    it('should be valid padded', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-US' });
      const value = pattern.parse('01');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should be invalid if not flexible and padded', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-US', flexible: false });
      expect(() => pattern.parse('01')).toThrow();
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('e MMM D YYYY', { locale: 'en-US' });
      const value = pattern.parse('4 Jan 1 2025'); // Wednesday
      expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
    });
  });

  describe('en-GB (Monday-starting locale)', () => {
    it('should parse local weekday 1 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-GB' });
      const value = pattern.parse('1');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 7 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-GB' });
      const value = pattern.parse('7');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should parse local weekday 3 (Wednesday) and normalize to ISO weekday 3', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-GB' });
      const value = pattern.parse('3');
      expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-GB' });
      expect(() => pattern.parse('8')).toThrow();
    });
    it('should be valid padded', () => {
      const pattern = new DateTimePattern('e', { locale: 'en-GB' });
      const value = pattern.parse('01');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should be part of a valid date', () => {
      const pattern = new DateTimePattern('e MMM D YYYY', { locale: 'en-GB' });
      const value = pattern.parse('3 Jan 1 2025'); // Wednesday
      expect(value.normalized.weekday).toBe(3); // ISO: Wednesday
    });
  });

  describe('de-DE (Monday-starting locale)', () => {
    it('should parse local weekday 1 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('e', { locale: 'de-DE' });
      const value = pattern.parse('1');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 7 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('e', { locale: 'de-DE' });
      const value = pattern.parse('7');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('e', { locale: 'de-DE' });
      expect(() => pattern.parse('8')).toThrow();
    });
  });

  describe('ar-SA (Sunday-starting locale)', () => {
    it('should parse local weekday 1 (Sunday) and normalize to ISO weekday 7', () => {
      const pattern = new DateTimePattern('e', { locale: 'ar-SA' });
      const value = pattern.parse('1');
      expect(value.normalized.weekday).toBe(7); // ISO: Sunday
    });
    it('should parse local weekday 2 (Monday) and normalize to ISO weekday 1', () => {
      const pattern = new DateTimePattern('e', { locale: 'ar-SA' });
      const value = pattern.parse('2');
      expect(value.normalized.weekday).toBe(1); // ISO: Monday
    });
    it('should parse local weekday 7 (Saturday) and normalize to ISO weekday 6', () => {
      const pattern = new DateTimePattern('e', { locale: 'ar-SA' });
      const value = pattern.parse('7');
      expect(value.normalized.weekday).toBe(6); // ISO: Saturday
    });
    it('should fail if local weekday out of range', () => {
      const pattern = new DateTimePattern('e', { locale: 'ar-SA' });
      expect(() => pattern.parse('8')).toThrow();
    });
  });

  describe('multi-locale consistency', () => {
    const locales = [
      { locale: 'en-US', name: 'en-US (Sunday-start)', localToISO: { 1: 7, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6 } },
      { locale: 'en-GB', name: 'en-GB (Monday-start)', localToISO: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 } },
      { locale: 'de-DE', name: 'de-DE (Monday-start)', localToISO: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 } },
      { locale: 'ar-SA', name: 'ar-SA (Sunday-start)', localToISO: { 1: 7, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6 } }
    ];

    locales.forEach(({ locale, name, localToISO }) => {
      describe(name, () => {
        Object.entries(localToISO).forEach(([localDay, isoDay]) => {
          it(`should parse local weekday ${localDay} and normalize to ISO weekday ${isoDay}`, () => {
            const pattern = new DateTimePattern('e', { locale });
            const value = pattern.parse(localDay);
            expect(value.normalized.weekday).toBe(isoDay);
          });
        });
      });
    });
  });
});
