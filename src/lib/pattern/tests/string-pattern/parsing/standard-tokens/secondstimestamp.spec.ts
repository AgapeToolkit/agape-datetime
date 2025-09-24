import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - secondsTimestamp', () => {
  describe('unsigned', () => {
    it('should parse seconds timestamp pattern', () => {
      const pattern = new DateTimePattern('t');
      const value = pattern.parse('1735689600');
      expect(value.normalized.secondsTimestamp).toBe(1735689600);
    });
    it('should fail with a + sign', () => {
      const pattern = new DateTimePattern('t');
      expect(() => pattern.parse('+1735689600')).toThrow();
    });
    it('should fail with a - sign', () => {
      const pattern = new DateTimePattern('t');
      expect(() => pattern.parse('-1735689600')).toThrow();
    });
  });
  describe('+ prefix', () => {
    it('should parse seconds timestamp pattern with a +', () => {
      const pattern = new DateTimePattern('+t');
      const value = pattern.parse('+1735689600');
      expect(value.normalized.secondsTimestamp).toBe(1735689600);
    });
    it('should parse seconds timestamp pattern with a -', () => {
      const pattern = new DateTimePattern('+t');
      const value = pattern.parse('-1735689600');
      expect(value.normalized.secondsTimestamp).toBe(-1735689600);
    });
    it('should fail without a sign', () => {
      const pattern = new DateTimePattern('+t');
      expect(() => pattern.parse('1735689600')).toThrow();
    });
  });
  describe('- prefix', () => {
    it('should parse seconds timestamp without a sign', () => {
      const pattern = new DateTimePattern('-t');
      const value = pattern.parse('1735689600');
      expect(value.normalized.secondsTimestamp).toBe(1735689600);
    });
    it('should parse seconds timestamp pattern with a -', () => {
      const pattern = new DateTimePattern('-t');
      const value = pattern.parse('-1735689600');
      expect(value.normalized.secondsTimestamp).toBe(-1735689600);
    });
    it('should fail with a + sign', () => {
      const pattern = new DateTimePattern('-t');
      expect(() => pattern.parse('+1735689600')).toThrow();
    });
  });
});
