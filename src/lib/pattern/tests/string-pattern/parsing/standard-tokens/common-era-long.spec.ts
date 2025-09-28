import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - commonEraLong', () => {
  describe('en-US', () => {
    describe('default case', () => {
      it('should parse Before Common Era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US' });
        const value = pattern.parse('Before Common Era');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse Common Era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US' });
        const value = pattern.parse('Common Era');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase before common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US' });
        expect(() => pattern.parse('before common era')).toThrow();
      });
      it('should fail lowercase common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US' });
        expect(() => pattern.parse('common era')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy gggg', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 Common Era');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy gggg', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 Before Common Era');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse BEFORE COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('BEFORE COMMON ERA');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('COMMON ERA');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase Before Common Era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'uppercase' });
        expect(() => pattern.parse('Before Common Era')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse before common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('before common era');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('common era');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail uppercase BEFORE COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'lowercase' });
        expect(() => pattern.parse('BEFORE COMMON ERA')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse before common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('before common era');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('common era');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse BEFORE COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('BEFORE COMMON ERA');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('COMMON ERA');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse Before Common Era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('Before Common Era');
        expect(value.resolved.era).toBe(0);
      });
    });
  });

  describe('es-US', () => {
    describe('default case', () => {
      it('should parse Before Common Era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US' });
        const value = pattern.parse('Before Common Era');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse Common Era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US' });
        const value = pattern.parse('Common Era');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase before common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US' });
        expect(() => pattern.parse('before common era')).toThrow();
      });
      it('should fail lowercase common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US' });
        expect(() => pattern.parse('common era')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy gggg', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 Common Era');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy gggg', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 Before Common Era');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse BEFORE COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('BEFORE COMMON ERA');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('COMMON ERA');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail lowercase Before Common Era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'uppercase' });
        expect(() => pattern.parse('Before Common Era')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse before common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('before common era');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('common era');
        expect(value.resolved.era).toBe(1);
      });
      it('should fail uppercase BEFORE COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'lowercase' });
        expect(() => pattern.parse('BEFORE COMMON ERA')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse before common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('before common era');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse common era', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('common era');
        expect(value.resolved.era).toBe(1);
      });
      it('should parse BEFORE COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('BEFORE COMMON ERA');
        expect(value.resolved.era).toBe(0);
      });
      it('should parse COMMON ERA', () => {
        const pattern = new DateTimePattern('gggg', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('COMMON ERA');
        expect(value.resolved.era).toBe(1);
      });
    });
  });
});
