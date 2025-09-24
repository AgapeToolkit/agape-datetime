import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - nanosecondsTimestamp', () => {
  describe('unsigned', () => {
    it('should parse nanoseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('N');
      const value = pattern.parse('1735689600');
      expect(value.normalized.nanosecondsTimestamp).toBe(1735689600);
    });
    it('should fail with a + sign', () => {
      const pattern = new DateTimePattern('N');
      expect(() => pattern.parse('+1735689600')).toThrow();
    });
    it('should fail with a - sign', () => {
      const pattern = new DateTimePattern('N');
      expect(() => pattern.parse('-1735689600')).toThrow();
    });
  });
  describe('+ prefix', () => {
    it('should parse nanoseconds timestamp pattern with a +', () => {
      const pattern = new DateTimePattern('+N');
      const value = pattern.parse('+1735689600');
      expect(value.normalized.nanosecondsTimestamp).toBe(1735689600);
    });
    it('should parse nanoseconds timestamp pattern with a -', () => {
      const pattern = new DateTimePattern('+N');
      const value = pattern.parse('-1735689600');
      expect(value.normalized.nanosecondsTimestamp).toBe(-1735689600);
    });
    it('should fail without a sign', () => {
      const pattern = new DateTimePattern('+N');
      expect(() => pattern.parse('1735689600')).toThrow();
    });
  });
  describe('- prefix', () => {
    it('should parse nanoseconds timestamp without a sign', () => {
      const pattern = new DateTimePattern('-N');
      const value = pattern.parse('1735689600');
      expect(value.normalized.nanosecondsTimestamp).toBe(1735689600);
    });
    it('should parse nanoseconds timestamp pattern with a -', () => {
      const pattern = new DateTimePattern('-N');
      const value = pattern.parse('-1735689600');
      expect(value.normalized.nanosecondsTimestamp).toBe(-1735689600);
    });
    it('should fail with a + sign', () => {
      const pattern = new DateTimePattern('-N');
      expect(() => pattern.parse('+1735689600')).toThrow();
    });
  });
});
