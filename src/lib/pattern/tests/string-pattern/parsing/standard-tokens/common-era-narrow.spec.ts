import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - commonEraNarrow', () => {
  describe('en-US', () => {
    describe('default case', () => {
      it('should parse B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse C', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US' });
        const value = pattern.parse('C');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US' });
        expect(() => pattern.parse('b')).toThrow();
      });
      it('should fail lowercase c', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US' });
        expect(() => pattern.parse('c')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy ggggg', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 C');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy ggggg', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 B');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse C', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('C');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'uppercase' });
        expect(() => pattern.parse('b')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse c', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('c');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail uppercase B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'lowercase' });
        expect(() => pattern.parse('B')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse c', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('c');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse C', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('C');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

  describe('es-US', () => {
    describe('default case', () => {
      it('should parse B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse C', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US' });
        const value = pattern.parse('C');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US' });
        expect(() => pattern.parse('b')).toThrow();
      });
      it('should fail lowercase c', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US' });
        expect(() => pattern.parse('c')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy ggggg', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 C');
        expect(value.normalized.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy ggggg', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 B');
        expect(value.normalized.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse C', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('C');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'uppercase' });
        expect(() => pattern.parse('b')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse c', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('c');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail uppercase B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'lowercase' });
        expect(() => pattern.parse('B')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse b', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('b');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse c', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('c');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse B', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('B');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse C', () => {
        const pattern = new DateTimePattern('ggggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('C');
        expect(value.resolved.era).toBe(1);
      });
    });
  });
});
