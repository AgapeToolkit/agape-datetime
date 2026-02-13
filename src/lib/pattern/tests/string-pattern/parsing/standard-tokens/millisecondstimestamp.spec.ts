import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - millisecondsTimestamp', () => {
  describe('unsigned', () => {
    it('should parse milliseconds timestamp pattern', () => {
      const pattern = new DateTimePattern('n');
      const value = pattern.parse('1735689600');
      expect(value.millisecondsTimestamp).toBe(1735689600);
    });
    it('should fail with a + sign', () => {
      const pattern = new DateTimePattern('n');
      expect(() => pattern.parse('+1735689600')).toThrow();
    });
    it('should fail with a - sign', () => {
      const pattern = new DateTimePattern('n');
      expect(() => pattern.parse('-1735689600')).toThrow();
    });
  });
  describe('+ prefix', () => {
    it('should parse milliseconds timestamp pattern with a +', () => {
      const pattern = new DateTimePattern('+n');
      const value = pattern.parse('+1735689600');
      expect(value.millisecondsTimestamp).toBe(1735689600);
    });
    it('should parse milliseconds timestamp pattern with a -', () => {
      const pattern = new DateTimePattern('+n');
      const value = pattern.parse('-1735689600');
      expect(value.millisecondsTimestamp).toBe(-1735689600);
    });
    it('should fail without a sign', () => {
      const pattern = new DateTimePattern('+n');
      expect(() => pattern.parse('1735689600')).toThrow();
    });
  });
  describe('- prefix', () => {
    it('should parse milliseconds timestamp without a sign', () => {
      const pattern = new DateTimePattern('-n');
      const value = pattern.parse('1735689600');
      expect(value.millisecondsTimestamp).toBe(1735689600);
    });
    it('should parse milliseconds timestamp pattern with a -', () => {
      const pattern = new DateTimePattern('-n');
      const value = pattern.parse('-1735689600');
      expect(value.millisecondsTimestamp).toBe(-1735689600);
    });
    it('should fail with a + sign', () => {
      const pattern = new DateTimePattern('-n');
      expect(() => pattern.parse('+1735689600')).toThrow();
    });
  });
});
