import { DateTimePattern } from '../../../../datetime-pattern';

describe('DateTimePattern - commonEraShort', () => {
  describe('en-US', () => {
    describe('default case', () => {
      it('should parse BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US' });
        const value = pattern.parse('BCE');
        expect(value.getEra()).toBe(0);
      });
      it('should parse CE', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US' });
        const value = pattern.parse('CE');
        expect(value.getEra()).toBe(1);
      });
      it('should fail lowercase bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US' });
        expect(() => pattern.parse('bce')).toThrow();
      });
      it('should fail lowercase ce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US' });
        expect(() => pattern.parse('ce')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy g', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 CE');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy g', { locale: 'en-US' });
        const value = pattern.parse('01/01/2025 BCE');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('BCE');
        expect(value.getEra()).toBe(0);
      });
      it('should parse CE', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'uppercase' });
        const value = pattern.parse('CE');
        expect(value.getEra()).toBe(1);
      });
      it('should fail lowercase bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'uppercase' });
        expect(() => pattern.parse('bce')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('bce');
        expect(value.getEra()).toBe(0);
      });
      it('should parse ce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'lowercase' });
        const value = pattern.parse('ce');
        expect(value.getEra()).toBe(1);
      });
      it('should fail uppercase BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'lowercase' });
        expect(() => pattern.parse('BCE')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('bce');
        expect(value.getEra()).toBe(0);
      });
      it('should parse ce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('ce');
        expect(value.getEra()).toBe(1);
      });
      it('should parse BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('BCE');
        expect(value.getEra()).toBe(0);
      });
      it('should parse CE', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('CE');
        expect(value.getEra()).toBe(1);
      });
      it('should parse Bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'en-US', case: 'insensitive' });
        const value = pattern.parse('Bce');
        expect(value.getEra()).toBe(0);
      });
    });
  });

  describe('es-US', () => {
    describe('default case', () => {
      it('should parse BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US' });
        const value = pattern.parse('BCE');
        expect(value.getEra()).toBe(0);
      });
      it('should parse CE', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US' });
        const value = pattern.parse('CE');
        expect(value.getEra()).toBe(1);
      });
      it('should fail lowercase bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US' });
        expect(() => pattern.parse('bce')).toThrow();
      });
      it('should fail lowercase ce', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US' });
        expect(() => pattern.parse('ce')).toThrow();
      });
      it('should be part of a valid date', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy g', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 CE');
        expect(value.year).toBe(2025);
      });
      it('should normalize the year using the era', () => {
        const pattern = new DateTimePattern('MM/DD/yyyy g', { locale: 'es-US' });
        const value = pattern.parse('01/01/2025 BCE');
        expect(value.year).toBe(-2024);
      });
    });
    describe('uppercase', () => {
      it('should parse BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('BCE');
        expect(value.getEra()).toBe(0);
      });
      it('should parse CE', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'uppercase' });
        const value = pattern.parse('CE');
        expect(value.getEra()).toBe(1);
      });
      it('should fail lowercase bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'uppercase' });
        expect(() => pattern.parse('bce')).toThrow();
      });
    });
    describe('lowercase', () => {
      it('should parse bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('bce');
        expect(value.getEra()).toBe(0);
      });
      it('should parse ce', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'lowercase' });
        const value = pattern.parse('ce');
        expect(value.getEra()).toBe(1);
      });
      it('should fail uppercase BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'lowercase' });
        expect(() => pattern.parse('BCE')).toThrow();
      });
    });
    describe('case insensitive', () => {
      it('should parse bce', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('bce');
        expect(value.getEra()).toBe(0);
      });
      it('should parse ce', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('ce');
        expect(value.getEra()).toBe(1);
      });
      it('should parse BCE', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('BCE');
        expect(value.getEra()).toBe(0);
      });
      it('should parse CE', () => {
        const pattern = new DateTimePattern('g', { locale: 'es-US', case: 'insensitive' });
        const value = pattern.parse('CE');
        expect(value.getEra()).toBe(1);
      });
    });
  });
});
